import { useEffect } from "react";
import { useInputValues } from "../../shared components/UserDetailsInputsLogic";

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

export { useSetDefaultValues };
