const express = require("express");
const router = express.Router()
const OrderController = require('../controller/OrderController');
const { authMiddleWare, authUserMiddleWare } = require("../middleware/authMiddleware");
router.post('/create', OrderController.createOrder)
router.get('/get-order-details/:id', OrderController.getOrderDetails)
router.get('/get-all-order/:id', OrderController.getAllOrderDetails)
router.delete('/cancel-order/:id', OrderController.cancelOrderDetails)
router.get('/get-details-order/:id', OrderController.getDetailOrder)
router.get('/get-all-order', OrderController.getAllOrder)
router.put('/confirm-order/:id', OrderController.confirmOrder);

module.exports = router