import Details from "../../shared components/Details";
import NavBar from "../../shared components/NavBar";
import DeliveryDetails from "./DeliveryDetails";
import CustomButton from "../../shared components/CustomButton";
import UserDetailsInputs from "../../shared components/UserDetailsInputs";
import { useEffect, useState } from "react";

import Axios from "axios";
import {
  usePostToOrders,
  useCheckIfUserInDb,
  useSetDefaultValues,
  useMailjetAPI,
} from "./CheckoutPageLogic";

import Form from "react-bootstrap/Form";
import { useHistory } from "react-router-dom";

// For this page there is to implement the following:
// "confirm ca am citit..." checkbox should be required
// encapsulate states and stuff if needed later
export default function CheckoutPage(props) {
  const { cart, setCart, totalPrice, setLastOrder, setLastOrderTime } = props;

  // States for User Input fields
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
  } = useSetDefaultValues();

  // States for DeliveryDetails
  const [deliveryTime, setDeliveryTime] = useState("");
  const [deliveryWay, setDeliveryWay] = useState("");
  const [keepData, setKeepData] = useState(false);

  // Get from CartLogic function to post request to Orders collection
  const { addToOrders } = usePostToOrders();

  // Function to check if this user is already in Users Collection
  const { checkIfUserInDb } = useCheckIfUserInDb();

  // Mailjet API
  const { sendEmail } = useMailjetAPI(cart);

  // History to redirect to receipt page
  let history = useHistory();

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
      deliveryTime,
      deliveryWay
    );

    // Last order is used for receipt page to show the order that was ordered
    setLastOrder(cart);

    // Get the time of order for the Receipt Page
    setLastOrderTime(getCurrentDate());

    // To send email with the order
    sendEmail(
      firstName,
      lastName,
      email,
      phoneNo,
      address,
      city,
      deliveryWay,
      deliveryTime
    );

    // Clean up cart state for next order
    setCart([]);

    // Redirect to Receipt Page
    history.push("/receipt");
  };

  return (
    <main className="page">
      <NavBar title={"Aici dai comanda"} to={"cart"} />
      <Form className={"m-5"}>
        <UserDetailsInputs
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
    </main>
  );
}

function getCurrentDate(separator = "/") {
  let newDate = new Date();
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();

  return `${date}${separator}${month}${separator}${year}`;
}
