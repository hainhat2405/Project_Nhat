import React from 'react'
import HeaderComponent from '../../components/HeaderComponents/HeaderComponent';
import MenuComponent from '../../components/MenuComponent';
import FooterComponent from '../../components/FooterComponent';
import ProductDetailComponents from '../../components/productDetailComponents';
import { useParams } from "react-router-dom";
const ProductDetailsPage = () => {

    const handlePopup = (url) => {
        window.open(url, 'popupwindow', 'scrollbars=yes,width=800,height=400').focus();
    };
    const showCart = () => {
        // Định nghĩa hàm showcart() tại đây
    };
    const {id} = useParams()
    // console.log('123', id)
    return (
        <>
            <HeaderComponent/>
            <MenuComponent/>
            <ProductDetailComponents idProduct={id}/>
            <FooterComponent/>
        </>
    )
}

export default ProductDetailsPage