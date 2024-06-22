import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as ProductService from '../services/ProductService';

const MenuComponent = () => {
    const [typeProduct, setTypeProduct] = useState([])
    const navigate = useNavigate();
    const handleDetailsProduct = (id) => {
        navigate(`/order`)
    }
    const fetchAllTypeProduct = async () => {
        const res = await ProductService.getAllTypeProduct()
        if(res?.status === 'OK'){
            setTypeProduct(res?.data)
        }
        
    }

    useEffect(() => {
        fetchAllTypeProduct()
    }, [])
    const handleNavigateType = (type) => {
        // Create a mapping of specific diacritical characters to their replacements
        const customReplacements = {
            'Đ': 'D',
            'đ': 'd',
            // Add other custom replacements as needed
        };
    
        // Normalize the string and replace diacritical marks
        let cleanedType = type.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    
        // Replace custom characters
        cleanedType = cleanedType.replace(/[Đđ]/g, match => customReplacements[match]);
    
        // Replace any remaining non-alphanumeric characters with '_'
        cleanedType = cleanedType.replace(/[^a-zA-Z0-9]/g, '_');
    
        // Navigate to the cleaned URL
        navigate(`/product/${cleanedType}`,{state: type});
    };
    
    return (
        <div id="menu">
            <div id="menu-dmsp">
                <nav className="container">
                    <ul id="main-menu">
                        <li>
                            <a style={{ padding: '15px 20px', color: 'white' }} href="">DANH MỤC SẢN PHẨM <i style={{ marginLeft: '10px', color: 'white' }} className="far fa-list-alt"></i></a>
                            <ul className="sub-menu">
                                {typeProduct.map((item) => {
                                    return (
                                        <li><a href="" onClick={() => handleNavigateType(item)}>{item}</a></li>
                                    )
                                })}
                            </ul>
                        </li>
                    </ul>
                </nav>

            </div>
            <div id="search">
                <div id="search-1">
                    <input type="search" name="src" id="src" style={{ width: '100%', height: '100%', padding: '0.375rem 0.75rem' }} placeholder="Tìm Kiếm Sản Phẩm" />
                </div>
            </div>
            <div id="icon-search">
                <i style={{ padding: '15px 25px', color: 'white' }} className="fa fa-search"></i>
            </div>
            <div id="giohang">
                <a href="" onClick={handleDetailsProduct}><i className="fa fa-shopping-cart" style={{ fontSize: '14px' }}></i>Giỏ hàng</a>
            </div>
        </div>
    );
}

export default MenuComponent