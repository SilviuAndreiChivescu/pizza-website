import { useEffect, useState } from "react";
import Axios from "axios";

// **** State to read/get order found by _id from MongoDB Orders collection
const useOrder = (id) => {
  const [loaded, setLoaded] = useState(false);
  const [order, setOrder] = useState([]);
  // Below functionality commented is for when adding to Orders collection a Address field
  const [address, setAddress] = useState([]);
  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_ENDPOINT}/readbyid/${id}`).then(
      (response) => {
        var order = response.data.map((e) => {
          return e.Cart;
        });
        // Below functionality commented is for when adding to Orders collection a Address field
        var address = response.data.map((e) => {
          return e.Address + ", " + e.City;
        });
        setAddress(address);
        setOrder(order);
        setLoaded(true);
      }
    );
  }, []);

  return { order, address, loaded };
};

export { useOrder };
