
import "./ProductManager.css"
import { useEffect, useState } from "react";
import axios from "axios";
import { Badge, Breadcrumb, Flex, Space, Table } from "antd";


function ProductManager() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);

        axios.get('http://localhost:8080/api/v1/products/full')
            .then(response => {
                const productsFormatted = response.data.map((product) => {
                    return ({
                        key: product.id,
                        name: product.name,
                        description: product.description,
                        image: product.image_url,
                        price: product.price,
                        gender_type: product.gender_for,
                        sale_percent: product.sale_percent,
                        type_name: product.type_name,
                    })
                })
                console.log(response.data);
                setProducts(productsFormatted);
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
            title: 'Mô tả',
            dataIndex: 'description',
        },
        {
            title: 'Ảnh',
            dataIndex: 'image',
            render: (text) => <img src={text} alt="" width={80} />,
        },
        {
            title: 'Giá',
            dataIndex: 'price',
        },
        {
            title: 'Loại',
            dataIndex: 'type_name',
        },
        {
            title: 'Giới tính',
            dataIndex: 'gender_type',
        },
        {
            title: 'Giảm giá',
            dataIndex: 'sale_percent',
            render: (text) => <Badge count={`${text}%`} color= { text>0 ? '#52c41a': '#b9b9b9' }/>,
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
        <Flex className="ProductManager" vertical="true" gap={20}>
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
            <Table
                rowSelection={{
                    ...rowSelection,
                }}
                columns={columns}
                dataSource={products}
            />
        </Flex>
    )
}

export default ProductManager;