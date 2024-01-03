
import { PlusOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import axios from "axios";
import { storage } from '../../../firebase';
import imageCompression from 'browser-image-compression';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

import {
    Breadcrumb,
    Button,
    Flex,
    Form,
    Input,
    InputNumber,
    Select,
    Upload,
    message,
    Spin,
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
    const [sales, setSales] = useState([]);
    const [loading, setLoading] = useState(false);

    const [messageApi, contextHolder] = message.useMessage();

    const successMessage = () => {
        messageApi.open({
            type: 'success',
            content: 'Thêm sản phẩm thành công',
        });
    };

    const errorMessage = () => {
        messageApi.open({
            type: 'error',
            content: 'Thêm sản phẩm thất bại',
        });
    };

    const handleCreateProduct = async (data) => {

        const adminData = JSON.parse(localStorage.getItem('user'));

        axios.post('http://localhost:8080/api/v1/products', data, {
            auth: {
                username: adminData.username,
                password: adminData.password
            }
        })
            .then(response => {
                console.log("Add product successfully");
                successMessage();
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                errorMessage();
            });
    }

    const onFinish = async (values) => {

        setLoading(true);

        const file = values.file[0].originFileObj;

        if (!file) return;

        const maxImageSize = 1024;

        try {
            let compressedFile = file;

            if (file.size > maxImageSize) {
                compressedFile = await imageCompression(file, {
                    maxSizeMB: 0.8,
                    maxWidthOrHeight: maxImageSize,
                    useWebWorker: true,
                });
            }

            const storageRef = ref(storage, `shoesshop/${compressedFile.name}`);
            const uploadTask = uploadBytesResumable(storageRef, compressedFile);

            uploadTask.on("state_changed",
                (snapshot) => {

                },
                (error) => {
                    console.log(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {

                        const newProduct = {
                            "name": values.name,
                            "description": values.description,
                            "image_url": downloadURL,
                            "price": values.price,
                            "type_id": values.type,
                            "genderType": values.gender,
                            "sale_id": values.sale
                        }

                        handleCreateProduct(newProduct);

                        setLoading(false);
                    });
                }
            );
        } catch (error) {
            console.error('Image Compression Error:', error);
        }
    };

    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/productTypes/full')
            .then(response => {
                // console.log(response.data);
                setProductTypes(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });

        axios.get('http://localhost:8080/api/v1/sales?page=1&size=20&sort=id,asc&search=', {
            auth: {
                username: "admin",
                password: "123456"
            }
        })
            .then(response => {
                console.log(response.data.content);
                setSales(response.data.content);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [])

    return (
        <Flex className="AddProduct" vertical="true" gap={50}>
            {contextHolder}
            <Breadcrumb
                items={[
                    {
                        title: 'Quản lý',
                    },
                    {
                        title: 'Thêm sản phẩm',
                    },
                ]}
            />
            {
                loading && <Spin />
            }
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
                disabled={loading}
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
                    <InputNumber style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item
                    label="Mã giảm giá"
                    name="sale"
                    rules={[
                        {
                            required: true,
                            message: 'Chọn mã giảm giá!',
                        },
                    ]}
                >
                    <Select>
                        {sales.map((sale) => {
                            return (
                                <Select.Option value={sale.id} key={sale.id}>
                                    {sale.sale_info} ({sale.percent_sale}%)
                                </Select.Option>
                            )
                        })}
                    </Select>
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
                <Form.Item name="file" label="Hình ảnh" valuePropName="fileList" getValueFromEvent={normFile}
                    rules={[
                        {
                            required: true,
                            message: 'Chọn hình ảnh!',
                        },
                    ]}
                >
                    <Upload action="/upload.do" listType="picture-card" maxCount={1}>
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