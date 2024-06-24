import FooterComponent from "../../components/FooterComponent";
import HeaderComponent from "../../components/HeaderComponents/HeaderComponent";
import MenuComponent from "../../components/MenuComponent";
import Slider1 from '../../images/images.jpg'
import Slider2 from '../../images/banh-keo-dac-san-ha-noi(1).jpg';
import SlideComponent from "../../components/SlideComponents/SlideComponent";
import CardComponent from "../../components/CardComponents";
import { useQuery } from "@tanstack/react-query";
import * as ProductService from '../../services/ProductService'
import { Button, ConfigProvider, Pagination, Space } from "antd"
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import Loading from "../../components/LoadingComponents/Loading";
import { useDebounce } from "../../hooks/useDebounce";
import { TinyColor } from '@ctrl/tinycolor';
import "../../assets/css/list/Card.css"


const HomePage = () => {

    const searchProduct = useSelector((state) => state?.product?.search)
    const searchDebounce = useDebounce(searchProduct, 1000)
    const [limit, setLimit] = useState(10)
    const [loading, setLoading] = useState(false)
    const fetchProductAll = async (context) => {
        const limit = context?.queryKey && context?.queryKey[1]
        const search = context?.queryKey && context?.queryKey[2]
        const res = await ProductService.getAllProduct(search, limit)

        return res
    }

    const { isLoading, data: products } = useQuery({ queryKey: ['products', limit, searchDebounce], queryFn: fetchProductAll, retry: 3, retryDelay: 1000 })



    const colors1 = ['#6253E1', '#04BEFE'];
    const colors2 = ['#fc6076', '#ff9a44', '#ef9d43', '#e75516'];
    const colors3 = ['#40e495', '#30dd8a', '#2bb673'];
    const getHoverColors = (colors) =>
        colors.map((color) => new TinyColor(color).lighten(5).toString());
    const getActiveColors = (colors) =>
        colors.map((color) => new TinyColor(color).darken(5).toString());
    return (
        <>
            <HeaderComponent />
            <MenuComponent />
            <SlideComponent arrImages={[Slider1, Slider2]} />
            <Loading isPending={isLoading || loading}>
                <div id="content">
                    <div className="product">
                        <div className="category_name">
                            <h1>Bánh kẹo</h1>
                        </div>
                        <div className="view_cat">
                            <a href="">
                                Xem tất cả <i className="fa-solid fa-arrow-right" style={{ marginTop: '1px' }}></i>
                            </a>
                        </div>
                        {products?.data?.map((products) => {
                            return (
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
                            )
                        })}
                        <div style={{marginLeft: '47%', marginTop: '30px', width: '100px'}}>
                            <Space >
                                <ConfigProvider
                                    theme={{
                                        components: {
                                            Button: {
                                                colorPrimary: `linear-gradient(135deg, ${colors1.join(', ')})`,
                                                colorPrimaryHover: `linear-gradient(135deg, ${getHoverColors(colors1).join(', ')})`,
                                                colorPrimaryActive: `linear-gradient(135deg, ${getActiveColors(colors1).join(', ')})`,
                                                lineWidth: 0,
                                            },
                                        },
                                    }}
                                >
                                    <Button type="primary" size="large" onClick={() => setLimit((prev) => prev + 5)}>
                                        Xem thêm
                                    </Button>
                                </ConfigProvider>
                                
                            </Space>
                            </div>
                    </div>
                </div>
            </Loading>
            <FooterComponent />
        </>
    );
}
export default HomePage