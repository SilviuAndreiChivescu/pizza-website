const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

require("dotenv").config();
const ProductsModel = require("./models/Products");
const OrdersModel = require("./models/Orders");
const UsersModel = require("./models/Users");

app.use(express.json());
app.use(cors());

// Take password from .env
const password = process.env.MONGODB_URI;
const mongoURL = `mongodb+srv://Andrew:${password}@medieval.zxguo.mongodb.net/medieval?retryWrites=true&w=majority`;
// Change this process.env with mongoDbPassword from above if using for local host
mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// To handle deprecation of findAndModify mongo
mongoose.set("useFindAndModify", false);

// MongoDB
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
// Post to Orders collection
app.post("/insertIntoOrders", async (req, res) => {
  const firstName = req.body.FirstName;
  const lastName = req.body.LastName;
  const email = req.body.Email;
  const cart = req.body.Cart;
  const address = req.body.Address;
  const city = req.body.City;
  const phoneNumber = req.body.PhoneNumber;
  const deliveryTime = req.body.DeliveryTime;
  const deliveryWay = req.body.DeliveryWay;

  const products = new OrdersModel({
    FirstName: firstName,
    LastName: lastName,
    Email: email,
    Cart: cart,
    Address: address,
    City: city,
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

// **** Users Collection ****
// Post to Users collection
app.post("/insertIntoUsers", async (req, res) => {
  const firstName = req.body.FirstName;
  const lastName = req.body.LastName;
  const email = req.body.Email;
  const address = req.body.Address;
  const city = req.body.City;
  const phoneNumber = req.body.PhoneNumber;

  const products = new UsersModel({
    FirstName: firstName,
    LastName: lastName,
    Email: email,
    Address: address,
    City: city,
    PhoneNumber: phoneNumber,
  });

  try {
    await products.save();
    res.send("inserted data into users");
    console.log("inserted data into users");
  } catch (err) {
    console.log(err);
  }
});

// Get request to see if particular User is already in Users Collection
app.get("/readFromUsers/:email", (req, res) => {
  const email = req.params.email;
  try {
    UsersModel.find({ Email: email }, (err, result) => {
      res.send(result);
    });
  } catch (err) {
    console.log(err);
  }
});

// Update Users collection for MyAccountPage
app.put("/updateUsers", async (req, res) => {
  const email = req.body.email;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const address = req.body.address;
  const city = req.body.city;
  const phoneNo = req.body.phoneNo;

  const filter = { Email: email };
  const update = {
    FirstName: firstName,
    LastName: lastName,
    Address: address,
    City: city,
    PhoneNumber: phoneNo,
  };
  try {
    await UsersModel.findOneAndUpdate(filter, update);
  } catch (err) {
    console.log(err);
  }
});

// **** END OF USERS COLLECTION ****

// **** MAILJET ****

const mailjet = require("node-mailjet").connect(
  process.env.MJ_APIKEY_PUBLIC,
  process.env.MJ_APIKEY_PRIVATE
);

var count = 1;
// Create post request to send message
app.post("/sendEmail", (req, res) => {
  // text variable to store the message passed from front-end
  const text = req.body.text;
  // Set email message to the text passed via request

  // Send message
  const request = mailjet.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        From: {
          Email: "medievalpizzacomanda@gmail.com",
          Name: "Medieval Pizza",
        },
        To: [
          {
            Email: "gypandy00@gmail.com",
            Name: "Andi bossu",
          },
        ],
        Subject: "Comanda Noua!",
        TextPart: `Comanda ta va fi asta: ${text}`,
        HTMLPart: `<h3>Dear Andi bossu, Comanda ta va fi asta: </h3> <p>${text}</p>`,
      },
    ],
  });
  request
    .then((result) => {
      console.log(result.body);
    })
    .catch((err) => {
      console.log(err.statusCode);
    });
  // Testing purpose
  console.log(`Email ${count++} sent successfully`);
  res.json({ status: "Email sent" });
});

// *** END MAILJET ***

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
