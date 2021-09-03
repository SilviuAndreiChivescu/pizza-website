import { useEffect, useState } from "react";
import Axios from "axios";

// **** State to read/get order found by _id from MongoDB Orders collection
const useOrder = (id) => {
  const [loaded, setLoaded] = useState(false);
  const [order, setOrder] = useState([]);
  useEffect(() => {
    Axios.get(`http://localhost:3001/readbyid/${id}`).then((response) => {
      var orders = response.data.map((e) => {
        return e.Cart;
      });
      setOrder(orders);
      setLoaded(true);
    });
  }, []);

  return { order, loaded };
};

export { useOrder };
