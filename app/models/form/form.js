// Updated Form Model
const mongoose = require("mongoose");

// Schema for Forms
const formSchema = new mongoose.Schema({
  product_name: {
    type: String,
    required: true,
  },
  product_type: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pre_Order", "In_Stock","Out_of_Stock"],
    default: "In_Stock",
  },
  image: {
    type: String,
    required: false,
  },
  label: {
    type: String,
  },
  title: {
    type: String,
    required: false,
  },
  sub_title: {
    type: String,
  },
  description: {
    type: String,
    required: false,
  },
  total_price: {
    type: Number,
    required: false,
  },
  discount: {
    type: String,
    default: "0%",
  },
  total_before_discount: {
    type: Number,
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

const Form = mongoose.model("Form", formSchema);

module.exports = {
  Form,
};