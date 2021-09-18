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
  const description = req.body.description;
  const imageUrl = req.body.image;
  const category = req.body.category;

  const products = new ProductsModel({
    Name: name,
    Price: parseFloat(price),
    Quantity: 1,
    Description: description,
    Image: imageUrl,
    Category: category,
  });

  try {
    await products.save();
    res.send("inserted data into products collection");
    console.log("inserted data into products collection");
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
const ordersRoute = require("./routes/Orders");
app.use("/", ordersRoute);

// **** END OF ORDERS COLLECTION ****

// **** Users Collection ****
// MVC STRUCTURING
const usersRoute = require("./routes/Users");
// Here endpoint is '/' because user goes to endpoint set in usersRoute
app.use("/", usersRoute);

// **** MAILJET ****

const mailjet = require("node-mailjet").connect(
  process.env.MJ_APIKEY_PUBLIC,
  process.env.MJ_APIKEY_PRIVATE
);

var count = 1;

// Send message
// Create post request to send message
app.post("/sendEmail", (req, res) => {
  // text variable to store the message passed from front-end
  const nameText = req.body.nameText;
  const contactText = req.body.contactText;
  const addressText = req.body.addressText;
  const deliveryText = req.body.deliveryText;
  const cartText = req.body.cartText;
  // Set email message to the text passed via request

  const request = mailjet.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        From: {
          Email: "medievalpizzacomanda@gmail.com",
          Name: "Medieval Pizza",
        },
        To: [
          {
            Name: "Angajat al Medieval Pizza",
            Email: "gypandy00@gmail.com",
          },
        ],
        Subject: `Comanda nr ${count}`,
        TextPart: `Draga Angajat al Medieval Pizza, Detalii comanda:  ${nameText} ${contactText} ${addressText} ${deliveryText} ${cartText}`,
        HTMLPart: `<h3>Draga Angajat al Medieval Pizza</h3> <h3>Detalii comanda: </h3> <ul> <li>Nume: ${nameText}</li> <li>Contact: ${contactText}</li> <li>Adresa: ${addressText}</li> <li>Detalii de livrare: ${deliveryText}</li> Produse: ${cartText}</ul>`,
      },
    ],
  });
  request.catch((err) => {
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
