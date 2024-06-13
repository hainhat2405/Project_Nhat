const express = require("express");
const router = express.Router()
const OrderController = require('../controller/OrderController');
const { authMiddleWare, authUserMiddleWare } = require("../middleware/authMiddleware");
router.post('/create',authUserMiddleWare, OrderController.createOrder)


module.exports = router