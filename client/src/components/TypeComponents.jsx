import React, { useEffect, useState } from "react";
import HeaderComponent from "./HeaderComponents/HeaderComponent";
import MenuComponent from "./MenuComponent";
import CardComponent from "./CardComponents";
import FooterComponent from "./FooterComponent";
import { useLocation } from "react-router-dom";
import * as ProductService from '../services/ProductService';
import { Pagination } from "antd";


const TypeComponent = () => {
    const { state } = useLocation()
    const [products, setProducts] = useState([])
    const [panigate, setPanigate] = useState({
        page: 0,
        limit: 5,
        total: 1,
    })
    const fetchProductType = async (type, page, limit) => {
        const res = await ProductService.getProductType(type, page, limit)
        if (res?.status == 'OK') {
            setProducts(res?.data)
            setPanigate({...panigate, total: res?.total})
        } 
    }

    useEffect(() => {
        if (state) {
            fetchProductType(state, panigate.page, panigate.limit)
        }

    }, [state, panigate.page, panigate.limit])
    const onShowSizeChange = () => { }
    const onChange = (current, pageSize) => { 
        console.log({current,pageSize})
        setPanigate({...panigate, page: current - 1, limit: pageSize})
    }
    const productType = products.length > 0 ? products[0].type : '';
    return (

        <>
            <HeaderComponent />
            <MenuComponent />
            <div id="content">
                <div className="product">
                    <h1>{productType}</h1>
                    {products?.map((products) => {
                        return (
                           <>
                            
                            <CardComponent
                                key={products._id}
                                countInStock={products.countInStock}
                                description={products.description}
                                image={products.image}
                                name={products.name}
                                price={products.price}
                                rating={products.rating}
                                type={products.type}
                                selled={products.selled}
                                discount={products.discount}
                                id={products._id}
                            />
                           </>
                        )
                    })}
                </div>
            </div>
            <div className="phanTrang">
                        <Pagination
                            showSizeChanger
                            onShowSizeChange={onShowSizeChange}
                            defaultCurrent={panigate?.page + 1}
                            total={panigate?.total}
                            onChange={onChange}
                        />
                    </div>

            <FooterComponent />
        </>

    );
}

export default TypeComponent