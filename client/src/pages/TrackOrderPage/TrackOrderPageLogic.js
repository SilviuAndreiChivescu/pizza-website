import { useEffect, useState } from "react";
import Axios from "axios";

// **** State to read/get order found by _id from MongoDB Orders collection
const useOrder = (id) => {
  const [loaded, setLoaded] = useState(false);
  const [order, setOrder] = useState([]);
  // Below functionality commented is for when adding to Orders collection a Address field
  // const [address, setAddress] = useState([]);
  useEffect(() => {
    Axios.get(`https://pizza-website2021.herokuapp.com/readbyid/${id}`).then(
      (response) => {
        var order = response.data.map((e) => {
          return e.Cart;
        });
        // Below functionality commented is for when adding to Orders collection a Address field
        // var address = response.data.map((e) => {
        //   return e.address; - check here
        // })
        // setAddress();
        setOrder(order);
        setLoaded(true);
      }
    );
  }, []);

  return { order, loaded };
};

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
  setInterval(() => setCurrentDate(() => new Date()), 60 * 1000);

  // Calculate the difference between the two dates and return answer in minutes
  const dateDiff = (date, currentDate) => {
    return parseInt(Math.abs(date - currentDate) / (1 * 60 * 1000), 10);
  };

  useEffect(() => {
    // Set minsDiff state to result
    setMinsDiff(dateDiff(date, currentDate));

    // Call setInterval to update current date every minute
  }, [currentDate]);

  return { minsDiff };
};

export { useOrder, useDate };
