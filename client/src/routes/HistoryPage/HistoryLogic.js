import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import Axios from "axios";

const useHistoryData = () => {
  const [historyProductList, setHistoryProductList] = useState([]);
  const [timeOfOrder, setTimeOfOrder] = useState([]);
  const [idOfHistoryProductList, setIdOfHistoryProductList] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const { user } = useAuth0();
  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_ENDPOINT}/read/${user.email}`).then(
      (response) => {
        // To get data from request
        var data = response.data.reverse(); // (reverse method to get the most recent order at the top)

        // To get the Cart from data
        var orders = data.map((e) => {
          return e.Cart;
        });

        // To get times of orders from data
        var times = data.map((e) => {
          var dateOfOrder = new Date(
            parseInt(e._id.substring(0, 8), 16) * 1000
          );
          return dateOfOrder.toLocaleString("ro-RO");
        });

        // To get id for orders from data
        var ids = data.map((e) => {
          return e._id;
        });

        // Set the cart to the state
        setHistoryProductList(orders);
        // Set the ids to the state
        setIdOfHistoryProductList(ids);
        // Set the time to the state
        setTimeOfOrder(times);

        // Confirm data is loaded
        setLoaded((prevValue) => !prevValue);
      }
    );
  }, []);

  return {
    historyProductList,
    timeOfOrder,
    idOfHistoryProductList,
    loaded,
  };
};

export { useHistoryData };
