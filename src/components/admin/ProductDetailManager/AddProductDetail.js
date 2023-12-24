
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
    message,
    Spin,
} from 'antd';
import { Link, useParams } from "react-router-dom";

function AddProductDetail() {

    const {id} = useParams();

    return (
        <Flex className="AddProductDetail" vertical="true" gap={50}>
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
                        title: `${id}`,
                    },
                    {
                        title: 'Thêm chi tiết sản phẩm',
                    },
                ]}
            />

        </Flex>
    )
}

export default AddProductDetail;