const { GetFromProducts } = require("../service/Products");

const GetProducts = async (req, res) => {
  const products = await GetFromProducts();

  return res.send(products);
};

module.exports = { GetProducts };
