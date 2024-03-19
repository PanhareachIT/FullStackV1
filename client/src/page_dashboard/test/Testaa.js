import { Col, Form, Input, Row } from 'antd'
import React from 'react'

const Testaa = () => {
    return (
        <Form>
            <Row gutter={16}>
                <Col span={24}>
                    <Form.Item label={"Image"} name={"image"}>
                        {/* <input ref={inputFileRef} onChange={onChangeImage} type="file" /> */}
                        <input type="file" />
                    </Form.Item>
                </Col>
                {/* <Col span={12}>
                            <Form.item>
                                
                            </Form.item>
                        </Col> */}
            </Row>
        </Form>
    )
}

export default Testaa