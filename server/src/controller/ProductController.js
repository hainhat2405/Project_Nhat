const ProductService = require('../services/ProductService');

const createProduct = async (req, res) => {
    try {
        const { name, image, type, price, countInStock, rating, description} = req.body;

        if (!name || !image || !type || !price || !countInStock || !rating ) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            });
        } 

        
        const result = await ProductService.createProduct(req.body);
        console.log("result",result)
        return res.status(200).json(result);
    } catch (e) {
        return res.status(404).json({
            status: 'ERR',
            message: e.message
        });
    }
};

const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id
        const data = req.body
        
        if(!productId){
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            });
        }
        const result = await ProductService.updateProduct(productId,data);
        return res.status(200).json(result);
    } catch (e) {
        return res.status(500).json({
            status: 'ERR',
            message: e.message
        });
    }
};

const getDetailProduct = async (req, res) => {
    try {
        const productId = req.params.id
        if(!productId){
            return res.status(200).json({
                status: 'ERR',
                message: 'The productID is required'
            });
        }
        const result = await ProductService.getDetailProduct(productId);
        return res.status(200).json(result);
    } catch (e) {
        return res.status(500).json({
            status: 'ERR',
            message: e.message
        });
    }
};

const getAllProduct = async (req, res) => {
    try {
        const {limit, page, sort, filter} = req.query
        const result = await ProductService.getAllProduct(Number(limit) || 100, Number(page) || 0, sort, filter);
        return res.status(200).json(result);
    } catch (e) {
        return res.status(500).json({
            message: e.message
        });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const productID = req.params.id
        if(!productID){
            return res.status(200).json({
                status: 'ERR',
                message: 'The productID is required'
            });
        }
        const result = await ProductService.deleteProduct(productID);
        return res.status(200).json(result);
    } catch (e) {
        return res.status(404).json({
            status: 'ERR',
            message: e.message
        });
    }
};



module.exports = {
    createProduct,
    updateProduct,
    getDetailProduct,
    deleteProduct,
    getAllProduct
};
