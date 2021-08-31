import React, { useState, useEffect } from "react";
import { useBeforeunload } from "react-beforeunload";
import { useAuth0 } from "@auth0/auth0-react";

import NoCartPage from "../Pages/NoCartPage/NoCartPage";
import CartPage from "../Pages/CartPage/CartPage";
import CheckoutPage from "../Pages/CheckoutPage/CheckoutPage";
import HistoryPage from "../Pages/HistoryPage/HistoryPage";

import { useAppState } from "../hooks/appState";
import { usePageState } from "../hooks/pageState";
import { useCart } from "../hooks/cart";
import { useTotalNoOfProductAndTotalPrice } from "../hooks/totalNoOfProductAndTotalPrice";
import { useProductsList } from "../hooks/productsList";
import { CircularProgress } from "@material-ui/core";

export default function Main() {
  // The state of Application
  const { appState, setAppState } = useAppState();

  // **** Auth0 ****
  const { isLoading } = useAuth0();

  // State to display between pages (NoCart, Cart, Checkout, History) - can be found before return at the end ( WORKING ON PUTING PAGE ON SEAPARTE FOLDER AND HOOKS IN THEIR OWN FILE)
  const { pageState, setPageState } = usePageState();

  // **** Shopping Cart ****
  // Taking cart and setCart from useCart hook
  const { cart, setCart } = useCart();

  // Before unload of page, put cart in localStorage && remove cart from localStorage after setting it to the cart state array
  useBeforeunload(
    window.localStorage.removeItem("cart"),
    window.localStorage.setItem("cart", JSON.stringify(cart))
  );

  // **** END OF Shopping Cart ****

  // state to read/get products from MongoDB products collection
  const { productsList } = useProductsList(setAppState);

  // **** This is for MainMenu > CartNotOpened & for Total price in CartOpen ****
  const { totalNumberOfProduct, totalPrice } =
    useTotalNoOfProductAndTotalPrice(cart);
  // **** END OF MainMenu > CartNotOpened ****

  // Conditional rendering to render only if all data is received
  if (appState === "loading" || isLoading) return <Loading />;
  else if (appState === "loaded") {
    /* Conditional rendering for showing NoCart, Cart, Checkout, History pages that live inside this file */
    return (
      <>
        {pageState === "NoCart" ? (
          <NoCartPage
            pageState={pageState}
            setPageState={setPageState}
            cart={cart}
            setCart={setCart}
            totalPrice={totalPrice}
            totalNumberOfProduct={totalNumberOfProduct}
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
          <CheckoutPage pageState={pageState} setPageState={setPageState} />
        ) : null}
        {pageState === "History" ? <HistoryPage /> : null}
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
