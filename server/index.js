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
  const quantity = req.body.quantity;
  const category = req.body.category;

  const products = new ProductsModel({
    Name: name,
    Price: price,
    Description: "Acu bag din front-end",
    Quantity: quantity,
    Category: category,
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

app.put("/update", async (req, res) => {
  const newNumberOfProduct = req.body.newNumberOfProduct;
  const id = req.body.id;

  try {
    await ProductsModel.findById(id, (err, updatedProduct) => {
      updatedProduct.quantity = newNumberOfProduct;
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
// **** END OF Products Collection ****

// **** Orders collection ****
app.post("/insertIntoOrders", async (req, res) => {
  const name = req.body.Name;
  const email = req.body.Email;
  const cart = req.body.Cart;
  const address = req.body.Address;
  const phoneNumber = req.body.PhoneNumber;
  const deliveryTime = req.body.DeliveryTime;
  const deliveryWay = req.body.DeliveryWay;

  const products = new OrdersModel({
    Name: name,
    Email: email,
    Cart: cart,
    Address: address,
    PhoneNumber: phoneNumber,
    DeliveryTime: deliveryTime,
    DeliveryWay: deliveryWay,
  });

  try {
    await products.save();
    res.send("inserted data");
    console.log("inserted data");
  } catch (err) {
    console.log(err);
  }
});

// Read all Cart data from Orders collection for a particular user(received from params)
app.get("/read/:email", (req, res) => {
  const email = req.params.email;
  try {
    OrdersModel.find({ Email: email }, { Cart: 1 }, (err, result) => {
      res.send(result);
    });
  } catch (err) {
    console.log(err);
  }
});

// Read order find by idOfOrder for TracKOrderPage
app.get("/readbyid/:id", (req, res) => {
  const id = req.params.id;
  try {
    OrdersModel.find({ _id: id }, (err, result) => {
      res.send(result);
    });
  } catch (err) {
    console.log(err);
  }
});

// **** END OF ORDERS COLLECTION ****
app.listen(3001, () => {
  console.log("Server running on port 3001");
});
