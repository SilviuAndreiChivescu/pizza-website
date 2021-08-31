import { useEffect, useState } from "react";
import Axios from "axios";

// state to read/get products from MongoDB products collection
const useProductsList = (setAppState) => {
  const [productsList, setProductsList] = useState([]);
  useEffect(() => {
    Axios.get("http://localhost:3001/read").then((response) => {
      setProductsList(response.data);
      setAppState("loaded");
    });
  }, []);

  return { productsList };
};

export { useProductsList };
