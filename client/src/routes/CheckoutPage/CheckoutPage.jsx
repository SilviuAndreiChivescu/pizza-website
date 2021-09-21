import Details from "../../shared components/Details";
import MyNavbar from "../../shared components/MyNavbar";
import MyButton from "../../shared components/MyButton";
import UserDetailsInputs from "../../shared components/UserDetailsInputs";

import DeliveryDetails from "./DeliveryDetails";

import { useState } from "react";

import {
  useSetDefaultValues,
  useHandleSubmit,
  useCountEmails,
} from "./CheckoutPageLogic";

import Form from "react-bootstrap/Form";
import { useHistory } from "react-router-dom";
import { Container } from "react-bootstrap";

export default function CheckoutPage(props) {
  const {
    setAppState,
    cart,
    setCart,
    totalPrice,
    setLastOrder,
    setCartAnimation,
  } = props;

  // States for User Input fields
  const { userDetailsStates, setUserDetailsStates } =
    useSetDefaultValues(setAppState);

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

  // Emails's limit
  const { count, setCount } = useCountEmails();

  return (
    <main className="slide-in-right">
      <MyNavbar
        setAnimation={setCartAnimation}
        title={"Checkout"}
        to={"cart"}
      />
      <Form className={"m-5"}>
        <UserDetailsInputs
          userDetailsStates={userDetailsStates}
          setUserDetailsStates={setUserDetailsStates}
        />
        <DeliveryDetails
          setDeliveryDetailsStates={setDeliveryDetailsStates}
          deliveryDetailsStates={deliveryDetailsStates}
        />
        <Details title={"Your cart"} cart={cart} totalPrice={totalPrice} />

        <Container className="text-center mt-3">
          <MyButton
            className=""
            title={"Place the order"}
            onClick={() => {
              handleSubmit(
                count,
                setCount,
                setLastOrder,
                setCart,
                userDetailsStates,
                deliveryDetailsStates,
                setAppState
              );
            }}
          />
        </Container>
      </Form>
    </main>
  );
}
