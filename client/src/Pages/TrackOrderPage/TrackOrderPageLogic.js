import { useEffect, useState } from "react";
import Axios from "axios";

// **** State to read/get order found by _id from MongoDB Orders collection
const useOrder = (id) => {
  const [loaded, setLoaded] = useState(false);
  const [order, setOrder] = useState([]);
  useEffect(() => {
    Axios.get(`http://localhost:3001/readbyid/${id}`).then((response) => {
      var order = response.data.map((e) => {
        return e.Cart;
      });
      setOrder(order);
      setLoaded(true);
    });
  }, []);

  return { order, loaded };
};
// AM RAMAS AICI, ACU TREBUIE SA INTEGRES FEATURE CU GEN, CAND SUNT SUB 50 MIN, SA APARAR MINUTELE SI CAT MAI E LEFT SI COMANDA ESTE PREPARATA .THEN LIVRATA
// Custom hook to get the difference between date of particular Order and the current date
const useDate = (id) => {
  // State of difference
  const [minsDiff, setMinsDiff] = useState(0);

  // Get timestamp from _id of Order
  const [date] = useState(
    () => new Date(parseInt(id.toString().substring(0, 8), 16) * 1000)
  );
  // Set current date
  const [currentDate, setCurrentDate] = useState(() => new Date());

  // Calculate the difference between the two dates and return answer in minutes
  const dateDiff = (date, currentDate) => {
    return parseInt(Math.abs(date - currentDate) / (1 * 60 * 1000), 10);
  };

  useEffect(() => {
    console.log(dateDiff(date, currentDate)); // TESTING PURPOSE - DELETE LATER

    // Set minsDiff state to result
    setMinsDiff(dateDiff(date, currentDate));
  }, [date, currentDate]);

  useEffect(() => {
    // Call setInterval to update current date every minute
    setInterval(() => setCurrentDate(() => new Date()), 60 * 1000);
  }, []);

  return { minsDiff };
};

export { useOrder, useDate };
