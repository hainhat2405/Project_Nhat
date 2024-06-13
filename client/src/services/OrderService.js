import axios from "axios"
import { axiosJWT } from "./UserService"


export const createOrder = async(accessToken, data) => {
    const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/order/create`, data, {
        headers: {
            token: `Bearer ${accessToken}`,
        }
    })
    return res.data 
} 