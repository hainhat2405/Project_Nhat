const express = require("express");
const router = express.Router()
const ProductController = require('../controller/ProductController');
const { authMiddleWare, authUserMiddleWare} = require("../middleware/authMiddleware");
router.post('/create', ProductController.createProduct)
router.put('/update/:id', ProductController.updateProduct)
router.get('/get-details/:id', ProductController.getDetailProduct)
router.delete('/delete/:id', ProductController.deleteProduct)
router.get('/get-all', ProductController.getAllProduct)
router.post('/delete-many', ProductController.deleteManyProduct)


module.exports = router