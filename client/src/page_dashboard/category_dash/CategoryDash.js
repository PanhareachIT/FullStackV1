import { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Col, Row, } from "react-bootstrap"
import { request } from '../../share/request';
import { formatDateServer } from '../../share/help'
import { Space, message } from 'antd';
// import '../../app.css'


const Product = () => {
    const [show, setShow] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [list, setList] = useState([]);
    const [item, setItem] = useState(null);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("");
    const [test, setTest] = useState("")

    // Function to handle click event for deleting an item
    const onClickBtnDelete = (param) => {
        // Set the item to be deleted and show the modal
        setItem(param);
        setShow(true);
    }

    // Function to handle click event for editing an item
    const onClickBtnEdit = (param) => {
        // Set the item to be edited and show the form modal
        setItem(param);
        setShowForm(true);
        console.log(param);
    }

    // Function to hide the confirmation modal
    const onHideModal = () => {
        setShow(false);
        setItem(null);
    }

    // Function to hide the form modal
    const onHideModalForm = () => {
        setShowForm(false);
        setItem(null);
    }

    // Function to show the form modal
    const onShowModalForm = () => {
        setShowForm(true);
        clearForm()
    }

    // Function to clear form fields
    const clearForm = () => {
        setName("");
        setDescription("");
        setStatus("");
    };

    // Function to handle delete action
    const onDelete = () => {
        // Construct URL and send delete request to delete the item
        const url = "category";
        const category_id = item.category_id;
        const method = "Delete";
        request(`category/${category_id}`, method).then(res => {
            if (res) {
                message.success(res.message);
            }
            getDate();
        });
        onHideModal();
    }

    // Function to handle save action
    const onSave = () => {
        onHideModalForm();
        var url = "category";
        var method = "POST";
        var param = {
            "name": name,
            "description": description,
            "status": status
        };
        if (item != null) {
            param.category_id = item.category_id;
            url = `category/${param.category_id}`;
            method = "PUT";
            console.log(param.category_id);
            console.log(url);
        }

        console.log("Param = " + param.name);



        // Send request to save/update the item
        request(url, method, param).then(res => {
            if (res != null) {
                getDate();
                clearForm();
                console.log("success update");
            } else {
                console.log("false");
            }

            console.log("List = " + list);
        }).catch(err => {
            console.log(err);
        });
    }


    // Function to handle click event for updating an item
    const onClickBtnUpdate = (param) => {
        // Show the form modal and set the item data to be updated
        setShowForm(true);
        setItem(param);
        setName(param.name);
        setDescription(param.description);
        setStatus(param.status);
    }

    // Function to fetch data from the server
    const getDate = () => {
        // Send a GET request to fetch category data
        request("category", "GET").then(res => {
            // Update the list state with the fetched data
            setList(res.list);
            console.log(res.list);
        });
    }


    useEffect(() => {
        getDate()
    }, [])

    return (
        <div className='container'>
            <div className='titlePageDashBoard'><h1>Category</h1></div>
            <Button variant="primary" onClick={onShowModalForm} className='mt-3'>Add New</Button>{' '}
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Category_id</th>
                        <th scope="col">Name</th>
                        <th scope="col">description</th>
                        <th scope="col">Parent_id</th>
                        <th scope="col">Status</th>
                        <th scope="col">Create_at</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Mapping through the list to display each category */}
                    {list?.map((item, index) => (
                        <tr key={index}>
                            <td>{item.category_id}</td>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                            <td>{item.parent_id}</td>
                            <td>{item.status}</td>
                            <td>{formatDateServer(item.create_at)}</td>
                            <td>
                                <Space>
                                    {/* Button to delete category */}
                                    <Button variant="danger" onClick={() => onClickBtnDelete(item)}>delete</Button>
                                    {/* Button to edit category */}
                                    <Button variant="primary" onClick={() => onClickBtnUpdate(item)} className="me-2">Edit</Button>
                                </Space>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>


            <Modal show={show}>
                {/* Modal header */}
                <Modal.Header closeButton>
                    <Modal.Title>Delete</Modal.Title>
                </Modal.Header>
                {/* Modal body */}
                <Modal.Body>
                    <p>Do you really want to delete ?.</p>
                </Modal.Body>
                {/* Modal footer */}
                <Modal.Footer>
                    {/* Button to cancel delete operation */}
                    <Button variant="secondary" onClick={onHideModal}>No</Button>
                    {/* Button to confirm delete operation */}
                    <Button variant="primary" onClick={onDelete}>Yes</Button>
                </Modal.Footer>
            </Modal>





            <div>
                {/* Modal for adding or editing a category */}
                <Modal show={showForm} onHide={onHideModalForm}>
                    <Modal.Header closeButton>
                        <Modal.Title>{item != null ? "Edit" : "Create"}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            {/* Form group for category name */}
                            <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                                <Form.Label column sm="2">
                                    Name
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control type="input" placeholder="Name" onChange={(e) => setName(e.target.value)} value={name} />
                                </Col>
                            </Form.Group>
                            {/* Form group for category description */}
                            <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                <Form.Label column sm="2">
                                    Description
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control type="input" placeholder="Description" onChange={(e) => setDescription(e.target.value)} value={description} />
                                </Col>
                            </Form.Group>
                            {/* Form group for category status */}
                            <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                <Form.Label column sm="2">
                                    Status
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control type="input" placeholder="Status" onChange={(e) => setStatus(e.target.value)} value={status} />
                                </Col>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    {/* Modal footer with buttons */}
                    <Modal.Footer>
                        <Button variant="secondary" onClick={onHideModalForm} >Cancel</Button>
                        <Button variant="primary" onClick={clearForm}>Clear</Button>
                        <Button variant="primary" onClick={onSave}>{item != null ? "Edit" : "Create"}</Button>
                    </Modal.Footer>
                </Modal>
            </div>

        </div>
    )
}


export default Product;



