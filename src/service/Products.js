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

const InsertIntoProducts = async (product) => {
  const products = new ProductsModel({
    Name: product.name,
    Price: parseFloat(product.price),
    Quantity: product.quantity,
    Description: product.description,
    Image: product.imageUrl,
    Category: product.category,
  });

  try {
    await products.save();
  } catch (err) {
    console.log(err);
  }
};

// I have not tested this and below it yet but I think it works properly
const UpdateProducts = async (id, newProduct) => {
  try {
    await ProductsModel.findById(id, (err, updatedProduct) => {
      updatedProduct.Name = newProduct.name;
      updatedProduct.save();
    });
  } catch (err) {
    console.log(err);
  }
};

const DeleteProducts = async (id) => {
  try {
    await ProductsModel.findByIdAndRemove(id).exec();
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  GetFromProducts,
  InsertIntoProducts,
  UpdateProducts,
  DeleteProducts,
};
