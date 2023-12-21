
import "./Home.css"
import sneaker from "../../../images/sneaker.png"
import { Link } from "react-router-dom"
import { useEffect } from "react"

function Home() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

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
        },
        {
            imgSrc: "https://saigonsneaker.com/wp-content/uploads/2020/11/574-2-700x700.jpg.webp",
            name: "New Balance 574 Grey Blue",
            brand: "NIKE",
            price: "1.160.000",
            old_price: "1.500.000"
        },
        {
            imgSrc: "https://saigonsneaker.com/wp-content/uploads/2019/11/IMG_1013-700x700.jpg.webp",
            name: "Air Force 1 Shadow Pale Ivory",
            brand: "NIKE",
            price: "1.195.000",
            old_price: "1.500.000"
        },
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

    return (
        <div className="Home">
            <div className="Home_cover">
                <div className="Home_cover_left">
                    <span>NIKE</span>
                    <h2>NIKE AIR MAX SNEAKER RUNNING</h2>
                </div>
                <img src={sneaker} alt="" />
                <h1>SPORT</h1>
                <div className="Home_cover_top">
                    <span className="sale_tags">NEW</span>
                    <div>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                    </div>
                </div>
                <div className="Home_cover_right">
                    <div>
                        <p>Sale</p>
                        <span className="sale_tags">-25%</span>
                    </div>
                    <div className="Home_cover_right_price">
                        <h2>750.000đ</h2>
                        <span>1.000.000đ</span>
                    </div>
                    <button>MUA NGAY</button>
                </div>
            </div>

            <div className="Home_feature">
                <div>
                    <i class="fa-solid fa-truck-fast"></i>
                    <span>Giao hàng toàn quốc</span>
                </div>
                <div>
                    <i class="fa-brands fa-cc-visa"></i>
                    <span>Thanh toán trực tuyến</span>
                </div>
                <div>
                    <i class="fa-solid fa-crown"></i>
                    <span>Chất lượng cao</span>
                </div>
                <div>
                    <i class="fa-solid fa-tags"></i>
                    <span>Mẫu mã đa dạng</span>
                </div>
                <div>
                    <i class="fa-solid fa-thumbs-up"></i>
                    <span>Support tận tình</span>
                </div>
            </div>

            <div className="Home_bestSeller">
                <h2>Bán chạy nhất</h2>
                <div className="Shop_right">
                    {
                        shoeses.map((shoes, index) => {
                            return (
                                <Link className="Shop_right_shoes" key={index} to={`/product/${index}`}>
                                    <div className="shoes_top">
                                        <div className="shoes_top_img">
                                            <span className="shoes_tags">-15%</span>
                                            <img src={shoes.imgSrc} alt="" />
                                        </div>
                                        <div className="shoes_top_info">
                                            <h3>{shoes.name}</h3>
                                            <span>{shoes.brand}</span>
                                        </div>

                                    </div>
                                    <div className="shoes_bottom">
                                        <h4>{shoes.price}đ</h4>
                                        <span>{shoes.old_price}đ</span>
                                    </div>
                                </Link>
                            )
                        })
                    }
                </div>
            </div>

        </div>
    )
}

export default Home;