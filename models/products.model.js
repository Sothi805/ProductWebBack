const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter the product's name"],
    },
    type: {
      type: String,
      required: [true, "Please enter the product's type"],
    },
    category: {
      type: String,
      required: true,
      default: "uncategorized",
    },
    quantity: {
      type: Number, // Corrected the field name
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "Please enter the product's price"],
    },
    image: {
      type: String, // Optional by default
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
