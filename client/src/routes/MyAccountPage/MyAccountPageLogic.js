import { useEffect } from "react";
import { useInputValues } from "../../shared components/UserDetailsInputsLogic";
import Axios from "axios";

const useSetDefaultValues = () => {
  // States for UserDetailsInputs
  const { userDetailsStates, setUserDetailsStates, getRequestToUsers } =
    useInputValues();

  // Set Default states from Users Collection
  useEffect(() => {
    // Send get request and set data to data from request
    getRequestToUsers();
  }, []);

  return {
    userDetailsStates,
    setUserDetailsStates,
  };
};

// Update user details in Users Collection
const useUpdateUserDetails = () => {
  const updateUser = (userDetailsStates) => {
    Axios.put(`${process.env.REACT_APP_ENDPOINT}/updateUsers`, {
      email: userDetailsStates.email,
      firstName: userDetailsStates.firstName,
      lastName: userDetailsStates.lastName,
      address: userDetailsStates.address,
      city: userDetailsStates.city,
      phoneNo: userDetailsStates.phoneNo,
    });
  };
  return { updateUser };
};

export { useSetDefaultValues, useUpdateUserDetails };
