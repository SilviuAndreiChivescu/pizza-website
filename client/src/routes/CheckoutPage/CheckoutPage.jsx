import Details from "../../shared components/Details";
import MyNavbar from "../../shared components/MyNavbar";
import CustomButton from "../../shared components/CustomButton";
import UserDetailsInputs from "../../shared components/UserDetailsInputs";

import DeliveryDetails from "./DeliveryDetails";

import { useState } from "react";

import { useSetDefaultValues, useHandleSubmit } from "./CheckoutPageLogic";

import Form from "react-bootstrap/Form";
import { useHistory } from "react-router-dom";
import { Container } from "react-bootstrap";

// encapsulate states and stuff if needed later
export default function CheckoutPage(props) {
  const { cart, setCart, totalPrice, setLastOrder, setCartAnimation } = props;

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
  const [deliveryDetailsStates, setDeliveryDetailsStates] = useState({
    deliveryTime: "",
    deliveryWay: "",
    keepData: false,
    terms: false,
  });

  // History to redirect to receipt page
  let history = useHistory();
  const { handleSubmit } = useHandleSubmit(cart, history);

  return (
    <main className="page slide-in-right">
      <MyNavbar
        setAnimation={setCartAnimation}
        title={"Aici dai comanda"}
        to={"cart"}
      />
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
          setDeliveryDetailsStates={setDeliveryDetailsStates}
          deliveryDetailsStates={deliveryDetailsStates}
        />
        <Details title={"Comanda ta"} cart={cart} totalPrice={totalPrice} />

        <Container className="text-center">
          <CustomButton
            className=""
            title={"Plaseaza Comanda"}
            onClick={() => {
              handleSubmit(
                setLastOrder,
                setCart,
                firstName,
                lastName,
                email,
                cart,
                address,
                city,
                phoneNo,
                deliveryDetailsStates
              );
            }}
          />
        </Container>
      </Form>
    </main>
  );
}
