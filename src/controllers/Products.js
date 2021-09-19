const {
  GetFromProducts,
  InsertIntoProducts,
  UpdateProducts,
  DeleteProducts,
} = require("../service/Products");

const GetProducts = async (req, res) => {
  const products = await GetFromProducts();

  return res.send(products);
};

const InsertProduct = (req) => {
  const product = req.body.product;

  InsertIntoProducts(product);
};

const UpdateProduct = (req) => {
  const newProduct = req.body.newProduct;
  const id = req.body.id;

  UpdateProducts(id, newProduct);
};

const DeleteProduct = (req) => {
  const id = req.body.id;

  DeleteProducts(id);
};

module.exports = { GetProducts, InsertProduct, UpdateProduct, DeleteProduct };
