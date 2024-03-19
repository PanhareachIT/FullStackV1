import React, { useEffect, useState } from 'react';
import { request } from '../../share/request'; // Importing the request function from share/request
import MainPageDash from '../component-dash/mainpage/MainPageDash'; // Importing MainPageDash component
import { Button, Col, Divider, Form, Input, Modal, Row, Select, Space } from 'antd'; // Importing Ant Design components
import { DatePicker } from 'antd'; // Importing DatePicker from Ant Design
import { ConsoleSqlOutlined, DeleteOutlined } from '@ant-design/icons'; // Importing DeleteOutlined icon from Ant Design
import './styles.css'; // Importing custom CSS file
import { titlePageDashBoard, btnPageDashBoard } from "../../app.css"
import { Option } from 'antd/es/mentions';

const ImportPageDash = () => {
    // State variables initialization
    const [form] = Form.useForm();
    const [buttonText, setButtonText] = useState("New Supply"); // State variable to handle button text
    const [disableSelect, setDisAbleSelect] = useState(false); // State variable to disable select input
    const [listEmployee, setListEmployee] = useState([]); // State variable for list of employees
    const [listProduct, setListProduct] = useState([]); // State variable for list of products
    const [listSupplier, setListSupplier] = useState([]); // State variable for list of suppliers
    const [listImportDetail, setListImportDetail] = useState([]); // State variable for list of import details
    const [disableInput, setDisAbleInput] = useState(true); // State variable to disable input fields
    const [loading, setLoading] = useState(false); // State variable to handle loading state
    const [importTotal, setImportTotal] = useState(0); // State variable for total import amount
    const [supply, setSupply] = useState({ // State variable for supply details
        supply_id: "",
        supply_name: "",
        supply_contact: ""
    });
    const [importDetail, setImportDetail] = useState({ // State variable for import detail
        product_id: "",
        product_name: "",
        import_quantity: "",
        import_price: "",
        amount: ""
    });
    const { import_id, product_id, product_name, import_quantity, import_price, amount } = importDetail;
    const { supply_name, supply_contact, supply_id } = supply;

    // Function to handle input change for supply
    const onInputChangeSupply = (e) => {
        setSupply({
            ...supply,
            [e.target.name]: e.target.value
        });
    };

    const onSelectChangeSaleDetail = (fieldName, e) => {
        setImportDetail({
            ...importDetail, [fieldName]: e
        })
        console.log(importDetail)
    }

    // Function to handle input change for import detail
    const onInputChangeImportdetail = (e) => {
        setImportDetail({
            ...importDetail,
            [e.target.name]: e.target.value
        });
    };

    // Function to clear supply details
    const onClear = () => {
        var clearSupply = {
            supply_id: "",
            supply_name: "",
            supply_contact: ""
        };
        setSupply(clearSupply);
    };

    // Function to handle button click for "New Supply" or "Old Supply"
    const onClickBtnNew = (event) => {
        const buttonText = event.target.innerText; // Get the text content of the clicked button
        onClear(); // Clear supply details
        if (buttonText === "Old Supply") {
            setButtonText("New Supply");
            setDisAbleInput(true);
            setDisAbleSelect(false);
        } else {
            setButtonText("Old Supply");
            setDisAbleInput(false);
            setDisAbleSelect(true);
        }
    };

    // Function to add import detail
    const addImportDetail = () => {
        var importTotalTmp = importTotal;
        importDetail.amount = import_quantity * import_price;
        importTotalTmp = importTotal + importDetail.amount;
        setImportTotal(importTotalTmp);
        var listTmp = [importDetail, ...listImportDetail];
        setListImportDetail(listTmp);
        clearImportDetial();
    };

    // Function to clear import detail
    const clearImportDetial = () => {
        var obj = {
            product_id: "",
            product_name: "",
            import_quantity: "",
            import_price: "",
            amount: ""
        };
        setImportDetail(obj);
    };

    // Function to handle form submission
    const onFinish = (value) => {
        console.log(value);
    };

    // Function to remove import detail by product id
    const removeImportDetailById = (product_id) => {
        setListImportDetail(listImportDetail.filter(item => item.product_id !== product_id));
    };

    // Function to save import data
    const onSave = () => {
        var param = {
            ...supply,
            employee_id: 17,
            employee_name: "Panhareach",
            import_total: importTotal,
            array_importDetail: listImportDetail
        };

        request("importt", "POST", param).then(res => {
            Modal.success({
                content: res.message
            });
        }).catch(error => {
            // Handle error if request fails
            console.error("Error:", error);
        });
        clearImportDetial();
        setListImportDetail([])
        console.log(param);
    };

    // Function to fetch data
    const getData = () => {
        setLoading(true);
        request("importt", "GET").then(res => {
            setListEmployee(res.employee);
            setListProduct(res.product);
            setListSupplier(res.supplier);
        }).catch(err => {
            console.log(err);
        }).finally(() => {
            setLoading(false);
        });
    };

    // useEffect hook to fetch data on component mount
    useEffect(() => {
        getData();
        var matchIngItem = listProduct.find(item => item.product_id === importDetail.product_id)
        if (matchIngItem) {
            console.log(matchIngItem)
            setImportDetail({
                ...importDetail, product_name: matchIngItem.name

            })
        }
        // console.log("Matchingitem = " + matchIngItem.name)
    }, [product_id]);

    return (
        <MainPageDash loading={loading}>
            <div
                className="titlePageDashBoard"
            >
                <h1>Import</h1>
            </div>
            <Form
                form={form}
                onFinish={onFinish}
                style={{ maxWidth: '80%' }}
            >
                <Row gutter={16}>
                    {/* Supply section */}
                    <Col span={12}>
                        <Form.Item label="Supply ID" name="supply_id" required>
                            <Select
                                value={supply_id}
                                style={{ width: 120 }}
                                disabled={disableSelect}
                                onChange={(value) => setSupply({ ...supply, supply_id: value })}
                            >
                                {
                                    listSupplier.map((item, index) => (
                                        <Select.Option key={index} value={item.supply_id}>{item.supply_name}</Select.Option>
                                    ))
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="Supply Name"
                            name='supply_name'
                            rules={[
                                {
                                    required: true,
                                    message: "Please Input"
                                }
                            ]}>
                            <Input
                                value={supply_name}
                                name='supply_name'
                                disabled={disableInput}
                                onChange={(e) => onInputChangeSupply(e)}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Supply Contact"
                            name='supply_contact'
                            rules={[
                                {
                                    required: true,
                                    message: "Please Input"
                                }
                            ]}
                        >
                            <Input
                                required
                                value={supply_contact}
                                disabled={disableInput}
                                name='supply_contact'
                                onChange={(e) => onInputChangeSupply(e)}
                            />
                        </Form.Item>
                    </Col>

                    {/* Date Time section */}
                    <Col span={12}>
                        <Form.Item label="DateTime">
                            <DatePicker showTime id="dateTimePicker" />
                        </Form.Item>
                        <Form.Item style={{ marginTop: '20px' }}>
                            <Space>
                                <Button onClick={(e) => onClickBtnNew(e)}>{buttonText}</Button>
                            </Space>
                        </Form.Item>
                    </Col>
                </Row>

                <Divider />

                {/* Import Detail section */}
                <Row gutter={16}>
                    {/* Import Detail inputs */}
                    <Col span={9}>
                        <Form.Item label="Product_id" style={{ display: 'block' }}>
                            <Select
                                // name='product_id'
                                // style={{ width: 200 }}
                                value={product_id} // Current selected value
                                onChange={(value) => onSelectChangeSaleDetail("product_id", value)} // Handler for value change
                            >
                                {listProduct.map((item, index) => (
                                    <Option key={index} value={item.product_id}>
                                        {item.product_id}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={9}>
                        <Form.Item label="Product_name" style={{ display: 'block' }}>
                            <Input
                                required
                                readOnly
                                placeholder='Product_name'
                                value={product_name}
                            // name='product_name'
                            // onChange={(e) => onInputChangeSaleDetail(e)} // corrected function name
                            />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Space>
                            <Button onClick={onClear}>Remove</Button>
                            <Button onClick={() => clearImportDetial()}>Clear</Button> {/* No `clearImportDetial` function found in your code, did you mean `onClearSaleDetail`? */}
                            <Button onClick={(e) => addImportDetail(e)}>Add</Button> {/* Did you mean `addSaleDetail`? */}
                        </Space>
                    </Col>

                </Row>
                <Row gutter={16}>
                    <Col span={9}>
                        <Form.Item label="Import_quantity" style={{ display: 'block' }}>
                            <Input
                                placeholder='import_quantity'
                                value={import_quantity}
                                name='import_quantity'
                                onChange={(e) => onInputChangeImportdetail(e)}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={9}>
                        <Form.Item label="Import_price" style={{ display: 'block' }}>
                            <Input
                                placeholder='import_price'
                                value={import_price}
                                name='import_price'
                                onChange={(e) => onInputChangeImportdetail(e)}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item>
                            <Button onClick={() => onSave()}>Save</Button>

                        </Form.Item>
                    </Col>
                </Row>

                {/* Render list of import details */}
                {
                    listImportDetail.map((item, index) => {
                        return (
                            <div key={index} className='item-container' style={{ display: 'flex', width: '400px' }}>
                                <div>
                                    <div className="product-id">Product_id = {item.product_id}</div>
                                    <div className="product-name">Product_name = {item.product_name}</div>
                                    <div className="import-quantity">import_quantity = {item.import_quantity}</div>
                                    <div className="import-price">import_price = {item.import_price}</div>
                                    <div className="amount">amount = {item.amount}</div>
                                </div>
                                <div>
                                    <DeleteOutlined
                                        style={{ fontSize: '24px', color: 'red' }}
                                        onClick={() => removeImportDetailById(item.product_id)}
                                    />
                                </div>
                            </div>
                        );
                    })
                }
            </Form>
        </MainPageDash>
    );
};

export default ImportPageDash;
