const UserService = require('../services/UserService');
const JwtService = require('../services/JwtService');
const { deleteMany } = require('../models/UserModel');

const createUser = async (req, res) => {
    try {
        const { name, email, password, confirmPassword, phone, address, avatar } = req.body;
        const reg = /^\w+([-.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        const isCheckEmail = reg.test(email);

        if (!name || !email || !password || !confirmPassword || !phone || !address || !avatar) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            });
        } else if (!isCheckEmail) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is email'
            });
        } else if (password !== confirmPassword) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The password is equal confirmPassword'
            });
        }

        const result = await UserService.createUser(req.body);
        return res.status(200).json(result);
    } catch (e) {
        return res.status(500).json({
            status: 'ERR',
            message: e.message
        });
    }
};

const loginUser = async (req, res) => {
    try {
        const {  email, password} = req.body;
        const reg = /^\w+([-.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        const isCheckEmail = reg.test(email);
        if (!email || !password ) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            });
        } else if (!isCheckEmail) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is email'
            });
        } 
        
        const result = await UserService.loginUser(req.body);
        const {refreshToken, ...newResult} = result
        res.cookie('refreshToken',refreshToken, {
            httpOnly: true,
            secure: false,
            samesite: 'strict'

        })
        return res.status(200).json(newResult);
    } catch (e) {
        return res.status(500).json({
            status: 'ERR',
            message: e.message
        });
    }
};

const updateUser = async (req, res) => {
    try {
        const userId = req.params.id
        const data = req.body
        
        if(!userId){
            return res.status(200).json({
                status: 'ERR',
                message: 'The userId is required'
            });
        }
        const result = await UserService.updateUser(userId,data);
        return res.status(200).json(result);
    } catch (e) {
        return res.status(404).json({
            status: 'ERR',
            message: e
        });
    }
};

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id
        if(!userId){
            return res.status(200).json({
                status: 'ERR',
                message: 'The userId is required'
            });
        }
        const result = await UserService.deleteUser(userId);
        return res.status(200).json(result);
    } catch (e) {
        return res.status(500).json({
            status: 'ERR',
            message: e.message
        });
    }
};

const deleteManyUser = async (req, res) => {
    try {
        const ids = req.body.ids
        if(!ids){
            return res.status(200).json({
                status: 'ERR',
                message: 'The ids is required'
            });
        }
        const result = await UserService.deleteManyUser(ids);
        return res.status(200).json(result);
    } catch (e) {
        return res.status(500).json({
            status: 'ERR',
            message: e.message
        });
    }
};

const getAllUser = async (req, res) => {
    try {
        const result = await UserService.getAllUser();
        return res.status(200).json(result);
    } catch (e) {
        return res.status(500).json({
            status: 'ERR',
            message: e.message
        });
    }
};

const getDetailsUser = async (req, res) => {
    try {
        const userId = req.params.id
        if(!userId){
            return res.status(200).json({
                status: 'ERR',
                message: 'The userId is required'
            });
        }
        const result = await UserService.getDetailsUser(userId);
        return res.status(200).json(result);
    } catch (e) {
        return res.status(404).json({
            status: 'ERR',
            message: e.message
        });
    }
};

const refreshToken = async (req, res) => {
    try {
        const token = req.cookies.refreshToken
        if(!token){
            return res.status(200).json({
                status: 'ERR',
                message: 'The token is required'
            });
        }
        const result = await JwtService.refreshToken(token);
        return res.status(200).json(result);
    } catch (e) {
        return res.status(404).json({
            // status: 'ERR',
            // message: e
            message: e
        });
    }
};

const logoutUser = async (req, res) => {
    try {
        res.clearCookie('refreshToken')
        return res.status(200).json({
            status: 'OK',
            message: 'Logout successfully'

        });
    } catch (e) {
        return res.status(404).json({
            status: 'ERR',
            message: e.message
        });
    }
};


module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailsUser,
    refreshToken,
    logoutUser,
    deleteManyUser
};
