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
app.use("/", usersRoute);

// **** Mailjet ****

const mailjetRoute = require("./routes/Mailjet");
app.use("/", mailjetRoute);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
