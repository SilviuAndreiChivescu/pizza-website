import { useAuth0 } from "@auth0/auth0-react";
import Axios from "axios";
import { useState } from "react";

// Post request to Orders collection - THIS SHOULD POST ORDERS TO ORDERS COLLECTIONS WHEN USER FINISHES AT CHECKOUT PAGE, BUT I TESTED IT HERE AND IT'S OK. MOVE LATER
const usePostToOrders = () => {
  const { user } = useAuth0();
  const submit = (cart) => {
    console.log(cart);
    try {
      Axios.post("http://localhost:3001/insertIntoOrders", {
        Email: user.email,
        Cart: cart,
      });
      console.log("Inserted data into Orders collection!");
    } catch (err) {
      console.log(err);
    }
  };
  return { submit };
};

// This custom hook modifies the cart state, by increasing or decreasing quantity up to deleting it if quantity is 0.
const useQuantitySelector = (cart, setCart, value) => {
  // Initiate a state for each product in list
  const [quantity, setQuantity] = useState(() => value.Quantity);
  const incrementItem = (Name) => {
    // Increment the particular state
    setQuantity((prevNumber) => prevNumber + 1);
    // Create a new cart array
    var newArr = cart.map((value) => {
      if (value.Name === Name) {
        value.Quantity += 1;
      }
      return value;
    });
    // Set the new Array as cart array
    setCart(newArr);
  };
  const decreaseItem = (Name) => {
    // Delete item if quantity gets to 0
    if (quantity === 1) {
      let filteredCart = cart.filter((value) => value.Name !== Name);
      setCart(filteredCart);
    } else {
      setQuantity((prevNumber) => prevNumber - 1);
      var newArr = cart.map((value) => {
        if (value.Name === Name) {
          value.Quantity -= 1;
        }
        return value;
      });
      setCart(newArr);
    }
  };
  return { incrementItem, decreaseItem };
};

export { usePostToOrders, useQuantitySelector };
