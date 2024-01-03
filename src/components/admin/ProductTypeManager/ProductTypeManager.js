
import { useEffect, useState } from "react";
import axios from "axios";

import {
    Breadcrumb,
    Button,
    Flex,
    Space,
    Modal,
    Form, Input,
    message,
    Spin
} from 'antd';

function ProductTypeManager() {

    const [productTypes, setProductTypes] = useState([]);
    const [popupAddOpen, setPopupAddOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const [messageApi, contextHolder] = message.useMessage();

    const successMessage = () => {
        messageApi.open({
            type: 'success',
            content: 'Thêm loại sản phẩm thành công',
        });
    };

    const errorMessage = () => {
        messageApi.open({
            type: 'error',
            content: 'Thêm loại sản phẩm thất bại',
        });
    };

    const fetchData = () => {
        axios.get('http://localhost:8080/api/v1/productTypes/full')
            .then(response => {
                // console.log(response.data);
                setProductTypes(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    useEffect(() => {
        fetchData();
    }, [])

    const handleCreateProductType = async (data) => {
        setLoading(true);

        const adminData = JSON.parse(localStorage.getItem('user'));

        axios.post('http://localhost:8080/api/v1/productTypes', data, {
            auth: {
                username: adminData.username,
                password: adminData.password
            }
        })
            .then(response => {
                console.log("Add product successfully");
                successMessage();
                setPopupAddOpen(false);
                fetchData();
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                errorMessage();
            });
    }

    const onFinish = (values) => {
        console.log('Success:', values);
        handleCreateProductType(values);
    };

    return (
        <Flex className="ProductTypeManager" vertical="true" gap={30}>
            {contextHolder}
            <Breadcrumb
                items={[
                    {
                        title: 'Quản lý',
                    },
                    {
                        title: 'Loại sản phẩm',
                    },
                ]}
            />
            {
                loading && <Spin />
            }
            <Space size="middle" wrap="true">
                <Button
                    style={{ width: 250, height: 150, fontWeight: 600, fontSize: 18, }}
                    type="primary"
                    onClick={() => setPopupAddOpen(true)}
                >
                    <i class="fa-solid fa-plus"></i>
                </Button>
                {
                    productTypes.map((productType) => {
                        return (
                            <Button
                                key={productType.id}
                                style={{ width: 250, height: 150, fontWeight: 600, backgroundColor: "#dddddd", fontSize: 15 }}
                            >
                                {productType.name}
                            </Button>
                        )
                    })
                }
            </Space>
            <Modal
                title="Thêm loại sản phẩm mới"
                centered
                open={popupAddOpen}
                onOk={() => { }}
                onCancel={() => { setPopupAddOpen(false) }}
                maskClosable={false}
                okButtonProps={{
                    style: {
                        display: "none"
                    }
                }}
                cancelButtonProps={{
                    style: {
                        display: "none"
                    }
                }}
            >
                <Form
                    name="addProductType"
                    onFinish={onFinish}
                    style={{
                        padding: "10px 0px 0px 0px"
                    }}
                >
                    <Form.Item
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập tên loại sản phẩm!',
                            },
                        ]}
                    >
                        <Input
                            placeholder="Nhập tên loại sản phẩm mới"
                            size="large"
                            autoFocus={true}
                            style={{ fontFamily: "Montserrat", fontWeight: 500 }}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Flex gap={10} align="center" justify="flex-end">
                            <Button>Huỷ</Button>
                            <Button type="primary" htmlType="submit">Thêm sản phẩm</Button>
                        </Flex>
                    </Form.Item>
                </Form>
            </Modal>
        </Flex >
    )
}

export default ProductTypeManager;