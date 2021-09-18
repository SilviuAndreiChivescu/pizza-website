import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import Axios from "axios";

const useHistoryData = (setAppState) => {
  const [historyData, setHistoryData] = useState({
    historyProductList: [],
    timeOfOrder: [],
    idOfHistoryProductList: [],
    loaded: false,
  });

  const { user } = useAuth0();
  useEffect(() => {
    try {
      Axios.get(
        `${process.env.REACT_APP_ENDPOINT}/getFromOrders/${user.email}`
      ).then((response) => {
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

        // Set states
        setHistoryData({
          ...historyData,
          // Set the cart to the state
          historyProductList: orders,
          // Set the time to the state
          timeOfOrder: times,
          // Set the ids to the state
          idOfHistoryProductList: ids,
          // Confirm data has loaded
          loaded: true,
        });
      });
    } catch (err) {
      console.log(err);
      setAppState("error");
    }
  }, []);

  return {
    historyData,
  };
};

export { useHistoryData };
