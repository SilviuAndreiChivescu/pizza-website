const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
// const mongoPassword = require("./mongoPassword");

const ProductsModel = require("./models/Products");
const OrdersModel = require("./models/Orders");
const UsersModel = require("./models/Users");
// AM RAMAS AICI, CAN''T ACCESS ENV VARIABLE FROM HEROKU, THE MONGODB PASS, DELETE THIS ROW WITHOUT SAVING
app.use(express.json());
app.use(cors());
const mongoPassword = `mongodb+srv://Andrew:${process.env.MONGODB_URI}@medieval.zxguo.mongodb.net/medieval?retryWrites=true&w=majority`;
// Change this process.env with mongoDbPassword from above if using for local host
mongoose.connect(mongoPassword, {
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

// **** GMAIL API ****
/**
 * @license
 * Copyright Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// [START gmail_quickstart]
const fs = require("fs");
const readline = require("readline");
const { google } = require("googleapis");
const { OAuth2Client, GoogleAuth } = require("google-auth-library");

const MIMEText = require("mimetext");

// ** AUTHENTICATION **

// If modifying these scopes, delete token.json.
const SCOPES = ["https://www.googleapis.com/auth/gmail.modify"];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = "token.json";

// Load client secrets from a local file.

fs.readFile("credentials.json", (err, content) => {
  if (err) return console.log("Error loading client secret file:", err);
  // Authorize a client with credentials, then call the Gmail API.
  authorize(JSON.parse(content), sendMessage);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });
  console.log("Authorize this app by visiting this url:", authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question("Enter the code from that page here: ", (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error("Error retrieving access token", err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log("Token stored to", TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}
// ** END AUTHENTICATION **

var count = 0;
// Send message
function sendMessage(auth) {
  const gmail = google.gmail({ version: "v1", auth });
  gmail.users.messages
    .send({
      userId: "me",
      requestBody: {
        raw: message.asEncoded(),
      },
    })
    .then((result) => {
      // result.id
      console.log(result.status);
    })
    .catch(function (err) {
      console.log(err);
    });
}
// Create post request to send message
// Create message
const message = new MIMEText();
message.setSender("medievalpizzacomanda@gmail.com");
message.setRecipient("gypandy00@gmail.com");
message.setSubject("Comanda");
message.setMessage("THE RESTART MESSAGE");
app.post("/sendEmail", (req, res) => {
  // text variable to store the message passed from front-end
  const text = req.body.text;
  // Set email message to the text passed via request
  message.setMessage(text);

  // Send message

  // Load client secrets from a local file.
  fs.readFile("credentials.json", (err, content) => {
    if (err) return console.log("Error loading client secret file:", err);
    // Authorize a client with credentials, then call the Gmail API.
    authorize(JSON.parse(content), sendMessage);
  });

  // Testing purpose
  console.log(`Email ${count++} sent successfully`);
  res.json({ status: "Email sent" });
});
// [END gmail_quickstart]

// *** END GMAIL API ***

app.get("/", (req, res) => {
  res.send("Hello from express");
});
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
