const mongoose = require("mongoose");

// Mongo pluralizes the name of the collection. This is the command to stop it
mongoose.pluralize(null);

const UsersSchema = new mongoose.Schema({
  FirstName: {
    type: String,
    required: true,
  },
  LastName: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  Address: {
    type: String,
    require: true,
  },
  City: {
    type: String,
    require: true,
  },
  PhoneNumber: {
    type: Number,
    require: true,
  },
});

const users = mongoose.model("users", UsersSchema);
module.exports = users;
