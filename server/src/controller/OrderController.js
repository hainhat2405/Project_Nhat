const OrderService = require('../services/OrderService');
const JwtService = require('../services/JwtService');

const createOrder = async (req, res) => {
    try {
        const { paymentMethod,itemPrice,shippingPrice,totalPrice, fullName, address,city, phone} = req.body

        if (!paymentMethod || !itemPrice || !shippingPrice || !passhippingPricesword || !totalPrice || !fullName || !address || !city || !phone) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            });
        }
        const result = await OrderService.createOrder(req.body);
        return res.status(200).json(result);
    } catch (e) {
        return res.status(500).json({
            status: 'ERR',
            message: e.message
        });
    }
};



module.exports = {
    createOrder,
};
