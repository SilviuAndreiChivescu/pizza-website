import { useEffect, useState } from "react";
import Axios from "axios";

// Filter the productsList
const useFilteredProductsList = (productsList) => {
  // State to hold the value from search field
  const [filter, setFilter] = useState("");
  // State to hold the filteredProductsList
  const [filteredList, setFilteredList] = useState([]);

  // Create new list by filtering the productsList for name
  useEffect(() => {
    let filteredListArray = productsList.filter((e) =>
      e.Name.toLowerCase().match(filter.toLowerCase())
    );
    setFilteredList(filteredListArray);
  }, [filter, productsList]);

  return { filteredList, setFilter };
};

// Update
const useUpdateProducts = (val) => {
  // State to update with
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: 0,
    price2: 0,
    price3: 0,
    quantity: 1, // Set quantity to 1 because that's how this restaurant sells
    description: "",
    category: "",
    imageUrl: "",
  });

  // Set values to the previous values
  useEffect(() => {
    setNewProduct({
      ...newProduct,
      name: val.Name,
      price: val.Price[0],
      price2: val.Price[1],
      price3: val.Price[2],
      description: val.Description,
      category: val.Category,
      imageUrl: val.Image,
    });
  }, []);

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

export { useFilteredProductsList, useUpdateProducts, useDeleteProduct };
