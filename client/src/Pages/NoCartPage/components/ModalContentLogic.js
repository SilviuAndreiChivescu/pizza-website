import { useState } from "react";

// Custom hook to handle the quantity
const useQuantitySelector = () => {
  const [quantity, setQuantity] = useState(1);

  const incrementItem = () => {
    setQuantity((currClicks) => currClicks + 1);
  };
  const decreaseItem = () => {
    if (quantity <= 1) return;
    setQuantity((currClicks) => currClicks - 1);
  };

  return { quantity, incrementItem, decreaseItem };
};

// Add / Update the product to the cart State Array
const useAddToCart = () => {
  const addToCart = (cart, setCart, content, quantity, price, sizeName) => {
    // If sizeName is the default, it will not get its id because the event is onChange and nothing changed. In that case, I need to make sure if the sizeName is default, to get its name
    if (sizeName === "") sizeName = "Mica";

    // Check if Product is already in cart
    let filteredProduct = cart.filter((value) => value.Name === content.Name);
    // If product is not in cart, add it
    if (filteredProduct.length === 0) {
      setCart((prevState) => [
        ...prevState,
        {
          ID: content.ID,
          Name: content.Name + " (" + sizeName + ") ",
          Quantity: quantity,
          Price: price,
        },
      ]);
    }
    // If product is in cart, add number of product to previous number of product for that particular product
    else {
      var newArr = cart.map((value) => {
        if (value.Name === content.Name) {
          value.Quantity += quantity;
        }
        return value;
      });
      setCart(newArr);
    }
  };

  return { addToCart };
};

export { useQuantitySelector, useAddToCart };
