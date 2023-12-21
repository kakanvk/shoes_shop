
import { useEffect, useState } from "react";
import "./Checkout.css"
import { useLocation, useNavigate } from "react-router-dom";
import Select from 'react-select';
import axios from 'axios';

function Checkout() {

    const location = useLocation();
    const navigate = useNavigate();
    const orders = location.state;

    const [citys, setCitys] = useState([]);
    const [districts, setDistrict] = useState([]);
    const [wards, setWards] = useState([]);
    const [isCompleteOrder, setIsCompleteOrder] = useState(false);
    const [selectedCityOption, setSelectedCityOption] = useState(null);
    const [selectedDistrictOption, setSelectedDistrictOption] = useState(null);
    const [selectedWardOption, setSelectedWardOption] = useState(null);

    useEffect(() => {

        if (orders == null) navigate("/cart");

        window.scrollTo(0, 0);

        axios.get('https://provinces.open-api.vn/api/?depth=3')
            .then(response => {
                const citys_arr = response.data.map((city) => {
                    return (
                        {
                            value: city.code,
                            label: city.name,
                            districts: city.districts
                        }
                    )
                })
                setCitys(citys_arr);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });

        axios.get('http://localhost:8080/api/v1/products/all?page=1&size=5&sort=id,desc&search=')
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });


    }, [])

    const handleOrderCheckout = () => {
        setIsCompleteOrder(true);
    }

    const handleChangeCityOption = (selectedCityOption) => {
        setSelectedCityOption(selectedCityOption);
        let districts_arr = citys.filter((city) => {
            return city.value === selectedCityOption.value;
        })

        districts_arr = districts_arr[0].districts.map((district) => {
            return {
                value: district.code,
                label: district.name,
                wards: district.wards
            }
        })

        setDistrict(districts_arr);
        setSelectedDistrictOption(null);
        setSelectedWardOption(null);
    };

    const handleChangeDistrictOption = (selectedDistrictOption) => {
        setSelectedDistrictOption(selectedDistrictOption);
        let wards_arr = districts.filter((district) => {
            return district.value === selectedDistrictOption.value;
        })

        wards_arr = wards_arr[0].wards.map((ward) => {
            return {
                value: ward.code,
                label: ward.name
            }
        })

        setWards(wards_arr);
        setSelectedWardOption(null);
    };

    const handleChangeWardOption = (selectedWardOption) => {
        setSelectedWardOption(selectedWardOption);
    };

    return (
        <div className="Checkout_container">
            <div className="Checkout_status">
                <div className="Checkout_status_item">
                    <i className="fa-solid fa-cart-shopping"></i>
                    <span>Giỏ hàng</span>
                </div>
                <i className="fa-solid fa-arrow-right-long"></i>
                <div className={isCompleteOrder ? "Checkout_status_item" : "Checkout_status_item Checkout_status_item_active"}>
                    <i class="fa-solid fa-pen-to-square"></i>
                    <span>Hoàn tất thông tin</span>
                </div>
                <i className="fa-solid fa-arrow-right-long"></i>
                <div className={!isCompleteOrder ? "Checkout_status_item" : "Checkout_status_item Checkout_status_item_active"}>
                    <i className="fa-solid fa-circle-check"></i>
                    <span>Đặt hàng thành công</span>
                </div>
            </div>
            {
                isCompleteOrder ?
                    <CompleteOrder /> :
                    <div className="Checkout">
                        <div className="Checkout_left">
                            <div className="Checkout_left_title">
                                <h3>Thông tin giao hàng</h3>
                            </div>
                            <div className="Checkout_left_row">
                                <span>Họ và tên</span>
                                <input type="text" placeholder="Nhập họ và tên" />
                            </div>
                            <div className="Checkout_left_row">
                                <span>Số điện thoại</span>
                                <input type="text" placeholder="Nhập số điện thoại" />
                            </div>
                            <div className="Checkout_left_row">
                                <span>Email</span>
                                <input type="text" placeholder="Nhập email" />
                            </div>
                            <div className="Checkout_left_row">
                                <span>Tỉnh (Thành phố)</span>
                                <Select
                                    options={citys}
                                    value={selectedCityOption}
                                    onChange={handleChangeCityOption}
                                    theme={(theme) => ({
                                        ...theme,
                                        borderRadius: 5,
                                        minHeight: '50px',
                                        colors: {
                                            ...theme.colors,
                                            primary25: 'rgb(209, 209, 209)',
                                            primary50: 'rgb(209, 209, 209)',
                                            primary: 'black',
                                        },
                                    })}
                                    className="select"
                                    placeholder="Chọn tỉnh/thành phố"
                                />
                            </div>

                            <div className="Checkout_left_row_2col">
                                <div className="Checkout_left_row">
                                    <span>Quận (Huyện)</span>
                                    <Select
                                        options={districts}
                                        value={selectedDistrictOption}
                                        onChange={handleChangeDistrictOption}
                                        theme={(theme) => ({
                                            ...theme,
                                            borderRadius: 5,
                                            minHeight: '50px',
                                            colors: {
                                                ...theme.colors,
                                                primary25: 'rgb(209, 209, 209)',
                                                primary50: 'rgb(209, 209, 209)',
                                                primary: 'black',
                                            },
                                        })}
                                        className="select"
                                        placeholder="Chọn quận/huyện"
                                    />
                                </div>
                                <div className="Checkout_left_row">
                                    <span>Phường (Xã)</span>
                                    <Select
                                        options={wards}
                                        value={selectedWardOption}
                                        onChange={handleChangeWardOption}
                                        theme={(theme) => ({
                                            ...theme,
                                            borderRadius: 5,
                                            minHeight: '50px',
                                            colors: {
                                                ...theme.colors,
                                                primary25: 'rgb(209, 209, 209)',
                                                primary50: 'rgb(209, 209, 209)',
                                                primary: 'black',
                                            },
                                        })}
                                        className="select"
                                        placeholder="Chọn phường/xã"
                                    />
                                </div>
                            </div>
                            <div className="Checkout_left_row">
                                <span>Địa chỉ</span>
                                <textarea type="text" placeholder="Nhập địa chỉ" />
                            </div>
                            <div className="Checkout_left_row">
                                <span>Ghi chú</span>
                                <textarea type="text" placeholder="Nhập ghi chú cho đơn hàng" />
                            </div>
                        </div>
                        <div className="Checkout_right">
                            <div className="Checkout_right_title">
                                <h3>Hoá đơn của bạn</h3>
                                <span>{orders ? orders.length : 0} sản phẩm</span>
                            </div>
                            <div className="Checkout_right_table">
                                <div className="Checkout_right_table-row">
                                    <h4>Sản phẩm</h4>
                                    <h4>Giá</h4>
                                </div>
                                {
                                    orders &&
                                    orders.map((shoese, index) => {
                                        return (
                                            <div className="Checkout_right_table-row" key={index}>
                                                <div className="table-row-left">
                                                    <div className="table-row-left_img">
                                                        <img src={shoese.imgSrc} alt="" />
                                                    </div>
                                                    <div className="CartItem_info">
                                                        <h4>{shoese.name}</h4>
                                                        <div className="CartItem_info_variant">
                                                            <div></div>
                                                            <span>Size 39</span>
                                                            <p>x1</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="table-row-right">
                                                    <span>{shoese.price}đ</span>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                                <div className="Checkout_right_table-row">
                                    <h4>Tổng sản phẩm</h4>
                                    <span>4.500.000đ</span>
                                </div>
                                <div className="Checkout_right_table-row">
                                    <h4>Vận chuyển</h4>
                                    <span>50.000đ</span>
                                </div>
                                <div className="Checkout_right_table-row">
                                    <h4>Thành tiền</h4>
                                    <h3>4.550.000đ</h3>
                                </div>
                                <button onClick={() => handleOrderCheckout()}>
                                    Đặt hàng
                                </button>
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}

function CompleteOrder() {
    return (
        <h1>Đặt hàng thành công</h1>
    )
}

export default Checkout;