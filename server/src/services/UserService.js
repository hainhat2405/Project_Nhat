const User = require('../models/UserModel');
const bcrypt = require("bcrypt");
const { generateAccessToken, generateRefreshToken } = require('./JwtService');

const createUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const { name, email, password, phone } = newUser;
        try {
            const checkUser = await User.findOne({ email:email });
            if (checkUser !== null) {
                return resolve({
                    status: "ERR",
                    message: "The email is already",
                });
            }

            const hash = bcrypt.hashSync(password, 10);
            const createdUser = await User.create({
                name,
                email,
                password: hash,
                phone,
            });

            // const accessToken = await generateAccessToken({ id: createdUser._id, isAdmin: createdUser.isAdmin });
            // const refreshToken = await generateRefreshToken({ id: createdUser._id, isAdmin: createdUser.isAdmin });

            // createdUser.accessToken = accessToken;
            // createdUser.refreshToken = refreshToken;
            // await createdUser.save();

            if (createUser) {
                return resolve({
                    status: 'OK',
                    message: "User created successfully",
                    data:  createdUser
                });
            }
        } catch (e) {
            reject({
                status: 'ERR',
                message: e.message,
            });
        }
    });
};

const loginUser = (userLogin) => {
    return new Promise(async (resolve, reject) => {
        const { email, password } = userLogin;
        try {
            const checkUser = await User.findOne({ email });
            if (!checkUser) {
                return resolve({
                    status: "ERR",
                    message: "User not found",
                });
            }

            const comparePassword = bcrypt.compareSync(password, checkUser.password);
            if (!comparePassword) {
                return resolve({
                    status: 'ERR',
                    message: "Incorrect email or password",
                });
            }

            const accessToken = await generateAccessToken({
                id: checkUser._id,
                isAdmin: checkUser.isAdmin,
            });


            const refreshToken = await generateRefreshToken({
                id: checkUser._id,
                isAdmin: checkUser.isAdmin,
            });


            return resolve({
                status: 'OK',
                message: "Login successful",
                accessToken,
                refreshToken

            });
        } catch (e) {
            reject({
                status: 'ERR',
                message: e.message,
            });
        }
    });
};

const updateUser = (id, data) => {
    
    return new Promise(async (resolve, reject) => {
        try {
            
            const checkUser = await User.findById(id);
            if (!checkUser) {
                return resolve({
                    status: "ERR",
                    message: "User not found",
                });
            }

            const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });

            return resolve({
                status: 'OK',
                message: "Success",
                data: updatedUser
            });
        } catch (e) {
            reject({
                status: 'ERR',
                message: e.message,
            });
        }
    });
};
const deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findById(id);
            if (!checkUser) {
                return resolve({
                    status: "ERR",
                    message: "User not found",
                });
            }

            await User.findByIdAndDelete(id);

            return resolve({
                status: 'OK',
                message: "Delete user successfully",
            });
        } catch (e) {
            reject({
                status: 'ERR',
                message: e.message,
            });
        }
    });
};

const getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allUser = await User.find();

            return resolve({
                status: 'OK',
                message: "Success",
                data: allUser
            });
        } catch (e) {
            reject({
                status: 'ERR',
                message: e.message,
            });
        }
    });
};

const getDetailsUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findById(id);
            if (!user) {
                return resolve({
                    status: "ERR",
                    message: "User not found",
                });
            }

            return resolve({
                status: 'OK',
                message: "SUCCESS",
                data: user
            });
        } catch (e) {
            reject({
                status: 'ERR',
                message: e.message,
            });
        }
    });
};

module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailsUser
};
