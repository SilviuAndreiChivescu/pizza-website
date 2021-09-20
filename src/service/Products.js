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

const UpdateProducts = async (id, newProduct) => {
  // Firstly it is checked how many options the product has and makes the sizes in the priceArray
  if (
    newProduct.price !== 0 &&
    newProduct.price2 !== 0 &&
    newProduct.price3 !== 0
  ) {
    var priceArray = new Array(
      parseFloat(newProduct.price),
      parseFloat(newProduct.price2),
      parseFloat(newProduct.price3)
    );
  } else if (newProduct.price !== 0 && newProduct.price2 !== 0) {
    var priceArray = new Array(
      parseFloat(newProduct.price),
      parseFloat(newProduct.price2)
    );
  } else if (newProduct.price !== 0)
    var priceArray = new Array(parseFloat(newProduct.price));

  try {
    await ProductsModel.findById(id, (err, updatedProduct) => {
      updatedProduct.Name = newProduct.name;
      updatedProduct.Price = priceArray;
      updatedProduct.Quantity = newProduct.quantity;
      updatedProduct.Description = newProduct.description;
      updatedProduct.Image = newProduct.imageUrl;
      updatedProduct.Category = newProduct.category;
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
