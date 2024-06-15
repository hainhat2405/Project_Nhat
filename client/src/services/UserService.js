import axios from "axios"
export const axiosJWT = axios.create()

export const loginUser = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/sign-in`, data)

    return res.data
}

export const signUpUser = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/sign-up`, data)

    return res.data
}

export const getDetailsUser = async (id, accessToken) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/user/get-details/${id}`, {
        headers: {
            token: `Bearer ${accessToken}`,
        }
    })

    return res.data
}

export const refreshToken = async () => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/refreshToken`, {
        withCredentials: true
    })

    return res.data
}

export const logoutUser = async () => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/log-out`)
    return res.data
}

export const updateUser = async (id, accessToken, data) => {
    const res = await axios.put(`${process.env.REACT_APP_API_URL}/user/update-user/${id}`, data, {
        headers: {
            token: `Bearer ${accessToken}`,
        }
    });
    return res.data;
}; 

export const getAllUser = async() => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/user/getAll`)
    return res.data 
} 
export const createUser = async(data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/createUser`,data)
    return res.data 
} 

export const deleteUser = async(id, accessToken) => {
    const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/user/delete-user/${id}`, {
        headers: {
            token: `Bearer ${accessToken}`,
        }
    })
    return res.data 
} 

export const deleteManyUser = async(data, accessToken) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/delete-many`, data, {
        headers: {
            token: `Bearer ${accessToken}`,
        }
    })
    return res.data 
} 