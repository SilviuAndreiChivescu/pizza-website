import { useAuth0 } from "@auth0/auth0-react";
import Axios from "axios";
import { useEffect, useState } from "react";

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

const useInputValues = () => {
  const { user, isAuthenticated } = useAuth0();
  // States for UserDetailsInput
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState(0);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");

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
      if (isAuthenticated)
        Axios.get(`http://localhost:3001/readFromUsers/${user.email}`).then(
          (response) => {
            // To get data from request (Using indexing and it's set to 0 because we only query for one row)
            var data = response.data[0];

            // Set Input Values to data from request
            setFirstName(data.FirstName);
            setLastName(data.LastName);
            setEmail(data.Email);
            setPhoneNo(data.PhoneNumber);
            setAddress(data.Address);
            setCity(data.City);
          }
        );
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

export { usePostToOrders, usePostToUsers, useCheckIfUserInDb, useInputValues };
