import React, { useEffect, useMemo } from 'react'
import HeaderComponent from '../../components/HeaderComponents/HeaderComponent'
import MenuComponent from '../../components/MenuComponent'
import FooterComponent from '../../components/FooterComponent'
import "../../assets/css/list/order.css"
import { useLocation, useParams } from 'react-router-dom'
import * as OrderService from '../../services/OrderService';
import { useQuery } from '@tanstack/react-query'
import { orderContent } from "../../content";
import { converPrice } from '../../utils'

const DetailOrderPage = () => {
    const params = useParams();
    const location = useLocation();
    const { state } = location;
    const { id } = params;

    const fetchDetailOrder = async () => {
        const res = await OrderService.getDetailOrder(id, state?.token);
        return res.data;
    };

    const queryOrder = useQuery({
        queryKey: ['orders-details', id],
        queryFn: fetchDetailOrder,
        enabled: !!id,  // Ensure enabled is a boolean
    });

    const { isLoading, data } = queryOrder;
    console.log('daad', data)
    const ShippingAddress = data?.ShippingAddress;
    const orderItems = data?.orderItems;
    const paymentMethod = data?.paymentMethod;
    const shippingPrice = data?.shippingPrice;
    const totalPrice = data?.totalPrice;
    const priceMemo = useMemo(() => {
        const result = data?.orderItems?.reduce((total, cur) => {
            return total + ((cur.price * cur.amount))
        }, 0)
        return result
    }, [data])
    return (
        <>
            <HeaderComponent />
            <MenuComponent />
            <div className="container-order">
                <div className="info-sections">
                    <div className="section">
                        <h3>Chi tiết đơn hàng</h3>
                        <div className="info-box">
                            <p><strong>Địa chỉ người nhận:</strong></p>
                            <p>{ShippingAddress?.fullName}</p>
                            <p>Địa chỉ: {ShippingAddress?.address} - {ShippingAddress?.city}</p>
                            <p>Điện thoại: {ShippingAddress?.phone}</p>
                        </div>
                    </div>

                    <div className="section">
                        <h3>Hình thức giao hàng</h3>
                        <div className="info-box">
                            <p>
                                {paymentMethod === "later_money" && (
                                    <span><i style={{ fontSize: '16px', fontWeight: 'bold', color: 'orange', fontFamily: 'Arial, sans-serif' }}>FAST</i> giao hàng tiết kiệm</span>
                                )},
                                {paymentMethod === "paypal" && (
                                    <span><i style={{ fontSize: '16px', fontWeight: 'bold', color: 'orange', fontFamily: 'Arial, sans-serif' }}>GO_JEK</i> giao hàng tiết kiệm</span>
                                )}
                            </p>
                            <p>Phí giao hàng: {converPrice(shippingPrice)}</p>
                        </div>
                    </div>

                    <div className="section">
                        <h3>Hình thức thanh toán</h3>
                        <div className="info-box">
                            <p>Chưa thanh toán</p>
                        </div>
                    </div>
                </div>

                <div className="section">
                    <h3>Sản phẩm</h3>
                    {orderItems?.map((order) => {
                        return (
                            <div className="product-list">
                                <div className="product-item">
                                    <span><img src={`/img/${order?.image}`} alt={order?.name}/> {order?.name}</span>
                                    <span>Số lượng: x{order?.amount}</span>
                                    <span>{converPrice(order?.price)}</span>
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div className="section summary">
                    <p><strong>Tạm tính:</strong> {converPrice(priceMemo)}</p>
                    <p><strong>Phí vận chuyển:</strong> {converPrice(shippingPrice)}</p>
                    <p><strong>Tổng cộng:</strong> {converPrice(totalPrice)}</p>
                </div>
            </div>
            <FooterComponent />
        </>
    )
}

export default DetailOrderPage