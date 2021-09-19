import { useEffect, useState } from "react";

import Axios from "axios";

// Products states
const useProductsStates = () => {
  const [productsStates, setProductsStates] = useState({
    name: "",
    price: 0,
    quantity: 1, // Set quantity to 1 because that's how this restaurant sells
    description: "",
    category: "",
    imageUrl: "",
  });

  return { productsStates, setProductsStates };
};

// Read
const useProductsList = () => {
  const [productsList, setProductsList] = useState([]);

  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_ENDPOINT}/getFromProducts`).then(
      (response) => {
        setProductsList(response.data);
      }
    );
  }, []);

  return { productsList, setProductsList };
};

// Insert
const useAddToProducts = (productsList, setProductsList) => {
  const addToProducts = async (productsStates) => {
    try {
      await Axios.post(`${process.env.REACT_APP_ENDPOINT}/insertIntoProducts`, {
        product: productsStates,
      });
      setProductsList([
        ...productsList,
        {
          Name: productsStates.name,
          Price: productsStates.price,
          Quantity: productsStates.quantity,
        },
      ]);
    } catch (err) {
      console.log(err);
    }
  };

  return { addToProducts };
};

// Update
const useUpdateProducts = () => {
  // State to update with
  const [newProduct, setNewProduct] = useState({ name: "" });

  const updateProducts = (id, newProduct) => {
    Axios.put(`${process.env.REACT_APP_ENDPOINT}/updateProducts`, {
      id: id,
      newProduct: newProduct,
    });
  };
  return { updateProducts, newProduct, setNewProduct };
};

// Delete
const useDeleteProduct = () => {
  const deleteProduct = (id) => {
    Axios.delete(`${process.env.REACT_APP_ENDPOINT}/deleteFromProducts/${id}`);
  };

  return { deleteProduct };
};

export {
  useProductsStates,
  useProductsList,
  useAddToProducts,
  useUpdateProducts,
  useDeleteProduct,
};
