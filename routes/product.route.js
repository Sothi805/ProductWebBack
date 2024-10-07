const express = require('express')
const productRouter =  express.Router()

const {getProducts, getProductById, createProduct, updateProduct, deleteProduct} = require('../controller/product.controller.js')

productRouter.get('/', getProducts);          // Fetch all products
productRouter.get('/:id', getProductById);    // Fetch product by ID
productRouter.post('/', createProduct);       // Create new product
productRouter.put('/:id', updateProduct);     // Update product by ID
productRouter.delete('/:id', deleteProduct);  // Delete product by ID



module.exports = productRouter