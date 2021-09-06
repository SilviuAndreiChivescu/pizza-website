import Details from "../../shared components/Details";
import NavBar from "../../shared components/NavBar";
import DeliveryDetails from "./DeliveryDetails";
import CustomButton from "./CustomButton";
import UserDetailsInputs from "../../shared components/UserDetailsInputs";
import { useEffect, useState } from "react";

import Axios from "axios";
import { usePostToOrders, useCheckIfUserInDb } from "./CheckoutPageLogic";

import Form from "react-bootstrap/Form";
import { useAuth0 } from "@auth0/auth0-react";
// AM RAMAS AICI, TREBUIE SA FAC MYACCOUNTPAGE FUNCTIONALITY. AU AMANDOUA UN SHARED HOOK DECI E OK - that's only once in MainLogic I suppose and it would be shared between this and MyAccountPage to do same thing
// For this page there is to implement the following:
// "confirm ca am citit..." checkbox should be required
export default function CheckoutPage(props) {
  const {
    pageState,
    setPageState,
    cart,
    setCart,
    totalPrice,
    setLastOrder,
    setLastOrderTime,
  } = props;

  // States for UserDetailsInput
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState(0);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");

  // Set Default states for if user has data on local storage or in Users Collection
  const { user, isAuthenticated } = useAuth0();

  useEffect(() => {
    var localStorageData = JSON.parse(
      window.localStorage.getItem("userDetails")
    );

    if (localStorageData) {
      setFirstName(localStorageData.firstName);
      setLastName(localStorageData.lastName);
      setEmail(localStorageData.email);
      setPhoneNo(localStorageData.phoneNo);
      setAddress(localStorageData.address);
      setCity(localStorageData.city);
    }
    // // If there is nothing on local storage, send get request to Users collection
    else {
      if (isAuthenticated)
        Axios.get(`http://localhost:3001/readFromUsers/${user.email}`).then(
          (response) => {
            // To get data from request (Using indexing and it's set to 0 because we only query for one row)
            var data = response.data[0];

            // Set input fields to data from request
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

  // States for DeliveryDetails
  const [deliveryTime, setDeliveryTime] = useState("");
  const [deliveryWay, setDeliveryWay] = useState("");
  const [keepData, setKeepData] = useState(false);

  // Get from CartLogic function to post request to Orders collection
  const { addToOrders } = usePostToOrders();

  // Function to check if this user is already in Users Collection
  const { checkIfUserInDb } = useCheckIfUserInDb();

  const handleSubmit = () => {
    // If any of the inputs is empty, don't execute button functionality
    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      phoneNo === 0 ||
      address === "" ||
      city === "" ||
      deliveryTime === "" ||
      deliveryWay === ""
    ) {
      return;
    }
    // Keep data in local storage if user ticks the checkbox
    if (keepData) {
      // Create object to pass to local storage
      let data = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        cart: cart,
        address: address,
        city: city,
        phoneNo: phoneNo,
        deliveryTime: deliveryTime,
        deliveryWay: deliveryWay,
      };
      window.localStorage.setItem("userDetails", JSON.stringify(data));
    }

    // This function checksif the user is already in Users Collection. If users is not in Users Collection, it adds it. (passing as arguments the email to look for, and the arguments for addToUsers function)
    checkIfUserInDb(email, firstName, lastName, address, city, phoneNo);

    // Commented below to test what I am working at, uncommend after
    addToOrders(
      firstName,
      lastName,
      email,
      cart,
      address,
      city,
      phoneNo,
      deliveryTime,
      deliveryWay
    );
    setLastOrder(cart);
    setCart([]);
    setPageState("Receipt");
    setLastOrderTime(getCurrentDate());
  };

  return (
    <>
      <NavBar
        title={"Aici dai comanda"}
        pageState={pageState}
        setPageState={setPageState}
      />
      <Form className={"m-5"}>
        <UserDetailsInputs
          setPageState={setPageState}
          setFirstName={setFirstName}
          firstName={firstName}
          setLastName={setLastName}
          lastName={lastName}
          setEmail={setEmail}
          email={email}
          setPhoneNo={setPhoneNo}
          phoneNo={phoneNo}
          setAddress={setAddress}
          address={address}
          setCity={setCity}
          city={city}
        />
        <DeliveryDetails
          setDeliveryTime={setDeliveryTime}
          setDeliveryWay={setDeliveryWay}
          setKeepData={setKeepData}
        />
        <Details title={"Comanda ta"} cart={cart} totalPrice={totalPrice} />
        <CustomButton
          title={"Plaseaza Comanda"}
          onClick={() => handleSubmit()}
        />
      </Form>
    </>
  );
}

function getCurrentDate(separator = "/") {
  let newDate = new Date();
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();

  return `${date}${separator}${month}${separator}${year}`;
}
