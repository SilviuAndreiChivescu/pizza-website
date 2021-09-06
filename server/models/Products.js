const mongoose = require("mongoose");
// AM RAMAS AICI, THINK ABOUT THE SIZES OF PIZZA, HOW TO MAKE IT IN MY DB AND INTEGRATE
// idea: totu pleaca de la schema asta, pun ca si price un array, si gen dupa modific peste tot pe unde e cartu, il fac ca si default sa fie daca are doar un size, sa fie [0], dar daca are 3 size uri, cele 3 butoane din modal cu size u, sa puna indexu la asta [1/2]. Trebuie refactored toate alea care depinde de cart, pt ca acu nu mai e doar cart.Price, e cart.Price[0] probabi. Dai un git commit first
const ProductsSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Price: {
    type: Number,
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
