import React from "react";


const CardComponent = (props) => {
    const {countInStock, description, image, name, price, rating, type, discount, selled} = props
    const onShowSizeChange = () => { }
    return (

                    <div className="product_info">
                        <a href="" style={{ textDecoration: 'none', color: 'black' }}>
                            <div className="product_img">
                                <img src="img/{images.jpg}" alt="Sấu giòn Tiến Thịnh" />
                            </div>
                            <h4 style={{ textAlign: 'center', paddingTop: '25px', fontSize: '20px', }}>{name}</h4>
                            <h4 style={{ textAlign: 'center', paddingTop: '20px', color: 'rgb(219, 66, 112)', fontSize: '16px', }}>{price}</h4>
                            <h4 style={{ textAlign: 'center', paddingTop: '20px', color: 'rgb(219, 66, 112)', fontSize: '16px', }}>DaBanSP {selled || 1000}</h4>
                        </a>
                    </div>
                    
    );
}

export default CardComponent