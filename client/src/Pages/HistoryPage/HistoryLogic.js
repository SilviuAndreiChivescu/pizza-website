import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import Axios from "axios";

const useHistoryData = () => {
  const [historyProductList, setHistoryProductList] = useState([]);
  const { user } = useAuth0();
  useEffect(() => {
    Axios.get(`http://localhost:3001/read/${user.email}`).then((response) => {
      // To get data from request
      var data = response.data;
      // To get the orders from data
      var orders = data.map((e) => {
        return e.Cart;
      });
      setHistoryProductList(orders);
    });
  }, []);

  return { historyProductList };
};

export { useHistoryData };
