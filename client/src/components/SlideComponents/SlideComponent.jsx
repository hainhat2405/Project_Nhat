import React from "react";
import Slider from "react-slick";
import { Image } from "antd";

const SlideComponent = ({ arrImages }) => {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2500,
    };

    return (
        <div className="Slider_IMG">
            <Slider {...settings}>
                {arrImages.map((image) => {
                    return (
                        <Image key={image} className="img_S" src={image} alt="slider" preview={false} width="100%" height="450px"/>
                    );
                })}

            </Slider>
        </div>
    );
}

export default SlideComponent