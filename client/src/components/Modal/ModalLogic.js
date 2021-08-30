import React, { useState, useContext } from "react";

// voiam sa unesc cumva fisieru asta cu mainmenu, gen sa exportez din asta functiile si alea, si sa nu mai fie UI aici
// Custom hook to handle the quantity
const useQuantitySelector = () => {
  const [numberOfProduct, setNumberOfProduct] = useState(1);

  const incrementItem = () => {
    setNumberOfProduct((currClicks) => currClicks + 1);
  };
  const decreaseItem = () => {
    if (numberOfProduct <= 1) return;
    setNumberOfProduct((currClicks) => currClicks - 1);
  };

  return { numberOfProduct, incrementItem, decreaseItem };
};

// Add / Update the product to the cart State Array
const addToCart = (cart, setCart, content, numberOfProduct) => {
  // Check if Product is already in cart
  let filteredProduct = cart.filter((value) => value.Name === content.Name);
  // If product is not in cart, add it
  if (filteredProduct.length === 0) {
    setCart((prevState) => [
      ...prevState,
      {
        ID: content.ID,
        Name: content.Name,
        numberOfProduct: numberOfProduct,
        Price: content.Price,
      },
    ]);
  }
  // If product is in cart, add number of product to previous number of product for that particular product
  else {
    var newArr = cart.map((value) => {
      if (value.Name === content.Name) {
        value.numberOfProduct += numberOfProduct;
      }
      return value;
    });
    setCart(newArr);
  }
};

export { useQuantitySelector, addToCart };
