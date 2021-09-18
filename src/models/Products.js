const mongoose = require("mongoose");

const ProductsSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Price: {
    type: Array,
    require: true,
  },
  Quantity: {
    type: Number,
    require: true,
  },
  Description: {
    type: String,
  },
  Image: {
    type: String,
  },
  Category: {
    type: String,
  },
});

const products = mongoose.model("products", ProductsSchema);
module.exports = products;
