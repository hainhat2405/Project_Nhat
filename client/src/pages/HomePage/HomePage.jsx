import FooterComponent from "../../components/FooterComponent";
import HeaderComponent from "../../components/HeaderComponents/HeaderComponent";
import MenuComponent from "../../components/MenuComponent";
import Slider1 from '../../images/images.jpg'
import Slider2 from '../../images/banh-keo-dac-san-ha-noi(1).jpg';
import SlideComponent from "../../components/SlideComponents/SlideComponent";
import CardComponent from "../../components/CardComponents";
import { useQuery } from "@tanstack/react-query";
import * as ProductService from '../../services/ProductService'
import { Pagination } from "antd"

function HomePage() {
    const onShowSizeChange = () => { }
    const fetchProductAll = async () => {
        const res = await ProductService.getAllProduct()
        return res
    }
    const { isPending, data: products } = useQuery({ queryKey: ['products'], queryFn: fetchProductAll, retry: 3, retryDelay: 1000 })
    console.log("data", products)
    return (
        <>
        <HeaderComponent/>
        <MenuComponent/>
            <SlideComponent arrImages={[Slider1, Slider2]} />
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
                    <div className="phanTrang">
                        <Pagination
                            showSizeChanger
                            onShowSizeChange={onShowSizeChange}
                            defaultCurrent={10}
                            total={100}
                        />
                    </div>
                </div>
            </div>
        <FooterComponent/>
        </>
    );
}
export default HomePage