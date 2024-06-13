import axios from "axios"
import { axiosJWT } from "./UserService"
export const getAllProduct = async() => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all`)
    return res.data 
} 

export const createProduct = async(data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/product/create`,data)
    return res.data 
} 

export const getDetailsProduct = async(id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-details/${id}`)
    return res.data 
} 

export const updateProduct = async(id, accessToken, data) => {
    const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/product/update/${id}`, data, {
        headers: {
            token: `Bearer ${accessToken}`,
        }
    })
    return res.data 
} 
export const deleteProduct = async(id, accessToken) => {
    const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/product/delete/${id}`, {
        headers: {
            token: `Bearer ${accessToken}`,
        }
    })
    return res.data 
} 