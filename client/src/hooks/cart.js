import { useState } from "react";

const useCart = () => {
  // Initiate cart with previous cart from localStorage if exists else empty array
  const [cart, setCart] = useState(
    JSON.parse(window.localStorage.getItem("cart")) || []
  );
  return { cart, setCart };
};

export { useCart };
