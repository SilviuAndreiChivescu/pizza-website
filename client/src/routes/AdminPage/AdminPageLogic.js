import { useEffect, useState } from "react";

import Axios from "axios";

// Read from Products Collection
const useProductsList = () => {
  const [productsList, setProductsList] = useState([]);

  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_ENDPOINT}/getFromProducts`).then(
      (response) => {
        setProductsList(response.data.reverse());
      }
    );
  }, []);

  return { productsList, setProductsList };
};

export { useProductsList };
