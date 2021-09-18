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

  const getRequestToUsers = (setAppState) => {
    if (isAuthenticated)
      try {
        Axios.get(
          `${process.env.REACT_APP_ENDPOINT}/readFromUsers/${user.email}`
        ).then((response) => {
          var data = response.data;

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
      } catch (err) {
        setAppState("error");
        console.log(err);
      }
  };

  return {
    userDetailsStates,
    setUserDetailsStates,
    getRequestToUsers,
  };
};

export { useInputValues };
