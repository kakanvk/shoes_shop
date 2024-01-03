import UserManager from './User-Manager/UserManager';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Flex, Layout, Menu, Space, Typography } from 'antd';
import {
    DashboardOutlined,
    UserOutlined,
    SettingOutlined,
    TableOutlined,
    UserAddOutlined,
    TeamOutlined,
    BuildOutlined,
    PlusOutlined,
    BarsOutlined
} from '@ant-design/icons';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';

import "./AdminLayout.css";
import ProductManager from './Product-Manager/ProductManager';
import AddProduct from './Add-Product/AddProduct';
import AddProductDetail from './ProductDetailManager/AddProductDetail';
import ProductDetailManagerById from './ProductDetailManager/ProductDetailManagerById';
import ProductDetailManager from './ProductDetailManager/ProductDetailManager';
import ProductTypeManager from './ProductTypeManager/ProductTypeManager';
import { useEffect, useState } from 'react';

const { Sider, Content } = Layout;

function AdminLayout() {

    const location = useLocation();
    const navigate = useNavigate();

    const [adminData, setAdminData] = useState();

    useEffect(() => {

        const userData = JSON.parse(localStorage.getItem('user'));

        if (userData?.role === "ADMIN") {
            setAdminData(userData);
        } else {
            navigate("/");
        }

    }, [])

    return (
        <>
            {
                adminData &&
                <Layout className="AdminLayout">
                    <Sider width={280} theme="dark" style={{ padding: 10 }}>
                        <Flex justify='space-between' align='center'>
                            <h1 className='AdminLayout_title'>SHOES SHOP</h1>
                            <Button type="text" style={{ color: "white" }}>
                                <Link to="/">
                                    <i class="fa-solid fa-arrow-up-right-from-square"></i>
                                </Link>
                            </Button>
                        </Flex>
                        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
                            <Menu.Item key="1" icon={<DashboardOutlined />}>
                                <Link to="">Tổng quan</Link>
                            </Menu.Item>
                            <Menu.SubMenu key="UM" icon={<UserOutlined />} title="Người dùng">
                                <Menu.Item key="users" icon={<BarsOutlined />}>
                                    <Link to="users">Quản lý người dùng</Link>
                                </Menu.Item>
                                <Menu.Item key="users/add" icon={<PlusOutlined />}>
                                    <Link to="users/add" >Thêm người dùng</Link>
                                </Menu.Item>
                            </Menu.SubMenu>
                            <Menu.SubMenu key="PM" icon={<BuildOutlined />} title="Sản phẩm">
                                <Menu.Item key="products/add_product" icon={<PlusOutlined />}>
                                    <Link to="products/add-product" >Thêm sản phẩm</Link>
                                </Menu.Item>
                                <Menu.Item key="products" icon={<BarsOutlined />}>
                                    <Link to="products">Quản lý sản phẩm</Link>
                                </Menu.Item>
                                <Menu.Item key="product_type" icon={<BarsOutlined />}>
                                    <Link to="products-type">Loại sản phẩm</Link>
                                </Menu.Item>
                                <Menu.Item key="product_detail" icon={<BarsOutlined />}>
                                    <Link to="products-detail">Chi tiết sản phẩm</Link>
                                </Menu.Item>
                            </Menu.SubMenu>
                            <Menu.Item key="settings" icon={<SettingOutlined />}>
                                <Link to="settings">Settings</Link>
                            </Menu.Item>
                            <Menu.Item key="table" icon={<TableOutlined />}>
                                <Link to="table">Table View</Link>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout>
                        <Content className="AdminContent">
                            <Routes>
                                <Route path="/users" element={<UserManager />} />
                                <Route path="/products" element={<ProductManager />} />
                                <Route path="/products-detail" element={<ProductDetailManager />} />
                                <Route path="/products-detail/:id" element={<ProductDetailManagerById />} />
                                <Route path="/products-type" element={<ProductTypeManager />} />
                                <Route path="/products/add-product" element={<AddProduct />} />
                                <Route path="/products-detail/:id/add-product-detail" element={<AddProductDetail />} />
                            </Routes>
                        </Content>
                    </Layout>
                </Layout >
            }
        </>
    );
}

export default AdminLayout;
