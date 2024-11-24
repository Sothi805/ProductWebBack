const Product = require("../models/products.model");

// Get all products
const getProducts = async (req, res) => {
    try {
        const { filter, sort, top, bottom, page, limit, ...query } = req.query;
    
        // **1. Filtering**: Use query params to filter products dynamically
        const filterCriteria = { ...query }; // Remaining query params will be used as filters
        // Optional: Convert ranges like ?price[gte]=10 to MongoDB query
        if (filter) {
          const parsedFilter = JSON.parse(filter); // Example: filter={"price":{"$gte":10}}
          Object.assign(filterCriteria, parsedFilter);
        }
    
        // **2. Sorting**: Use the `sort` query param (e.g., ?sort=price or ?sort=-price)
        const sortCriteria = sort ? sort.split(',').join(' ') : '';
    
        // **3. Pagination**: Use `page` and `limit` query params (e.g., ?page=1&limit=10)
        const resultsPerPage = parseInt(limit) || 10;
        const currentPage = parseInt(page) || 1;
        const skip = (currentPage - 1) * resultsPerPage;
    
        // **4. Top or Bottom N Records**
        if (top) filterCriteria.rating = { $gte: parseFloat(top) }; // Example: Top-rated (rating >= N)
        if (bottom) filterCriteria.rating = { $lte: parseFloat(bottom) }; // Example: Low-rated (rating <= N)
    
        // Fetch products with filters, sort, and pagination
        const products = await Product.find(filterCriteria)
          .sort(sortCriteria)
          .skip(skip)
          .limit(resultsPerPage);
    
        // Send response
        res.status(200).json({
          success: true,
          count: products.length,
          data: products,
        });
      } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Server error' });
      }
    }
  

// Get product by ID
const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new product
const createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body); // Create a product
        res.status(201).json(product); // 201 for successful creation
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update product by ID
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true }); // Update and return the updated document
        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete product by ID
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct };
