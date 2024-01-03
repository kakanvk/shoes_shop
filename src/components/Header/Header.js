
import { Link, useLocation } from "react-router-dom";
import "./Header.css"
import { useEffect, useState } from "react";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message } from 'antd';
import axios from "axios";

function Header() {

    const location = useLocation();
    const [searchVisible, setSearchVisible] = useState(false);
    const [isLoginPopup, setIsLoginPopup] = useState(false);
    const [searchInput, setSearchInput] = useState('');

    const [currentUser, setCurrentUser] = useState();
    const [boxUserPopup, setBoxUserPopup] = useState(false);

    const [messageApi, contextHolder] = message.useMessage();

    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'Đăng nhập thành công',
        });
    };

    const errorMessage = () => {
        messageApi.open({
            type: 'error',
            content: 'Đăng nhập thất bại',
        });
    };

    const handleSearchVisible = (e) => {
        setSearchVisible(!searchVisible);
        setSearchInput('');
    }

    const handleSearchClose = () => {
        setSearchInput('');
        setSearchVisible(!searchVisible);
    }

    const handleLogout = () => {
        localStorage.removeItem('user');
        window.location.reload();
    }

    useEffect(() => {

        setCurrentUser(JSON.parse(localStorage.getItem('user')));
        console.log(JSON.parse(localStorage.getItem('user')));

    }, [])

    return (
        <>
            {contextHolder}
            {
                isLoginPopup && <Login setIsLoginPopup={setIsLoginPopup} success={success} errorMessage={errorMessage} />
            }
            <div className="Header">
                {
                    !searchVisible ?
                        <div className="Header_logo">
                            <h2>SHOES SHOP</h2>
                        </div>
                        :
                        <div className="Header_back" onClick={() => handleSearchClose()}>
                            <i className="fa-solid fa-arrow-left"></i>
                        </div>

                }
                {
                    !searchVisible &&
                    <div className="Header_link">
                        <Link to="/" className={location.pathname === '/' ? 'active_link' : ''}>
                            TRANG CHỦ
                        </Link>
                        <Link to="/product" className={location.pathname.startsWith('/product') ? 'active_link' : ''}>
                            SẢN PHẨM
                        </Link>
                        <Link to="/male" className={location.pathname.startsWith('/male') ? 'active_link' : ''}>
                            GIÀY NAM
                        </Link>
                        <Link to="/female" className={location.pathname.startsWith('/female') ? 'active_link' : ''}>
                            GIÀY NỮ
                        </Link>
                        <Link to="/about-us" className={location.pathname.startsWith('/about-us') ? 'active_link' : ''}>
                            VỀ CHÚNG TÔI
                        </Link>
                    </div>
                }
                {
                    searchVisible &&
                    <div className="Header_searchBox">
                        <input type="text" placeholder="Tìm kiếm" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} autoFocus />
                        <button><i className="fa-solid fa-magnifying-glass"></i></button>
                    </div>
                }
                <div className="Header_option">
                    <Link onClick={(e) => handleSearchVisible(e)}><i className="fa-solid fa-magnifying-glass"></i></Link>
                    {
                        !currentUser ?
                            <Link onClick={() => setIsLoginPopup(!isLoginPopup)}><i className="fa-solid fa-user"></i></Link>
                            : <Link><i className="fa-solid fa-user" onClick={() => setBoxUserPopup(!boxUserPopup)}></i></Link>
                    }
                    <Link to="cart" className="Header_cart_icon">
                        <i className="fa-solid fa-cart-shopping"></i>
                        <span>4</span>
                    </Link>
                    {
                        boxUserPopup &&
                        <div className="Header-user-box">
                            <div className="User-box-top">
                                <h4>{currentUser?.fullName}</h4>
                                <span>{currentUser?.role}</span>
                            </div>
                            <hr></hr>
                            <div className="User-box-option">
                                {
                                    currentUser?.role === "ADMIN" ?
                                        <Link to="/admin"><button>Quản lý</button></Link>
                                        : ""
                                }
                                <button onClick={handleLogout}>Đăng xuất</button>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

function Login(props) {

    const { setIsLoginPopup, success, errorMessage } = props;

    const onFinish = async (values) => {

        const { username, password } = values;

        axios.get('http://localhost:8080/api/v1/login', {
            auth: {
                username: username,
                password: password,
            },
        })
            .then(response => {

                const userData = {
                    ...response.data,
                    password,
                    username,
                }

                localStorage.setItem('user', JSON.stringify(userData));
                console.log(JSON.parse(localStorage.getItem('user')));
                console.log('Đăng nhập thành công');
                success();
                setIsLoginPopup(false);
                window.location.reload();
            })
            .catch(error => {
                console.log('Đăng nhập không thành công');
                errorMessage();
            });

    }

    return (
        <div className="Login">

            <div className="overplay" onClick={() => setIsLoginPopup(false)}>

            </div>
            <div className="Login_container">
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                >
                    <Form.Item>
                        <h2 style={{ width: '100%', textAlign: "center" }}>Đăng nhập</h2>
                    </Form.Item>
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Nhập tên đăng nhập!',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Tên đăng nhập" size="large" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Nhập mật khẩu!',
                            },
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Mật khẩu"
                            size="large"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Nhớ lần đăng nhập này</Checkbox>
                        </Form.Item>

                        <a className="login-form-forgot" href="">
                            Quên mật khẩu?
                        </a>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button" size="large" style={{ width: '100%', backgroundColor: "black", color: "white" }}>
                            Đăng nhập
                        </Button>
                    </Form.Item>
                    Hoặc <a href="">Đăng ký!</a>
                </Form>
            </div>
        </div>
    )
}

export default Header;