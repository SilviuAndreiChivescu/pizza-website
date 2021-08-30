import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useBeforeunload } from "react-beforeunload";
import { useAuth0 } from "@auth0/auth0-react";

import MainMenu from "../components/MainMenu.js";
import MenuNavBar from "../components/MenuNavBar.js";
import CartAndCheckoutNavBar from "../components/CartAndCheckoutNavBar.js";
import CartOpen from "../components/CartOpen.js";
import Checkout from "../components/Checkout.js";
import History from "../components/History";
import Loading from "../components/Loading";

// START BY COMMITING AND SAYING WHAT YOU GOING TO DO: CLEANING UP CODE, start by renaming popUp state to something meaninful
export default function Main() {
  // The state of Application
  const [appState, setAppState] = useState("loading");

  // **** Auth0 ****
  const { user, isAuthenticated, isLoading } = useAuth0();

  // State to display between pages (noCart, cart, checkout, history)
  const [pageState, setPageState] = useState("noCart");

  // ***** Shopping Cart *****
  // Initiate cart with previous cart from localStorage if exists else empty array
  const [cart, setCart] = useState(
    JSON.parse(window.localStorage.getItem("cart")) || []
  );

  // Before unload of page, put cart in localStorage && remove cart from localStorage after setting it to the cart state array
  useBeforeunload(
    window.localStorage.removeItem("cart"),
    window.localStorage.setItem("cart", JSON.stringify(cart))
  );

  // ***** END OF Shopping Cart *****

  // state to read/get products from MongoDB products collection
  const [productsList, setProductsList] = useState([]);
  useEffect(() => {
    Axios.get("http://localhost:3001/read").then((response) => {
      setProductsList(response.data);
      setAppState("loaded");
    });
  }, []);

  // This is for MainMenu > CartNotOpened & for Total price in CartOpen
  // Get totalNumberOfProduct from cart state
  const [totalNumberOfProduct, setTotalNumberOfProduct] = useState(0);
  // Get totalPrice of all products from cart state
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // This is for totalNumberOfProducts
    setTotalNumberOfProduct(
      cart
        .map((e, key) => {
          return cart[key].numberOfProduct;
        })
        .reduce((total, value) => total + value, 0)
    );

    // This is for totalPrice
    setTotalPrice(
      cart
        .map((e, key) => {
          return cart[key].numberOfProduct * cart[key].Price;
        })
        .reduce((total, value) => total + value, 0)
    );
  }, [cart]);
  // ******** END OF MainMenu > CartNotOpened ********

  // Conditional rendering to render only if all data is received
  if (appState === "loading" || isLoading) return <Loading />;
  else if (appState === "loaded") {
    /* Conditional rendering for showing noCart, cart, checkout, history components */
    if (pageState === "noCart") {
      return (
        <>
          <MenuNavBar setPageState={setPageState} />
          <MainMenu
            cart={cart}
            setCart={(e) => setCart(e)}
            totalPrice={totalPrice}
            totalNumberOfProduct={totalNumberOfProduct}
            productsList={productsList}
            setPageState={() => setPageState("cart")}
          />
        </>
      );
    } else if (pageState === "cart") {
      return (
        <>
          <CartAndCheckoutNavBar
            setPageState={() => setPageState("noCart")}
            title={"Cosul tau"}
          />
          <CartOpen
            cart={cart}
            setCart={(e) => setCart(e)}
            totalPrice={totalPrice}
            setPopUpCheckout={() => setPageState("checkout")}
          />
        </>
      );
    } else if (pageState === "checkout") {
      return (
        <>
          <CartAndCheckoutNavBar
            setPageState={() => setPageState("cart")}
            title={"Aici dai comanda"}
          />
          <Checkout />
        </>
      );
    } else if (pageState === "history") {
      return (
        <>
          <History />
        </>
      );
    }
  }
}
