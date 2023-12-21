
import { useParams, Link } from "react-router-dom";
import "./ProductDetail.css"
import { useEffect, useState } from "react";
import axios from 'axios';

function ProductDetail() {

    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [countProduct, setCountProduct] = useState(1);

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
        }
    ]

    useEffect(() => {
        setProduct(shoeses[id]);
        window.scrollTo(0, 0);

        axios.get(`http://localhost:8080/api/v1/products/${id}`)
            .then(response => {
                console.log(response.data);
                setProduct(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });

    }, [id])

    return (
        <div className="ProductDetail">
            <div className="ProductDetail_container">
                <div className="ProductDetail_container_left">
                    <Link to="/product"><ion-icon name="arrow-back"></ion-icon></Link>
                    <div className="PD_con_left_mainImg">
                        <img src={product.image_url} alt="" />
                    </div>
                    <div className="PD_con_left_selectImg">
                        <div>
                            <img src={product.image_url} alt="" />
                        </div>
                        <div>
                            <img src="https://saigonsneaker.com/wp-content/uploads/2020/11/574-2-700x700.jpg.webp" alt="" />
                        </div>
                        <div>
                            <img src="https://saigonsneaker.com/wp-content/uploads/2019/11/IMG_1013-700x700.jpg.webp" alt="" />
                        </div>
                        <div>
                            <img src="https://saigonsneaker.com/wp-content/uploads/2020/01/IMG_2217-2-650x650.jpg.webp" alt="" />
                        </div>
                    </div>
                </div>
                <div className="ProductDetail_container_right">
                    <div className="PD_con_right_info">
                        <div className="PD_con_right_info_name">
                            <h2>{product.name}</h2>
                            <span>{product.brand}</span>
                        </div>
                        <div className="PD_con_right_info_price">
                            <h3>{(product.price * (1 - product.sale_percent / 100)).toFixed(2)}$</h3>
                            <span>{product.price}$</span>
                            <h5>-{product.sale_percent}%</h5>
                        </div>
                        <div className="PD_con_right_info_color">
                            <span>Màu sắc</span>
                            <div>
                                <button style={{ backgroundColor: "#23A9ED" }}></button>
                                <button style={{ backgroundColor: "#1E68B2" }}></button>
                                <button style={{ backgroundColor: "#F0E68C" }}></button>
                            </div>
                        </div>
                        <div className="PD_con_right_info_size">
                            <span>Size</span>
                            <div>
                                <button>35</button>
                                <button>36</button>
                                <button>37</button>
                                <button>38</button>
                                <button>39</button>
                                <button>40</button>
                                <button>41</button>
                                <button>42</button>
                                <button>43</button>
                                <button>44</button>
                                <button>45</button>
                            </div>
                        </div>
                        <div className="PD_con_right_info_count">
                            <span>Số lượng</span>
                            <div>
                                <button onClick={() => setCountProduct(Math.max(countProduct - 1, 1))}>-</button>
                                <span>{countProduct}</span>
                                <button onClick={() => setCountProduct(countProduct + 1)}>+</button>
                            </div>
                        </div>
                    </div>
                    <button>Thêm vào giỏ hàng</button>
                </div>
            </div>

            <div className="ProductDetail_recommended">
                <h3>Sản phẩm tương tự</h3>
                <div className="Shop_right">
                    {
                        shoeses.slice(0, 10).map((shoes, index) => {
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

export default ProductDetail;