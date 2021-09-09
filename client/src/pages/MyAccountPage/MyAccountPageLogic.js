import { useEffect } from "react";
import { useInputValues } from "../../shared components/UserDetailsInputsLogic";
import Axios from "axios";

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

  // Set Default states from Users Collection
  useEffect(() => {
    // Send get request and set data to data from request
    getRequestToUsers();
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

// Update user details in Users Collection
const useUpdateUserDetails = () => {
  const updateUser = (email, firstName, lastName, address, city, phoneNo) => {
    Axios.put("http://localhost:3001/updateUsers", {
      email: email,
      firstName: firstName,
      lastName: lastName,
      address: address,
      city: city,
      phoneNo: phoneNo,
    });
  };
  return { updateUser };
};

export { useSetDefaultValues, useUpdateUserDetails };
