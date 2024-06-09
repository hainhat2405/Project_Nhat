const express = require("express");
const router = express.Router()
const userController = require('../controller/UserController');
const { authMiddleWare, authUserMiddleWare } = require("../middleware/authMiddleware");
router.post('/sign-up', userController.createUser)
router.post('/sign-in', userController.loginUser)
router.post('/log-out', userController.logoutUser)
router.put('/update-user/:id', userController.updateUser)
router.delete('/delete-user/:id', authMiddleWare, userController.deleteUser)
router.get('/getAll', authMiddleWare, userController.getAllUser)
router.get('/get-details/:id',  userController.getDetailsUser)
router.post('/refreshToken',  userController.refreshToken)


module.exports = router