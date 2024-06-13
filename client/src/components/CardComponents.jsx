import React from "react";
import { useNavigate } from "react-router-dom";
import HeaderComponent from "./HeaderComponents/HeaderComponent";
import MenuComponent from "./MenuComponent";
import FooterComponent from "./FooterComponent";
import { converPrice } from "../utils";


const CardComponent = (props) => {
    const { countInStock, description, image, name, price, rating, type, discount, selled, id } = props
    const navigate = useNavigate();
    const handleDetailsProduct = (id) => {
        navigate(`/${id}`)
    }
    const onShowSizeChange = () => { }
    return (
        <div className="product_info" onClick={() => handleDetailsProduct(id)}>
            <a href="" style={{ textDecoration: 'none', color: 'black' }}>
                <div className="product_img">
                    <img src={`/img/${image}`} alt="Sấu giòn Tiến Thịnh" />
                </div>
                <h4 style={{ textAlign: 'center', paddingTop: '25px', fontSize: '20px', }}>{name}</h4>
                <h4 style={{ textAlign: 'center', paddingTop: '20px', color: 'rgb(219, 66, 112)', fontSize: '16px', }}>{converPrice(price)}</h4>
                <h4 style={{ textAlign: 'center', paddingTop: '20px', color: 'rgb(219, 66, 112)', fontSize: '16px', }}>DaBanSP {selled || 1000}</h4>
            </a>
        </div>
    );
}

export default CardComponent