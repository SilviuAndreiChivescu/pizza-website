import { useEffect, useState } from "react";
import Axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

export default function History() {
  const [historyProductList, setHistoryProductList] = useState([]);
  const { user } = useAuth0();
  const [stateOfPage, setStateOfPage] = useState("loading");
  useEffect(() => {
    Axios.get(`http://localhost:3001/read/${user.email}`).then((response) => {
      // To get data from request
      var data = response.data;
      // To get the orders from data
      var orders = data.map((e) => {
        return e.Cart;
      });
      setHistoryProductList(orders);
      setStateOfPage("loaded");
    });
  }, []);

  if (stateOfPage === "loading") return <div>Loading...</div>;
  else if (stateOfPage === "loaded") {
    return historyProductList.map((e, idx) => {
      return (
        <div key={idx}>
          <h5>Comanda {idx}.</h5>
          <ul>
            {e.map((element, index) => {
              return <li>{element.Name}</li>;
            })}
          </ul>
        </div>
      );
    });
  }
}
