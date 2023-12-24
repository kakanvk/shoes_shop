
import { Link } from "react-router-dom";
import "./Sale.css"
import { useEffect, useState } from "react";
import axios from 'axios';

function Sale() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);

        axios.get('http://localhost:8080/api/v1/products/full')
            .then(response => {
                console.log(response.data);
                setProducts(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });

    }, [])

    return (
        <div className="Shop">
            <div className="Shop_left">
                <div className="filter_type">
                    <span>LOẠI</span>
                    <div>
                        <button className="active_filter">Tất cả</button>
                        <button>Giày nam</button>
                        <button>Giày nữ</button>
                    </div>
                </div>
                <div className="filter_color">
                    <span>MÀU SẮC</span>
                    <div>
                        <button className="active_filter">All</button>
                        <button style={{ backgroundColor: "#23A9ED" }}></button>
                        <button style={{ backgroundColor: "#1E68B2" }}></button>
                        <button style={{ backgroundColor: "#F0E68C" }}></button>
                        <button style={{ backgroundColor: "#F9F9F0" }}></button>
                        <button style={{ backgroundColor: "#E07233" }}></button>
                        <button style={{ backgroundColor: "#DD3333" }}></button>
                        <button style={{ backgroundColor: "#91541E" }}></button>
                        <button style={{ backgroundColor: "#FFFFFF" }}></button>
                        <button style={{ backgroundColor: "#BA9E1A" }}></button>
                        <button style={{ backgroundColor: "#878787" }}></button>
                        <button style={{ backgroundColor: "#57A533" }}></button>
                    </div>
                </div>
                <div className="filter_size">
                    <span>SIZE</span>
                    <div>
                        <button className="active_filter">All</button>
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
                <div className="filter_price">
                    <span>GIÁ</span>
                    <div>
                        <button className="active_filter">Tất cả</button>
                        <button>Dưới 500k</button>
                        <button>Dưới 1 triệu</button>
                        <button>Dưới 2 triệu</button>
                    </div>
                </div>
            </div>

            <div className="Shop_right">
                {
                    products.map((shoes, index) => {
                        return (
                            <Link className="Shop_right_shoes" key={index} to={`/product/${shoes.id}`}>
                                <div className="shoes_top">
                                    <div className="shoes_top_img">
                                        <span className="shoes_tags">-{shoes.sale_percent}%</span>
                                        <img src={shoes.image_url} alt="" lazy="true"/>
                                    </div>
                                    <div className="shoes_top_info">
                                        <h3>{shoes.name}</h3>
                                        <span>{shoes.type_name.toUpperCase()}</span>
                                    </div>

                                </div>
                                <div className="shoes_bottom">
                                    <h4>{(shoes.price * (1 - shoes.sale_percent / 100)).toFixed(2)}$</h4>
                                    <span>{shoes.price}$</span>
                                </div>
                            </Link>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Sale;