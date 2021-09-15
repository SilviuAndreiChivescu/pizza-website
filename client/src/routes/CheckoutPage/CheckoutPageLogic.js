import Axios from "axios";
import { useEffect, useState } from "react";
import { useInputValues } from "../../shared components/UserDetailsInputsLogic";
import { useTotalQuantityOrTotalPrice } from "./../../AppLogic";

// Post request to Orders collection
const usePostToOrders = () => {
  const addToOrders = (
    firstName,
    lastName,
    email,
    cart,
    address,
    city,
    phoneNumber,
    deliveryDetailsStates
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
        DeliveryTime: deliveryDetailsStates.deliveryTime,
        DeliveryWay: deliveryDetailsStates.deliveryWay,
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

const useHandleSubmit = (cart, history) => {
  const { checkIfUserInDb } = useCheckIfUserInDb();
  const { addToOrders } = usePostToOrders();
  const { sendEmail } = useMailjetAPI(cart);

  const handleSubmit = (
    setLastOrder,
    setCart,
    firstName,
    lastName,
    email,
    cart,
    address,
    city,
    phoneNo,
    deliveryDetailsStates
  ) => {
    // If any of the inputs is empty, don't execute button functionality
    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      phoneNo === 0 ||
      address === "" ||
      city === "" ||
      deliveryDetailsStates.deliveryTime === "" ||
      deliveryDetailsStates.deliveryWay === "" ||
      // If checkbox with Terms not checked
      !deliveryDetailsStates.terms
    ) {
      return;
    }
    // Keep data in local storage if user ticks the checkbox
    if (deliveryDetailsStates.keepData) {
      // Create object to pass to local storage
      let data = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        cart: cart,
        address: address,
        city: city,
        phoneNo: phoneNo,
        deliveryTime: deliveryDetailsStates.deliveryTime,
        deliveryWay: deliveryDetailsStates.deliveryWay,
      };
      window.localStorage.setItem("userDetails", JSON.stringify(data));
    }

    // // This function checks if the user is already in Users Collection. If users is not in Users Collection, it adds it. (passing as arguments the email to look for, and the arguments for addToUsers function)
    checkIfUserInDb(email, firstName, lastName, address, city, phoneNo);

    addToOrders(
      firstName,
      lastName,
      email,
      cart,
      address,
      city,
      phoneNo,
      deliveryDetailsStates
    );
    // Last order is used for receipt page to show the order that was ordered
    setLastOrder(cart);

    // To send email with the order
    sendEmail(
      firstName,
      lastName,
      email,
      phoneNo,
      address,
      city,
      deliveryDetailsStates
    );

    // Clean up cart state for next order
    setCart([]);

    // Redirect to Receipt Page
    history.push("/receipt");
  };
  return { handleSubmit };
};

// Mailjet API
const useMailjetAPI = (cart) => {
  // Function to calculate total price
  const { totalPrice } = useTotalQuantityOrTotalPrice(cart);
  const sendEmail = (
    firstName,
    lastName,
    email,
    phoneNo,
    address,
    city,
    deliveryDetailsStates
  ) => {
    // Create the email
    var nameText = `${firstName} ${lastName}`;
    var contactText = `${phoneNo} ${email}`;
    var addressText = `${city} ${address}`;
    var deliveryText = `${deliveryDetailsStates.deliveryWay} - ${deliveryDetailsStates.deliveryTime}`;
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

export { usePostToOrders, useSetDefaultValues, useHandleSubmit };
