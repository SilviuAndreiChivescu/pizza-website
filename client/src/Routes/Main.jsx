import React from "react";
import { useBeforeunload } from "react-beforeunload";
import { useAuth0 } from "@auth0/auth0-react";

import NoCartPage from "../pages/NoCartPage/NoCartPage";
import CartPage from "../pages/CartPage/CartPage";
import CheckoutPage from "../pages/CheckoutPage/CheckoutPage";
import HistoryPage from "../pages/HistoryPage/HistoryPage";
import ReceiptPage from "../pages/ReceiptPage/ReceiptPage";
import TrackOrderPage from "../pages/TrackOrderPage/TrackOrderPage";
import MyAccountPage from "../pages/MyAccountPage/MyAccountPage";

// Custom hooks to encapsulate code
import {
  useAppState,
  usePageState,
  useCart,
  useTotalNoOfProductAndTotalPrice,
  useProductsList,
} from "./MainLogic";

import { CircularProgress } from "@material-ui/core";

export default function Main() {
  // State of Application
  const { appState, setAppState } = useAppState();

  // **** Auth0 ****
  const { isLoading } = useAuth0();

  // State to display between Pages (NoCartPage, CartPage, CheckoutPage, HistoryPage)
  const { pageState, setPageState } = usePageState();

  // Taking cart and setCart from useCart hook
  const { cart, setCart } = useCart();

  // Before unload of page, put cart in localStorage && remove cart from localStorage after setting it to the cart state array
  useBeforeunload(
    window.localStorage.removeItem("cart"),
    window.localStorage.setItem("cart", JSON.stringify(cart))
  );

  // state to read/get products from MongoDB products collection
  const { productsList } = useProductsList(setAppState);

  // **** Custom hook to get: total price and total quantity for CartBar and Cart components from NoCartPage ****
  const { totalQuantity, totalPrice } = useTotalNoOfProductAndTotalPrice(cart);

  // Conditional rendering to render only if all data is received
  if (appState === "loading" || isLoading) return <Loading />;
  else if (appState === "loaded") {
    /* Conditional rendering for showing NoCart, Cart, Checkout, History Pages */
    return (
      <>
        {pageState === "NoCart" ? (
          <NoCartPage
            pageState={pageState}
            setPageState={setPageState}
            cart={cart}
            setCart={setCart}
            totalPrice={totalPrice}
            totalQuantity={totalQuantity}
            productsList={productsList}
          />
        ) : null}
        {pageState === "Cart" ? (
          <CartPage
            pageState={pageState}
            setPageState={setPageState}
            cart={cart}
            setCart={setCart}
            totalPrice={totalPrice}
          />
        ) : null}
        {pageState === "Checkout" ? (
          <CheckoutPage
            pageState={pageState}
            setPageState={setPageState}
            cart={cart}
            totalPrice={totalPrice}
          />
        ) : null}
        {pageState === "MyAccount" ? <MyAccountPage /> : null}
        {pageState === "History" ? (
          <HistoryPage setPageState={setPageState} />
        ) : null}
        {pageState === "Receipt" ? (
          <ReceiptPage cart={cart} totalPrice={totalPrice} />
        ) : null}
        {pageState === "TrackOrder" ? (
          <TrackOrderPage cart={cart} totalPrice={totalPrice} />
        ) : null}
      </>
    );
  }
}

const Loading = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <CircularProgress disableShrink />
    </div>
  );
};
