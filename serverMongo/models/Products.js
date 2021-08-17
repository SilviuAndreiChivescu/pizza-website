const mongoose = require('mongoose')

const ProductsSchema = new mongoose.Schema({
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
    Description: {
        type: String,
    },
    Image: {
        type: String,
    },
    Category: {
        type: String,
    }

});

const Products = mongoose.model("Products", ProductsSchema)
module.exports = Products