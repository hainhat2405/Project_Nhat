import axios from "axios"
import { axiosJWT } from "./UserService"


export const createOrder = async (data, accessToken) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/order/create`, data, {
        headers: {
            token: `Bearer ${accessToken}`,
        }
    })
    return res.data
}

export const getOrderByUserId = async (id, accessToken) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/order/get-all-order/${id}`, {
        headers: {
            token: `Bearer ${accessToken}`,
        }
    })
    return res.data
}

export const getAllOrder = async (accessToken) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/order/get-all-order`, {
        headers: {
            token: `Bearer ${accessToken}`,
        }
    })
    return res.data
}

export const getDetailOrder = async (id, accessToken) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/order/get-details-order/${id}`, {
        headers: {
            token: `Bearer ${accessToken}`,
        }
    })
    return res.data
}



export const cancelOrder = async (id, accessToken, orderItems, userId) => {
    const data = { orderItems, orderId: id }
    const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/order/cancel-order/${userId}`, { data }, {
        headers: {
            token: `Bearer ${accessToken}`,
        }
    })
    return res.data
}

export const ConfirmOrder = async(id, accessToken) => {
    const res = await axios.put(`${process.env.REACT_APP_API_URL}/order/confirm-order/${id}`, {
        headers: {
            token: `Bearer ${accessToken}`,
        }
    })
    return res.data 
} 

export const updateOrderStatus = async (id, accessToken) => {
    return axios.put(
        `${process.env.REACT_APP_API_URL}/order/confirm-order/${id}`,
        {},
        {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }
    );
};
