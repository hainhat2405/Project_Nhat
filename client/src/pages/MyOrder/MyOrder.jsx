import React, { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import * as OrderService from '../../services/OrderService';
import Loading from '../../components/LoadingComponents/Loading';
import { useSelector } from 'react-redux';
import TableComponents from '../../components/TableComponent/TableComponents';
import { converPrice } from "../../utils";
import { DeleteOutlined } from '@ant-design/icons';
import HeaderComponent from '../../components/HeaderComponents/HeaderComponent';
import MenuComponent from '../../components/MenuComponent';
import FooterComponent from '../../components/FooterComponent';
import { useMutationHooks } from '../../hooks/useMutationHook';
import { useLocation, useNavigate } from 'react-router-dom';
import * as Message from '../../components/Message/Message';

const MyOrder = () => {
    const location = useLocation()
    const { state } = location
    const order = useSelector((state) => state.order)
    const user = useSelector((state) => state.user)
    const navigate = useNavigate()
    const fetchMyOrder = async () => {
        const res = await OrderService.getOrderByUserId(user?.id, user?.token)
        console.log('ressssa', res)
        return res.data

    }

    const queryOrder = useQuery({
        queryKey: ['orders'],
        queryFn: () => fetchMyOrder(),
        enabled: user?.id && user?.token
    });


    const { isLoading, data } = queryOrder

    const mutation = useMutationHooks(
        (data) => {
            const { id, token, orderItems, userId } = data
            //   const res = OrderService.cancelOrder(id, token,orderItems, userId)
            //   return res
        }
    )


    const renderProduct = (data) => {
        return data?.map((order) => {
            return <div className="order-item">
                <img src={`/img/${order?.image}`} alt="Product Image" />
                <div className="order-details">
                    <div>{order?.name}</div>
                </div>
                <div className="order-details">
                    <div>Số lượng: x{order?.amount}</div>
                </div>
                <div className="order-price"> Giá tiền:  {converPrice(order?.price)}</div>
            </div>
        })
    }

    const mutationCancel = useMutationHooks(
        (data) => {
            const { id, token, orderItems, userId } = data
            const res = OrderService.cancelOrder(id, token, orderItems, userId)
            return res
        }
    )

    const handleCanceOrder = (order) => {
        mutationCancel.mutate({ id: order._id, token: state?.token, orderItems: order?.orderItems, userId: user.id }, {
            onSuccess: () => {
                queryOrder.refetch()
            },
        })
    }
    const { isLoading: isLoadingCancel, isSuccess: isSuccessCancel, isError: isErrorCancle, data: dataCancel } = mutation

    useEffect(() => {
        if (isSuccessCancel && dataCancel?.status === 'OK') {
            Message.success()
        } else if (isSuccessCancel && dataCancel?.status === 'ERR') {
            Message.error(dataCancel?.Message)
        } else if (isErrorCancle) {
            Message.error()
        }
    }, [isErrorCancle, isSuccessCancel])

    const handleDetailsOrder = (id) => {
        navigate(`/details-order/${id}`, {
          state: {
            token: state?.token
          }
        })
            console.log('orID', order?._id)
      }
    return (
        <>
            <HeaderComponent />
            <MenuComponent />
            {/* <Loading isPending={isLoading}> */}


            {data?.map((order) => {
                return (
                    <>
                        <div className="order-container" key={order?._id}>
                            <div className="order-header">

                                <div className="order-status">
                                    <span style={{ fontSize: '14px', fontWeight: 'bold', color: 'black' }}>Trạng thái</span>
                                    <h4>Giao hàng: {`${order.isDelivered ? 'Đã giao hàng' : 'Chưa giao hàng'}`}</h4>
                                    <h4>Thanh toán: {`${order.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'}`}</h4>
                                </div>
                            </div>
                            {renderProduct(order?.orderItems)}
                            <div className="order-total">
                                <div>Tổng tiền:</div>
                                <div>{converPrice(order?.itemsPrice)}</div>
                            </div>
                            <div className="order-actions">
                                <button className="cancel-button" onClick={() => handleCanceOrder(order)}>Hủy đơn hàng</button>
                                <button className="details-button" onClick={() => handleDetailsOrder(order?._id)}>Xem chi tiết</button>
                            </div>
                        </div>

                    </>
                )

            })}
            {/* </Loading> */}
            <FooterComponent />
        </>
    )
}

export default MyOrder