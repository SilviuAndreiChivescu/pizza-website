const express = require("express");
const cors = require("cors");
const app = express();

require("dotenv").config();

app.use(express.json());
app.use(cors());

// **** MONGODB ****

const mongoose = require("mongoose");
// **** CONFIG ****

const { mongoURL } = require("./src/config/DatabaseConfig.js");
mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// To handle deprecation of findAndModify mongo
mongoose.set("useFindAndModify", false);

// **** END CONFIG ****

const productsRoute = require("./src/routes/Products");
app.use("/", productsRoute);

const ordersRoute = require("./src/routes/Orders");
app.use("/", ordersRoute);

const usersRoute = require("./src/routes/Users");
app.use("/", usersRoute);

// **** Mailjet ****

const mailjetRoute = require("./src/routes/Mailjet");
app.use("/", mailjetRoute);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
