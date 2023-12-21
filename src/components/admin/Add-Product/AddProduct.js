
import { PlusOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import axios from "axios";

import {
    Breadcrumb,
    Button,
    Flex,
    Form,
    Input,
    InputNumber,
    Select,
    Upload,
} from 'antd';

const { TextArea } = Input;

const normFile = (e) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};

function AddProduct() {

    const [productTypes, setProductTypes] = useState([]);

    const onFinish = (values) => {
        console.log(values);
    };

    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/productTypes/full')
            .then(response => {
                console.log(response.data);
                setProductTypes(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [])

    return (
        <Flex className="AddProduct" vertical="true" gap={50}>
            <Breadcrumb
                items={[
                    {
                        title: 'Quản lý',
                    },
                    {
                        title: 'Quản lý sản phẩm',
                    },
                ]}
            />
            <Form
                name="add-product-form"
                labelCol={{
                    span: 10,
                }}
                wrapperCol={{
                    span: 18,
                }}
                layout="horizontal"
                style={{
                    maxWidth: 800,
                }}
                onFinish={onFinish}
            >
                <Form.Item label="Tên sản phẩm"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Nhập tên sản phẩm!',
                        },
                    ]}>
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Loại sản phẩm"
                    name="type"
                    rules={[
                        {
                            required: true,
                            message: 'Chọn loại sản phẩm!',
                        },
                    ]}
                >
                    <Select>
                        {productTypes.map((pt) => {
                            return (
                                <Select.Option value={pt.id} key={pt.id}>{pt.name}</Select.Option>
                            )
                        })}
                    </Select>
                </Form.Item>
                <Form.Item label="Phân loại giới tính" name="gender"
                    rules={[
                        {
                            required: true,
                            message: 'Chọn loại giới tính!',
                        },
                    ]}
                >
                    <Select>
                        <Select.Option value="MALE">Nam</Select.Option>
                        <Select.Option value="FEMALE">Nữ</Select.Option>
                        <Select.Option value="UNISEX">Unisex</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Giá" name="price"
                    rules={[
                        {
                            required: true,
                            message: 'Nhập giá!',
                        },
                    ]}>
                    <InputNumber />
                </Form.Item>
                <Form.Item label="Mô tả sản phẩm" name="description"
                    rules={[
                        {
                            required: true,
                            message: 'Nhập mô tả sản phẩm!',
                        },
                    ]}>
                    <TextArea rows={4} />
                </Form.Item>
                <Form.Item label="Hình ảnh" valuePropName="fileList" getValueFromEvent={normFile}>
                    <Upload action="/upload.do" listType="picture-card">
                        <div>
                            <PlusOutlined />
                            <div
                                style={{
                                    marginTop: 8,
                                }}
                            >
                                Upload
                            </div>
                        </div>
                    </Upload>
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 10 }}>
                    <Button type="primary" htmlType="submit" >Thêm sản phẩm</Button>
                </Form.Item>
            </Form>
        </Flex>
    )
}

export default AddProduct;