const User = require('../models/OrderProductModel');
const bcrypt = require("bcrypt");
const { generateAccessToken, generateRefreshToken } = require('./JwtService');

const createOrder = (newOrder) => {
    return new Promise(async (resolve, reject) => {
        console.log("new", newOrder)
        //     const { name, email, password, phone } = newOrder;
    //     try {
    //         const checkUser = await User.findOne({ email:email });
    //         if (checkUser !== null) {
    //             return resolve({
    //                 status: "ERR",
    //                 message: "The email is already",
    //             });
    //         }

    //         const hash = bcrypt.hashSync(password, 10);
    //         const createdUser = await User.create({
    //             name,
    //             email,
    //             password: hash,
    //             phone,
    //         });

    //         // const accessToken = await generateAccessToken({ id: createdUser._id, isAdmin: createdUser.isAdmin });
    //         // const refreshToken = await generateRefreshToken({ id: createdUser._id, isAdmin: createdUser.isAdmin });

    //         // createdUser.accessToken = accessToken;
    //         // createdUser.refreshToken = refreshToken;
    //         // await createdUser.save();

    //         if (createOrder) {
    //             return resolve({
    //                 status: 'OK',
    //                 message: "User created successfully",
    //                 data:  createdUser
    //             });
    //         }
    //     } catch (e) {
    //         reject({
    //             status: 'ERR',
    //             message: e.message,
    //         });
    //     }
    });
};


module.exports = {
    createOrder,
};
