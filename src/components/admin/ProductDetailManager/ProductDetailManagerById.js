
import { useEffect, useState } from "react";
import axios from "axios";

import { Badge, Breadcrumb, Button, Flex, Space, Table } from "antd";
import { Link, useParams } from "react-router-dom";
import { BuildOutlined } from '@ant-design/icons';

function ProductDetailManagerById() {

    const { id } = useParams();

    const [product, setProduct] = useState([]);
    const [productDeatail, setProductDetail] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);

        axios.get('http://localhost:8080/api/v1/products/full')
            .then(response => {

                const product_arr = response.data;

                const curr = product_arr.filter(p => {
                    return (p.id.toString() === id)
                })[0]

                setProduct(curr);

                axios.get(`http://localhost:8080/api/v1/products/productDetail/${id}`, {
                    auth: {
                        username: "admin",
                        password: "123456"
                    }
                })
                    .then(response => {

                        const data = response.data.map((pd, index) => {
                            return {
                                color: pd.color,
                                size: pd.size,
                                quantity: pd.quantity,
                                key: index,
                                name: product_arr.filter(p => {
                                    return (p.id === pd.product_id)
                                })[0].name,
                                image: pd.img_url
                            }
                        })

                        setProductDetail(data);
                        // console.log(response.data);
                    })
                    .catch(error => {
                        console.error('Error fetching data:', error);
                    });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });

    }, [])

    const columns = [
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Ảnh',
            dataIndex: 'image',
            render: (text) => <img src={text} alt="" width={80} />,
        },
        {
            title: 'Màu sắc',
            dataIndex: 'color',
        },
        {
            title: 'Size',
            dataIndex: 'size',
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            sorter: (a, b) => a.quantity - b.quantity,
            width: 160,
        }
    ];

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record) => ({
            disabled: record.name === 'Disabled User',
            // Column configuration not to be checked
            name: record.name,
        }),
    };

    return (
        <Flex className="ProductDetailManagerById" vertical="true" gap={40}>
            <Breadcrumb
                items={[
                    {
                        title: 'Quản lý',
                    },
                    {
                        title: (
                            <Link to="/admin/products" >
                                <span>Quản lý sản phẩm</span>
                            </Link>
                        )
                    },
                    {
                        title: 'Chi tiết sản phẩm',
                    },
                    {
                        title: `${product?.name}`,
                    },
                ]}
            />
            <Space direction="vertical" size="large">
                <Link to="add-product-detail">
                    <Button type="primary" style={{ width: "fit-content" }}>
                        Thêm chi tiết sản phẩm
                    </Button>
                </Link>
                <Table
                    rowSelection={{
                        ...rowSelection,
                    }}
                    columns={columns}
                    dataSource={productDeatail}
                    pagination={true}
                />
            </Space>
        </Flex>
    )
}

export default ProductDetailManagerById;