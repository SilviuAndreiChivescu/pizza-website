import Details from "../../shared components/Details";
import NavBar from "../../shared components/NavBar";
import DeliveryDetails from "./DeliveryDetails";
import CustomButton from "./CustomButton";
import UserDetailsInputs from "../../shared components/UserDetailsInputs";
import { useEffect, useState } from "react";
import { usePostToOrders } from "./CheckoutPageLogic";

import Form from "react-bootstrap/Form";
// AM RAMAS AICI, TREBUIE SA FAC ORI ASTA ORI MYACCOUNTPAGE FUNCTIONALITY. AU AMANDOUA UN SHARED HOOK DECI E OK
// For this page there is to implement the following:
// "confirm ca am citit..." checkbox should be required
// "pastreaza-mi datele...". If true, get the values and put them in localstorage and put this as what gets initialized that useState for all inputs fields
// Also, to send details to Users Collection if user does not have account
// Also, if user is Auth, it should request data from Users Collection, but that's only once in MainLogic I suppose and it would be shared between this and MyAccountPage to do same thing

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
  const { submit } = usePostToOrders();
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
    submit(
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
