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

// State to pass id of order to TrackOrderPage
const useIdOfOrder = () => {
  const [idOfOrder, setIdOfOrder] = useState("");
  return { idOfOrder, setIdOfOrder };
};

// Last order is used to show on Receipt
const useLastOrder = () => {
  const [lastOrder, setLastOrder] = useState([]);
  return { lastOrder, setLastOrder };
};

// **** State to read/get products from MongoDB products collection
const useProductsList = (setAppState) => {
  const [productsList, setProductsList] = useState([]);
  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_ENDPOINT}/read`).then((response) => {
      setProductsList(response.data);
      setAppState("loaded");
    });
  }, []);

  return { productsList };
};

const useTotalQuantityOrTotalPrice = (cart) => {
  // Get totalQuantity from cart state
  const [totalQuantity, setTotalQuantity] = useState(0);
  // Get totalPrice of all products from cart state
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (cart) {
      // This is for totalQuantitys
      setTotalQuantity(() =>
        cart
          .map((e, key) => {
            return cart[key].Quantity;
          })
          .reduce((total, value) => total + value, 0)
      );

      // This is for totalPrice
      setTotalPrice(() =>
        cart
          .map((e, key) => {
            return cart[key].Quantity * cart[key].Price;
          })
          .reduce((total, value) => total + value, 0)
      );
    }
  }, [cart]);

  return { totalQuantity, totalPrice };
};

export {
  useAppState,
  useCart,
  useLastOrder,
  useProductsList,
  useTotalQuantityOrTotalPrice,
  useIdOfOrder,
};
