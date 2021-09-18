const mongoose = require("mongoose");

// Mongo pluralizes the name of the collection. This is the command to stop it
mongoose.pluralize(null);

const OrdersSchema = new mongoose.Schema({
  Cart: {
    type: Array,
    required: true,
  },
  FirstName: {
    type: String,
    required: true,
  },
  LastName: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  Address: {
    type: String,
    require: true,
  },
  City: {
    type: String,
    require: true,
  },
  PhoneNumber: {
    type: Number,
    require: true,
  },
  DeliveryTime: {
    type: String,
    required: true,
  },
  DeliveryWay: {
    type: String,
    required: true,
  },
});

const orders = mongoose.model("orders", OrdersSchema);
module.exports = orders;
