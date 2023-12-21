import UserManager from './User-Manager/UserManager';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Layout, Menu, Space, Typography  } from 'antd';
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
import { Routes, Route, Link, useLocation } from 'react-router-dom';

import "./AdminLayout.css";
import ProductManager from './Product-Manager/ProductManager';
import AddProduct from './Add-Product/AddProduct';

const { Sider, Content } = Layout;
const { Title } = Typography;

function AdminLayout() {

    const location = useLocation();

    return (
        <Layout className="AdminLayout">
            <Sider width={280} theme="dark" style={{padding: 10}}>
                <Space><h1 className='AdminLayout_title'>SHOES SHOP</h1></Space>
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
                        <Menu.Item key="products" icon={<BarsOutlined />}>
                            <Link to="products">Quản lý sản phẩm</Link>
                        </Menu.Item>
                        <Menu.Item key="products/add" icon={<PlusOutlined />}>
                            <Link to="products/add" >Thêm sản phẩm</Link>
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
                        <Route path="/products/add" element={<AddProduct />} />
                    </Routes>
                </Content>
            </Layout>
        </Layout >
    );
}

export default AdminLayout;
