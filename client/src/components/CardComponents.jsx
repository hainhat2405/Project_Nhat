import React from "react";
import { useNavigate } from "react-router-dom";
import HeaderComponent from "./HeaderComponents/HeaderComponent";
import MenuComponent from "./MenuComponent";
import FooterComponent from "./FooterComponent";
import { converPrice } from "../utils";
// import "../assets/css/list/DanhMuc.css"
import "../assets/css/list/Card.css"

const CardComponent = (props) => {
    const { countInStock, description, image, name, price, rating, type, discount, selled, id } = props
    const navigate = useNavigate();
    const handleDetailsProduct = (id) => {
        navigate(`/detailProduct/${id}`)
    }
    const isDisabled = countInStock === 0;
    const onShowSizeChange = () => { }
    return (
        <div 
        className="product_info" 
        onClick={() => !isDisabled && handleDetailsProduct(id)} 
        style={{
            backgroundColor: isDisabled ? '#ccc' : '#fff',
            cursor: isDisabled ? 'not-allowed' : 'pointer',
            opacity: isDisabled ? 0.5 : 1,
            pointerEvents: isDisabled ? 'none' : 'auto',
            position: 'relative', // Ensure the out of stock message is positioned correctly
            textAlign: 'center' // Center align text
        }}
    >
         {isDisabled && (
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    color: 'black',
                    fontSize: '20px',
                    fontWeight: 'bold',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    padding: '10px',
                    borderRadius: '5px',
                }}>
                    Hết hàng
                </div>
            )}
        <a href="#" style={{ textDecoration: 'none', color: 'black' }}>
            <div className="product_img">
                <img src={`/img/${image}`} alt={name} />
            </div>
            <h4 style={{ textAlign: 'center', paddingTop: '25px', fontSize: '16px' }}>{name}</h4>
            <h4 style={{color: 'rgb(219, 66, 112)',paddingTop: '25px', fontSize: '16px' }}>{rating} <i class="fa-solid fa-star" style={{color: 'rgb(253, 210, 45)', fontSize: '12px'}}></i> | Đã Bán {selled || 0} </h4>
            <h4 style={{ textAlign: 'center',paddingTop: '25px', color: 'rgb(219, 66, 112)', fontSize: '18px' }}>{converPrice(price)} </h4> 
        </a>
    </div>
    );
}

export default CardComponent