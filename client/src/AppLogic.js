import { useEffect, useState } from "react";
import Axios from "axios";

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

// Custom hook to get the difference between date of particular Order and the current date
const useDate = (id) => {
  if (typeof id !== "string" || !(id instanceof String)) id = id.toString();
  // State of difference
  const [minsDiff, setMinsDiff] = useState(0);

  // Get timestamp from _id of Order
  const [date] = useState(
    () => new Date(parseInt(id.substring(0, 8), 16) * 1000)
  );
  // Set current date
  const [currentDate, setCurrentDate] = useState(() => new Date());
  // Call setInterval to update current date every minute
  setInterval(() => setCurrentDate(() => new Date()), 60 * 1000);

  // Calculate the difference between the two dates and return answer in minutes
  const dateDiff = (date, currentDate) => {
    return parseInt(Math.abs(date - currentDate) / (1 * 60 * 1000), 10);
  };

  useEffect(() => {
    // Set minsDiff state to result
    setMinsDiff(dateDiff(date, currentDate));
  }, [currentDate]);

  return { minsDiff };
};

export { useProductsList, useTotalQuantityOrTotalPrice, useDate };
