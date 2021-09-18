const OrdersModel = require("../models/Orders");

// Insert into Orders Collection
const InsertIntoOrders = async (cart, userDetails, deliveryDetails) => {
  const order = new OrdersModel({
    Cart: cart,

    FirstName: userDetails.firstName,
    LastName: userDetails.lastName,
    Email: userDetails.email,
    Address: userDetails.address,
    City: userDetails.city,
    PhoneNumber: userDetails.phoneNumber,

    DeliveryTime: deliveryDetails.deliveryTime,
    DeliveryWay: deliveryDetails.deliveryWay,
  });

  try {
    await order.save();
    console.log("inserted data into orders");
  } catch (err) {
    console.log(err);
  }
};

// Get data from Orders Colletion by email
const GetFromOrders = async (email) => {
  try {
    const carts = await OrdersModel.find(
      { Email: email },
      { Cart: 1 },
      (err, result) => {
        return result;
      }
    );
    return carts;
  } catch (err) {
    console.log(err);
  }
};

// Get particular order by id
const GetFromOrdersById = async (id) => {
  try {
    const order = await OrdersModel.find({ _id: id }, (err, result) => {
      return result;
    });
    return order;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { InsertIntoOrders, GetFromOrders, GetFromOrdersById };
