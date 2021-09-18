const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

require("dotenv").config();

app.use(express.json());
app.use(cors());

// **** MONGODB ****

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

const productsRoute = require("./routes/Products");
app.use("/", productsRoute);

const ordersRoute = require("./routes/Orders");
app.use("/", ordersRoute);

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
  const email = req.body.Email;

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
        TextPart: `Draga Angajat al Medieval Pizza, Detalii comanda:  ${email.nameText} ${email.contactText} ${email.addressText} ${email.deliveryText} ${email.cartText}`,
        HTMLPart: `<h3>Draga Angajat al Medieval Pizza</h3> <h3>Detalii comanda: </h3> <ul> <li>Nume: ${email.nameText}</li> <li>Contact: ${email.contactText}</li> <li>Adresa: ${email.addressText}</li> <li>Detalii de livrare: ${email.deliveryText}</li> Produse: ${email.cartText}</ul>`,
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
