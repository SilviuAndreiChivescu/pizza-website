const mongoose = require('mongoose')

// Mongo pluralizes the name of the collection. This is the command to stop it
mongoose.pluralize(null);

const CartSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Price: {
        type: Number,
        require: true
    },
    numberOfProduct: {
        type: Number,
        require: true
    },
});

const cart = mongoose.model("cart", CartSchema)
module.exports = cart