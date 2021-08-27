const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const mongoPassword = require("./mongoPassword");

const ProductsModel = require("./models/Products");
const OrdersModel = require("./models/Orders");

app.use(express.json());
app.use(cors());

mongoose.connect(mongoPassword, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// To handle deprecation of findAndModify mongo
mongoose.set("useFindAndModify", false);

// ************ Products collection ************
app.post("/insert", async (req, res) => {
  const name = req.body.name;
  const price = req.body.price;
  const numberOfProduct = req.body.numberOfProduct;

  const products = new ProductsModel({
    Name: name,
    Price: price,
    Description: "Acu bag din front-end",
    numberOfProduct: numberOfProduct,
  });

  try {
    await products.save();
    res.send("inserted data");
    console.log("inserted data");
  } catch (err) {
    console.log(err);
  }
});

app.get("/read", (req, res) => {
  try {
    ProductsModel.find({}, (err, result) => {
      res.send(result);
    });
  } catch (err) {
    console.log(err);
  }
});

// Read all data from Orders collection for particular user
app.get("/read/:email", (req, res) => {
  const email = req.params.email;
  try {
    OrdersModel.find({ Email: email }, (err, result) => {
      res.send(result);
    });
  } catch (err) {
    console.log(err);
  }
});
// **** END OF ORDERS COLLECTION

app.put("/update", async (req, res) => {
  const newNumberOfProduct = req.body.newNumberOfProduct;
  const id = req.body.id;

  try {
    await ProductsModel.findById(id, (err, updatedProduct) => {
      updatedProduct.numberOfProduct = newNumberOfProduct;
      updatedProduct.save();
    });
  } catch (err) {
    console.log(err);
  }
});

app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  res.send(id);

  try {
    await ProductsModel.findByIdAndRemove(id).exec();
    console.log("deleted");
  } catch (err) {
    console.log(err);
  }
});
// ************ END OF Products Collection ************

// ************ Orders collection ************
app.post("/insertIntoOrders", async (req, res) => {
  const email = req.body.Email;
  const cart = req.body.Cart;

  const products = new OrdersModel({
    Email: email,
    Cart: cart,
  });

  try {
    await products.save();
    res.send("inserted data");
    console.log("inserted data");
  } catch (err) {
    console.log(err);
  }
});

app.get("/readFromOrders", (req, res) => {
  try {
    CartModel.find({}, (err, result) => {
      res.send(result);
    });
  } catch (err) {
    console.log(err);
  }
});
// ************ END OF ORDERS COLLECTION ************
app.listen(3001, () => {
  console.log("Server running on port 3001");
});
