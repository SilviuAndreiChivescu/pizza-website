import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import Axios from "axios";

const useInputValues = () => {
  const { user, isAuthenticated } = useAuth0();
  // States for UserDetailsInput
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState(0);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");

  const getRequestToUsers = () => {
    if (isAuthenticated)
      Axios.get(
        `${process.env.REACT_APP_ENDPOINT}/readFromUsers/${user.email}`
      ).then((response) => {
        // To get data from request (Using indexing and it's set to 0 because this is an object in an array and we only have one row)
        var data = response.data[0];

        // Set Input Values to data from request
        setFirstName(data.FirstName);
        setLastName(data.LastName);
        setEmail(data.Email);
        setPhoneNo(data.PhoneNumber);
        setAddress(data.Address);
        setCity(data.City);
      });
  };

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
    getRequestToUsers,
  };
};

export { useInputValues };
