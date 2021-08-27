const mongoose = require("mongoose");

// Mongo pluralizes the name of the collection. This is the command to stop it
mongoose.pluralize(null);

const OrdersSchema = new mongoose.Schema({
  Email: {
    type: String,
    required: true,
  },
  Cart: {
    type: Array,
    required: true,
  },
  //   Address: {
  //     type: String,
  //     require: true,
  //   },
  //   PhoneNumber: {
  //     type: Number,
  //     require: true,
  //   },
});

const orders = mongoose.model("orders", OrdersSchema);
module.exports = orders;
