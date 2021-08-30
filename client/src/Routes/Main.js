import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useBeforeunload } from "react-beforeunload";
import { useAuth0 } from "@auth0/auth0-react";

import MainMenu from "../components/MainMenu.js";
import NavBar from "../components/NavBar";
import CartOpen from "../components/CartOpen.js";
import Checkout from "../components/Checkout.js";
import History from "../components/History";
import Loading from "../components/Loading";

export default function Main() {
  // The state of Application
  const [appState, setAppState] = useState("loading");

  // **** Auth0 ****
  const { user, isAuthenticated, isLoading } = useAuth0();

  // State to display between pages (NoCart, Cart, Checkout, History) - can be found before return at the end
  const [pageState, setPageState] = useState("NoCart");

  // **** Shopping Cart ****
  // Initiate cart with previous cart from localStorage if exists else empty array
  const [cart, setCart] = useState(
    JSON.parse(window.localStorage.getItem("cart")) || []
  );

  // Before unload of page, put cart in localStorage && remove cart from localStorage after setting it to the cart state array
  useBeforeunload(
    window.localStorage.removeItem("cart"),
    window.localStorage.setItem("cart", JSON.stringify(cart))
  );

  // **** END OF Shopping Cart ****

  // state to read/get products from MongoDB products collection
  const useProductsList = () => {
    const [productsList, setProductsList] = useState([]);
    useEffect(() => {
      Axios.get("http://localhost:3001/read").then((response) => {
        setProductsList(response.data);
        setAppState("loaded");
      });
    }, []);

    return { productsList };
  };
  const { productsList } = useProductsList();

  // **** This is for MainMenu > CartNotOpened & for Total price in CartOpen ****
  const useTotalNoOfProductAndTotalPrice = (cart) => {
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

    return { totalNumberOfProduct, totalPrice };
    // **** END OF MainMenu > CartNotOpened ****
  };
  const { totalNumberOfProduct, totalPrice } =
    useTotalNoOfProductAndTotalPrice(cart);

  // **** Pages ****
  const NoCartPage = () => {
    return (
      <>
        <NavBar
          title={"Orice comanda va fi confirmata in 5 minute."}
          pageState={pageState}
          setPageState={setPageState}
        />
        <MainMenu
          cart={cart}
          setCart={(e) => setCart(e)}
          totalPrice={totalPrice}
          totalNumberOfProduct={totalNumberOfProduct}
          productsList={productsList}
          setPageState={() => setPageState("Cart")}
        />
      </>
    );
  };

  const CartPage = () => {
    return (
      <>
        <NavBar
          title={"Cosul tau"}
          pageState={pageState}
          setPageState={setPageState}
        />
        <CartOpen
          cart={cart}
          setCart={(e) => setCart(e)}
          totalPrice={totalPrice}
          setPageState={setPageState}
        />
      </>
    );
  };

  const CheckoutPage = () => {
    return (
      <>
        <NavBar
          title={"Aici dai comanda"}
          pageState={pageState}
          setPageState={setPageState}
        />
        <Checkout />
      </>
    );
  };

  const HistoryPage = () => {
    return (
      <>
        <History />
      </>
    );
  };
  // **** END OF Pages ****

  // Conditional rendering to render only if all data is received
  if (appState === "loading" || isLoading) return <Loading />;
  else if (appState === "loaded") {
    /* Conditional rendering for showing NoCart, Cart, Checkout, History pages that live inside this file */
    return (
      <>
        {pageState === "NoCart" ? <NoCartPage /> : null}
        {pageState === "Cart" ? <CartPage /> : null}
        {pageState === "Checkout" ? <CheckoutPage /> : null}
        {pageState === "History" ? <HistoryPage /> : null}
      </>
    );
  }
}
