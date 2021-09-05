import Axios from "axios";
import { useState } from "react";

// Post request to Orders collection // I need to refactor this to match Orders model
const usePostToOrders = () => {
  const addToOrders = (
    firstName,
    lastName,
    email,
    cart,
    address,
    city,
    phoneNumber,
    deliveryTime,
    deliveryWay
  ) => {
    try {
      Axios.post("http://localhost:3001/insertIntoOrders", {
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
      console.log("Inserted data into Orders collection!");
    } catch (err) {
      console.log(err);
    }
  };
  return { addToOrders };
};

// MAYBE COMBINE THOSE TWO BELOW
const usePostToUsers = () => {
  const addToUsers = (
    firstName,
    lastName,
    email,
    address,
    city,
    phoneNumber
  ) => {
    try {
      Axios.post("http://localhost:3001/insertIntoUsers", {
        FirstName: firstName,
        LastName: lastName,
        Email: email,
        Address: address,
        City: city,
        PhoneNumber: phoneNumber,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return { addToUsers };
};

// This custom hook is used to check if the user is already in Users Collection
const useCheckIfUserInDb = () => {
  const checkIfUserInDb = (
    email,
    addToUsers,
    firstName,
    lastName,
    address,
    city,
    phoneNo
  ) => {
    try {
      // Send reqeust to MongoDB to check if for this email we have data.
      Axios.get(`http://localhost:3001/readFromUsers/${email}`).then(
        (response) => {
          // If there is no data, then add user to Users Collection
          if (response.data.length === 0)
            addToUsers(firstName, lastName, email, address, city, phoneNo);
        }
      );
    } catch (err) {
      console.log(err);
    }
  };
  return { checkIfUserInDb };
};

export { usePostToOrders, usePostToUsers, useCheckIfUserInDb };
