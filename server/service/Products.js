const ProductsModel = require("../models/Products");

const GetFromProducts = async () => {
  try {
    const products = await ProductsModel.find({}, (err, result) => {
      return result;
    });
    return products;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { GetFromProducts };
