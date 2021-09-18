const UsersModel = require("../models/Users");

// Returns user by email
const QueryUsers = async (email) => {
  try {
    const user = await UsersModel.find({ Email: email }, (err, result) => {
      if (err) console.log(err);
      return result;
    });
    return user;
  } catch (err) {
    console.log(err);
  }
};

// Insert user to Users Collection
const InsertIntoUsers = async (userDetails) => {
  const user = new UsersModel({
    FirstName: userDetails.firstName,
    LastName: userDetails.lastName,
    Email: userDetails.email,
    Address: userDetails.address,
    City: userDetails.city,
    PhoneNumber: userDetails.phoneNumber,
  });

  try {
    await user.save();
  } catch (err) {
    console.log(err);
  }
};

// Updates Users Collection finding by email
const UpdateUsers = async (userDetails) => {
  const filter = { Email: userDetails.email };
  const update = {
    FirstName: userDetails.firstName,
    LastName: userDetails.lastName,
    Address: userDetails.address,
    City: userDetails.city,
    PhoneNumber: userDetails.phoneNo,
  };

  try {
    await UsersModel.findOneAndUpdate(filter, update);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { QueryUsers, InsertIntoUsers, UpdateUsers };
