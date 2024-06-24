const OrderService = require('../services/OrderService');
const JwtService = require('../services/JwtService');

const createOrder = async (req, res) => {
    try {
        const { paymentMethod,itemsPrice,shippingPrice,totalPrice, fullName, address,city, phone} = req.body

        if (!paymentMethod || !itemsPrice || !shippingPrice || !totalPrice || !fullName || !address || !city || !phone) {
            return res.status(200).json({
                status: 'ERR',
                
                message: 'The input is required'
            });
        }
        const result = await OrderService.createOrder(req.body);
        return res.status(200).json(result);
    } catch (e) {
        return res.status(400).json({
            status: 'ERR',
            message: e.message
        });
    }
};

const getOrderDetails= async (req, res) => {
    try {
        const userId = req.params.id
        if(!userId){
            return res.status(200).json({
                status: 'ERR',
                message: 'The userId is required'
            });
        }
        const result = await OrderService.getOrderDetails(userId);
        return res.status(200).json(result);
    } catch (e) {
        return res.status(500).json({
            status: 'ERR',
            message: e.message
        });
    }
};

const getAllOrderDetails = async (req, res) => {
    try {
        const userId = req.params.id
        if (!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The userId is required'
            })
        }
        const response = await OrderService.getAllOrderDetails(userId)
        return res.status(200).json(response)
    } catch (e) {
        // console.log(e)
        return res.status(404).json({
            message: e
        })
    }
}

const cancelOrderDetails = async (req, res) => {
    try {
        const data= req.body.orderItems
        const orderId= req.body.orderId
        if (!orderId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The orderId is required'
            })
        }
        const response = await OrderService.cancelOrderDetails(orderId, data)
        return res.status(200).json(response)
    } catch (e) {
        // console.log(e)
        return res.status(404).json({
            message: e
        })
    }
}

const getDetailOrder = async (req, res) => {
    try {
        const orderId = req.params.id
        if (!orderId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The userId is required'
            })
        }
        const response = await OrderService.getDetailOrder(orderId)
        return res.status(200).json(response)
    } catch (e) {
        // console.log(e)
        return res.status(404).json({
            message: e
        })
    }
}

const getAllOrder = async (req, res) => {
    try {
        const data = await OrderService.getAllOrder()
        return res.status(200).json(data)
    } catch (e) {
        // console.log(e)
        return res.status(404).json({
            message: e
        })
    }
}
const confirmOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        if (!orderId) {
            return res.status(400).json({
                status: 'ERR',
                message: 'The orderId is required'
            });
        }
        const response = await OrderService.confirmOrder(orderId);
        return res.status(200).json(response);
    } catch (e) {
        console.error(e);
        return res.status(500).json({
            status: 'ERR',
            message: 'Internal server error',
            error: e.message
        });
    }
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
