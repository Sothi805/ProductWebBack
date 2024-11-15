const express = require('express')
const productRouter =  express.Router()

const {getProducts, getProductById, createProduct, updateProduct, deleteProduct} = require('../controllers/products.controller.js');
const authMiddleware = require('../middleware/authMiddleware.js');

productRouter.get('/', getProducts);          // Fetch all products
productRouter.get('/:id', getProductById);    // Fetch product by ID

// POST /products: Create a new product
productRouter.post('/', authMiddleware, createProduct);

// PUT /products: Update existed product
productRouter.put('/:id', authMiddleware, updateProduct);

//DELETE /products: Delete a product
productRouter.delete('/:id', authMiddleware, deleteProduct);



module.exports = productRouter