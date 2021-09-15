import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import Axios from "axios";

const useInputValues = () => {
  const { user, isAuthenticated } = useAuth0();
  const [userDetailsStates, setUserDetailsStates] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNo: 0,
    address: "",
    city: "",
  });

  const getRequestToUsers = () => {
    if (isAuthenticated)
      Axios.get(
        `${process.env.REACT_APP_ENDPOINT}/readFromUsers/${user.email}`
      ).then((response) => {
        // To get data from request (Using indexing and it's set to 0 because this is an object in an array and we only have one row)
        var data = response.data[0];

        // Set Input Values to data from request
        //v2 - IMPORTANT NOTE. SEE AS I DID HERE? DO AS HERE FOR DELIVERYDETAILS AS WELL, I THINK I HAVE NOT DONE THIS AND NOW MY APP WORKS OK, BEFORE THIS, IT DID NOT, AS CAN SEE BELOW COMMENTED
        setUserDetailsStates({
          ...userDetailsStates,
          firstName: data.FirstName,
          lastName: data.LastName,
          email: data.Email,
          phoneNo: data.PhoneNumber,
          address: data.Address,
          city: data.City,
        });
      });
  };

  return {
    userDetailsStates,
    setUserDetailsStates,
    getRequestToUsers,
  };
};

export { useInputValues };
