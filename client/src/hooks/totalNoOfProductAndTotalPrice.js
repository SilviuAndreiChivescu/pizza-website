import { useEffect, useState } from "react";

const useTotalNoOfProductAndTotalPrice = (cart) => {
  // Get totalNumberOfProduct from cart state
  const [totalNumberOfProduct, setTotalNumberOfProduct] = useState(0);
  // Get totalPrice of all products from cart state
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // This is for totalNumberOfProducts
    setTotalNumberOfProduct(
      cart
        .map((e, key) => {
          return cart[key].numberOfProduct;
        })
        .reduce((total, value) => total + value, 0)
    );

    // This is for totalPrice
    setTotalPrice(
      cart
        .map((e, key) => {
          return cart[key].numberOfProduct * cart[key].Price;
        })
        .reduce((total, value) => total + value, 0)
    );
  }, [cart]);

  return { totalNumberOfProduct, totalPrice };
};

export { useTotalNoOfProductAndTotalPrice };
