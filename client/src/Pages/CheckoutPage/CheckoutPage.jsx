import Details from "../../shared components/Details";
import NavBar from "../../shared components/NavBar";
import DeliveryDetails from "./DeliveryDetails";
import CustomButton from "./CustomButton";
import UserDetailsInputs from "../../shared components/UserDetailsInputs";
import { useState } from "react";
import { usePostToOrders } from "./CheckoutPageLogic";

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

  // States for DeliveryDetails TBC
  const [deliveryTime, setDeliveryTime] = useState("");
  const [deliveryWay, setDeliveryWay] = useState("");

  // Get from CartLogic function to post request to Orders collection
  const { submit } = usePostToOrders();
  const handleSubmit = () => {
    submit(
      firstName,
      lastName,
      email,
      cart,
      address,
      city,
      phoneNo,
      deliveryTime
    );
  };
  // AICI AM RAMAS, TREBUIE SA FAC FUNCTIONALITATEA DE MAI SUS CU ORDERS COLECTION, SI PENTRU DELIVERYDETAILSINPUTS. REMEMBER TO UNCOMMENT IN ORDERS.JS (THE MODEL) AND IN INDEX.JS SERVER
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
        setLastName={setLastName}
        setEmail={setEmail}
        setPhoneNo={setPhoneNo}
        setAddress={setAddress}
        setCity={setCity}
      />
      <DeliveryDetails
        setDeliveryTime={setDeliveryTime}
        setDeliveryWay={setDeliveryWay}
      />
      <Details title={"Comanda ta"} cart={cart} totalPrice={totalPrice} />
      <CustomButton
        title={"Plaseaza Comanda"}
        onClick={() => {
          // For now commented everything to test what I will be sending to Orders collection and maybe email to catalin
          // setLastOrder(cart);
          // setCart([]);
          handleSubmit();
          // setPageState("Receipt");
          // setLastOrderTime(getCurrentDate("/"));
        }}
      />
    </>
  );
}

function getCurrentDate(separator = " ") {
  let newDate = new Date();
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();

  return `${date}${separator}${month}${separator}${year}`;
}
