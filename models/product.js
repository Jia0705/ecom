// schema for products collection
const { Schema, model } = require("mongoose");

// Setup the schema
const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

// convert the schema to model
const Product = model("Product", productSchema);

module.exports = Product;