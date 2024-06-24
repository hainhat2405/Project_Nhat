const Order = require('../models/OrderProductModel');
const Product = require('../models/ProductModel');
const bcrypt = require("bcrypt");
const { generateAccessToken, generateRefreshToken } = require('./JwtService');

const createOrder = (newOrder) => {
    return new Promise(async (resolve, reject) => {
        const { orderItems, paymentMethod, itemsPrice, shippingPrice, totalPrice, fullName, address, city, phone, user } = newOrder;
        try {

            const promises = orderItems.map(async (order) => {

                const productData = await Product.findOneAndUpdate(
                    {
                        _id: order.product,
                        countInStock: { $gte: order.amount },
                    },
                    {
                        $inc: {
                            countInStock: -order.amount,
                            selled: +order.amount,
                        }
                    },
                    { new: true }
                );
                console.log('productData',productData)
                if (productData) {
                    const createOrder = await Order.create({
                        orderItems,
                        ShippingAddress: {
                            fullName,
                            address,
                            city,
                            phone
                        },
                        paymentMethod,
                        itemsPrice,
                        shippingPrice,
                        totalPrice,
                        user: user,
    
                    })
                    if (createOrder) {
                        return {
                            status: 'OK',
                            message: "SUCCESS",
                        }
                    }
                } else {
                    return {
                        status: 'OK',
                        message: "ERR",
                        id: order.product
                    }
                }
            })

            const results = await Promise.all(promises);
            const newData = results && results.filter((item) => item.data)
            if(newData.length){
                resolve({
                    status: 'ERR',
                    message: `Sản phẩm với id ${newData.join(',')} không đủ hàng`
                })
            }
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: results,
            });
        } catch (e) {
            reject({
                status: 'ERR',
                message: e.message,
            });
        }
    });
};


const getOrderDetails = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const order = await Order.findOne({
                user: id
            });
            if (order === null) {
                return resolve({
                    status: "ERR",
                    message: "The product is not defined",
                });
            }

            return resolve({
                status: 'OK',
                message: "SUCCESS",
                data: order
            });
        } catch (e) {
            reject({
                status: 'ERR',
                message: e.message,
            });
        }
    });
};

const getAllOrderDetails = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const order = await Order.find({
                user: id
            }).sort({createdAt: -1, updatedAt: -1})
            if (order === null) {
                resolve({
                    status: 'ERR',
                    message: 'The order is not defined'
                })
            }

            resolve({
                status: 'OK',
                message: 'SUCESSS',
                data: order
            })
        } catch (e) {
            // console.log('e', e)
            reject(e)
        }
    })
}

const cancelOrderDetails = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let order = []
            const promises = data.map(async (order) => {
                const productData = await Product.findOneAndUpdate(
                    {
                    _id: order.product,
                    selled: {$gte: order.amount}
                    },
                    {$inc: {
                        countInStock: +order.amount,
                        selled: -order.amount
                    }},
                    {new: true}
                )
                if(productData) {
                    order = await Order.findByIdAndDelete(id)
                    if (order === null) {
                        resolve({
                            status: 'ERR',
                            message: 'The order is not defined'
                        })
                    }
                } else {
                    return{
                        status: 'OK',
                        message: 'ERR',
                        id: order.product
                    }
                }
            })
            const results = await Promise.all(promises)
            const newData = results && results[0] && results[0].id
            
            if(newData) {
                resolve({
                    status: 'ERR',
                    message: `San pham voi id: ${newData} khong ton tai`
                })
            }
            resolve({
                status: 'OK',
                message: 'success',
                data: order
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getDetailOrder = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const order = await Order.findById({
                _id: id
            })
            if (order === null) {
                resolve({
                    status: 'ERR',
                    message: 'The order is not defined'
                })
            }

            resolve({
                status: 'OK',
                message: 'SUCESSS',
                data: order
            })
        } catch (e) {
            // console.log('e', e)
            reject(e)
        }
    })
}

const getAllOrder = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allOrder = await Order.find().sort({createdAt: -1, updatedAt: -1})
            resolve({
                status: 'OK',
                message: 'Success',
                data: allOrder
            })
        } catch (e) {
            reject(e)
        }
    })
}

const confirmOrder = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Tìm và cập nhật đơn hàng
            const order = await Order.findById(id);
            if (!order) {
                return resolve({
                    status: 'ERR',
                    message: 'The order is not defined'
                });
            }

            // Cập nhật isDelivered thành true
            order.isDelivered = true;
            await order.save();

            // Giả sử không cần phải điều chỉnh số lượng sản phẩm
            // Nếu cần thay đổi, bạn sẽ thêm code cập nhật số lượng sản phẩm ở đây

            resolve({
                status: 'OK',
                message: 'success',
                data: order
            });
        } catch (e) {
            console.error('Error:', e);
            reject({
                status: 'ERR',
                message: 'Failed to cancel order details',
                error: e.message
            });
        }
    });
};



module.exports = {
    createOrder,
    getOrderDetails,
    getAllOrderDetails,
    cancelOrderDetails,
    getDetailOrder,
    getAllOrder,
    confirmOrder
};
