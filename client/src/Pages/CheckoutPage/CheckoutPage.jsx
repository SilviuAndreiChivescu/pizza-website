import Details from "../../shared components/Details";
import NavBar from "../../shared components/NavBar";
import DeliveryDetails from "./DeliveryDetails";
import CustomButton from "./CustomButton";
import UserDetailsInputs from "../../shared components/UserDetailsInputs";
import { useEffect, useState } from "react";

import Axios from "axios";
import {
  usePostToOrders,
  usePostToUsers,
  useCheckIfUserInDb,
} from "./CheckoutPageLogic";

import Form from "react-bootstrap/Form";
import { useAuth0 } from "@auth0/auth0-react";
// AM RAMAS AICI, TREBUIE SA FAC ORI ASTA ORI MYACCOUNTPAGE FUNCTIONALITY. AU AMANDOUA UN SHARED HOOK DECI E OK
// For this page there is to implement the following:
// Also, if user is Auth, it should request data from Users Collection, but that's only once in MainLogic I suppose and it would be shared between this and MyAccountPage to do same thing
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
  // Set Default states for if user has data on local storage
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
    // addToOrders(
    //   firstName,
    //   lastName,
    //   email,
    //   cart,
    //   address,
    //   city,
    //   phoneNo,
    //   deliveryTime,
    //   deliveryWay
    // );
    // setLastOrder(cart);
    // setCart([]);
    // setPageState("Receipt");
    // setLastOrderTime(getCurrentDate());
  };

  return (
    <>
      <NavBar
        title={"Aici dai comanda"}
        pageState={pageState}
        setPageState={setPageState}
      />

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
      <CustomButton title={"Plaseaza Comanda"} onClick={() => handleSubmit()} />

      {/* <button onClick={() => checkIfUserInDb(email)}>
        Check if users is in db
      </button> */}
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
