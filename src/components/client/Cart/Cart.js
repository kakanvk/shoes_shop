
import "./Cart.css"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Cart() {

    const navigate = useNavigate();

    const shoeses = [
        {
            imgSrc: "https://saigonsneaker.com/wp-content/uploads/2019/08/giay-converse-chuck-1.jpg.webp",
            name: "Converse Chuck 70 Low Top Black (1970s)",
            brand: "NIKE",
            price: "1.160.000",
            old_price: "1.500.000"
        },
        {
            imgSrc: "https://saigonsneaker.com/wp-content/uploads/2020/01/IMG_2217-2-650x650.jpg.webp",
            name: "Adidas Stan Smith Fairway",
            brand: "NIKE",
            price: "1.160.000",
            old_price: "1.500.000"
        },
        {
            imgSrc: "https://saigonsneaker.com/wp-content/uploads/2019/12/unisex.jpg.webp",
            name: "Vans Old Skool Classic Black",
            brand: "VANS",
            price: "1.160.000",
            old_price: "1.500.000"
        },
        {
            imgSrc: "https://saigonsneaker.com/wp-content/uploads/2020/01/IMG_2215-2-650x650.jpg.webp",
            name: "Adidas Superstar Running White",
            brand: "NIKE",
            price: "1.160.000",
            old_price: "1.500.000"
        }
    ]

    const handleSendCheckout = () => {
        navigate("/checkout", { state: shoeses });
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])


    return (
        <div className="Cart">
            <div className="Cart_left">
                <div className="Cart_left_title">
                    <h2>Giỏ hàng</h2>
                    <span>{shoeses.length} sản phẩm</span>
                </div>
                <div className="Cart_left_table">
                    <table>
                        <thead>
                            <tr>
                                <th><input type="checkbox" defaultChecked="true" /></th>
                                <th>Sản phẩm</th>
                                <th>Số lượng</th>
                                <th>Tạm tính</th>
                                <th><i className="fa-solid fa-trash-can"></i></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                shoeses.map((shoese, index) => {
                                    return (
                                        <CartItem key={index} shoese={shoese} />
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="Cart_right">
                <h3>Hoá đơn tạm tính</h3>
                <div>
                    <h4>Tổng sản phẩm (4)</h4>
                    <span>4.300.000đ</span>
                </div>
                <div>
                    <h4>Phí vận chuyển</h4>
                    <span>50.000đ</span>
                </div>
                <hr></hr>
                <div className="Cart_right_total">
                    <h4>Tổng cộng</h4>
                    <span>4.350.000đ</span>
                </div>
                <button onClick={() => handleSendCheckout()}>
                    <span>Tiến hành đặt hàng</span>
                    <i className="fa-solid fa-arrow-right"></i>
                </button>
            </div>
        </div>
    )
}

function CartItem(props) {

    const [countProduct, setCountProduct] = useState(1);

    const { shoese } = props;

    return (
        <tr className="CartItem">
            <td>
                <input type="checkbox" defaultChecked="true" />
            </td>
            <td>
                <div className="CartItem_img">
                    <img src={shoese.imgSrc} alt="" />
                </div>
                <div className="CartItem_info">
                    <h4>{shoese.name}</h4>
                    <div className="CartItem_info_variant">
                        <div></div>
                        <span>Size 39</span>
                    </div>
                </div>
            </td>
            <td>
                <div>
                    <button onClick={() => setCountProduct(Math.max(countProduct - 1, 1))}><i className="fa-solid fa-minus"></i></button>
                    <span>{countProduct}</span>
                    <button onClick={() => setCountProduct(countProduct + 1)}><i className="fa-solid fa-plus"></i></button>
                </div>
            </td>
            <td>{shoese.price}đ</td>
            <td>
                <div>
                    <i className="fa-solid fa-xmark"></i>
                </div>
            </td>
        </tr>
    )
}

export default Cart;