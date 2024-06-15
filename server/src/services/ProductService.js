const Product = require('../models/ProductModel');


const createProduct = (newProduct) => {
    return new Promise(async (resolve, reject) => {
        const { name, image, type, price, countInStock, rating, description, discount} = newProduct;
        try {
            const checkProduct = await Product.findOne({ name });
            if (checkProduct !== null) {
                return resolve({
                    status: "OK",
                    message: "The name of product is already",
                });
            }
            const newProduct = await Product.create({
                name,
                image,
                type, 
                price, 
                countInStock, 
                rating, 
                description,
                discount
            });

            if (newProduct) {
                return resolve({
                    status: "OK",
                    message: "SUCCESS",
                    data: newProduct
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

const updateProduct = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findById(id);
            if (!checkProduct) {
                return resolve({
                    status: "OK",
                    message: "The product is not defined",
                });
            }

            const updateProduct = await Product.findByIdAndUpdate(id, data, { new: true });
            
            return resolve({
                status: 'OK',
                message: "Product updated successfully",
                data: updateProduct
            });
        } catch (e) {
            reject({
                status: 'ERR',
                message: e.message,
            });
        }
    });
};

const deleteProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findById(id);
            if (!checkProduct) {
                return resolve({
                    status: "ERR",
                    message: "The product is not defined",
                });
            }

            await Product.findByIdAndDelete(id);
            
            return resolve({
                status: 'OK',
                message: "Delete product successfully",
            });
        } catch (e) {
            reject({
                status: 'ERR',
                message: e.message,
            });
        }
    });
};

const deleteManyProduct = (ids) => {
    return new Promise(async (resolve, reject) => {
        try {
            await Product.deleteMany({_id: ids});
            
            return resolve({
                status: 'OK',
                message: "Delete product successfully",
            });
        } catch (e) {
            reject({
                status: 'ERR',
                message: e.message,
            });
        }
    });
};

const getAllProduct = (limit, page, sort,filter) => {
    return new Promise(async (resolve, reject) => {
        try {
            const totalProduct = await Product.countDocuments()
            if(filter){
                const label = filter[0]
                console.log("label",label)
                const allObjectFilter = await Product.find({
                    [label]: {'$regex': filter[1]}
                }).limit(limit).skip(page * limit)
                return resolve({
                    status: 'OK',
                    message: "Success",
                    data: allObjectFilter,
                    totalProduct: totalProduct,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(totalProduct / limit)
                });
            }
            if(sort){
                const objectSort = {}
                objectSort[sort[1]] = sort[0]
                const allProductSort = await Product.find().limit(limit).skip(page * limit).sort(objectSort)
                return resolve({
                    status: 'OK',
                    message: "Success",
                    data: allProductSort,
                    totalProduct: totalProduct,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(totalProduct / limit)
                });
            }
            const allProduct = await Product.find().limit(limit).skip(page * limit).sort()
            return resolve({
                status: 'OK',
                message: "Success",
                data: allProduct,
                totalProduct: totalProduct,
                pageCurrent: Number(page + 1),
                totalPage: Math.ceil(totalProduct / limit)
            });
            
        } catch (e) {
            reject({
                status: 'ERR',
                message: e.message,
            });
        }
    });
};

const getDetailProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const product = await Product.findById(id);
            if (!product) {
                return resolve({
                    status: "ERR",
                    message: "The product is not defined",
                });
            }
            
            return resolve({
                status: 'OK',
                message: "SUCCESS",
                data: product
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
    createProduct,
    updateProduct,
    getDetailProduct,
    deleteProduct,
    getAllProduct,
    deleteManyProduct
};
