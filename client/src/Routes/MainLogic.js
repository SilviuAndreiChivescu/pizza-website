import { useEffect, useState } from "react";
import Axios from "axios";

// **** State of Application
const useAppState = () => {
  const [appState, setAppState] = useState("loading");

  return { appState, setAppState };
};

// **** Cart state to store products.
const useCart = () => {
  // Initiate cart with previous cart from localStorage if exists else empty array
  const [cart, setCart] = useState(
    JSON.parse(window.localStorage.getItem("cart")) || []
  );
  return { cart, setCart };
};

// **** State to show Pages that live in Main.jsx Route
const usePageState = () => {
  const [pageState, setPageState] = useState("NoCart");

  return { pageState, setPageState };
};

// **** State to read/get products from MongoDB products collection
const useProductsList = (setAppState) => {
  const [productsList, setProductsList] = useState([]);
  useEffect(() => {
    Axios.get("http://localhost:3001/read").then((response) => {
      setProductsList(response.data);
      setAppState("loaded");
    });
  }, []);

  return { productsList };
};

// **** Custom hook to get: total price and total quantity for CartBar and Cart components from NoCartPage
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
};

export {
  useAppState,
  useCart,
  usePageState,
  useProductsList,
  useTotalNoOfProductAndTotalPrice,
};
