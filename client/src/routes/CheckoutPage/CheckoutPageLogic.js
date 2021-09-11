import Axios from "axios";
import { useEffect, useState } from "react";
import { useInputValues } from "../../shared components/UserDetailsInputsLogic";
import { useTotalNoOfProductAndTotalPrice } from "./../../AppLogic";

// Post request to Orders collection // I need to refactor this to match Orders model -  ?
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
      Axios.post(`${process.env.REACT_APP_ENDPOINT}/insertIntoOrders`, {
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

// Post request to Users Collection
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
      Axios.post(`${process.env.REACT_APP_ENDPOINT}/insertIntoUsers`, {
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

// This custom hook is used to check if the user is already in Users Collection and if negative, then Add user to Users Collection
const useCheckIfUserInDb = () => {
  const { addToUsers } = usePostToUsers();

  const checkIfUserInDb = (
    email,
    firstName,
    lastName,
    address,
    city,
    phoneNo
  ) => {
    try {
      // Send reqeust to MongoDB to check if for this email we have data.
      Axios.get(
        `${process.env.REACT_APP_ENDPOINT}/readFromUsers/${email}`
      ).then((response) => {
        // If there is no data, then add user to Users Collection
        if (response.data.length === 0)
          addToUsers(firstName, lastName, email, address, city, phoneNo);
      });
    } catch (err) {
      console.log(err);
    }
  };
  return { checkIfUserInDb };
};

const useSetDefaultValues = () => {
  // States for UserDetailsInputs
  const {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    phoneNo,
    setPhoneNo,
    address,
    setAddress,
    city,
    setCity,
    getRequestToUsers,
  } = useInputValues();

  // Set Default states for if user has data on local storage or in Users Collection
  useEffect(() => {
    // Get details from local storage if user has been ordered before from the same browser and if user ticked "remember my details" checkbox
    var localStorageData = JSON.parse(
      window.localStorage.getItem("userDetails")
    );
    // If there is data on local storage, set Input Values to it
    if (localStorageData) {
      setFirstName(localStorageData.firstName);
      setLastName(localStorageData.lastName);
      setEmail(localStorageData.email);
      setPhoneNo(localStorageData.phoneNo);
      setAddress(localStorageData.address);
      setCity(localStorageData.city);
    }
    // If there is nothing on local storage, send get request to Users collection
    else {
      getRequestToUsers();
    }
  }, []);

  return {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    phoneNo,
    setPhoneNo,
    address,
    setAddress,
    city,
    setCity,
  };
};

// Mailjet API
const useMailjetAPI = (cart) => {
  // Function to calculate total price
  const { totalPrice } = useTotalNoOfProductAndTotalPrice(cart);
  const sendEmail = (
    firstName,
    lastName,
    email,
    phoneNo,
    address,
    city,
    deliveryWay,
    deliveryTime
  ) => {
    // Create the email
    var nameText = `${firstName} ${lastName}`;
    var contactText = `${phoneNo} ${email}`;
    var addressText = `${city} ${address}`;
    var deliveryText = `${deliveryWay} - ${deliveryTime}`;
    // Map over cart state
    var cartText = cart
      .map((e) => {
        return `<li> ${e.Quantity} X ${e.Name} - ${e.Price} lei </li>`;
      })
      // Make it a string joined by words
      .join("")
      // Add total price at the end
      .concat(` Total plata comanda: ${totalPrice} lei`);
    try {
      Axios.post(`${process.env.REACT_APP_ENDPOINT}/sendEmail`, {
        nameText: nameText,
        contactText: contactText,
        addressText: addressText,
        deliveryText: deliveryText,
        cartText: cartText,
      });
    } catch (err) {
      console.log(err);
    }
  };
  return { sendEmail };
};
// *** END Mailjet API ***

export {
  usePostToOrders,
  usePostToUsers,
  useCheckIfUserInDb,
  useSetDefaultValues,
  useMailjetAPI,
};
