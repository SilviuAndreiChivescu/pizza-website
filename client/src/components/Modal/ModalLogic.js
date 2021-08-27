import React, { useState } from "react";

function ModalLogic(props) {
  const [numberOfProduct, setNumberOfProduct] = useState(1);

  const incrementItem = () => {
    setNumberOfProduct((currClicks) => currClicks + 1);
  };
  const decreaseItem = () => {
    if (numberOfProduct <= 1) return;
    setNumberOfProduct((currClicks) => currClicks - 1);
  };

  // Add / Update the product to the cart State Array
  const submit = () => {
    // Check if Product is already in cart
    let filteredProduct = props.cart.filter(
      (value) => value.Name === props.Name
    );
    // If product is not in cart, add it
    if (filteredProduct.length === 0) {
      props.setCart((prevState) => [
        ...prevState,
        {
          ID: props.ID,
          Name: props.Name,
          numberOfProduct: numberOfProduct,
          Price: props.Price,
        },
      ]);
    }
    // If product is in cart, add number of product to previous number of product for that particular product
    else {
      var newArr = props.cart.map((value) => {
        if (value.Name === props.Name) {
          value.numberOfProduct += numberOfProduct;
        }
        return value;
      });
      props.setCart(newArr);
    }
  };

  return (
    <div className="row container-fluid">
      <div className="col d-inline-flex fs-3 ps-0">
        <div className="">
          <button
            onClick={() => decreaseItem()}
            className="border-1 border-dark bg-light rounded-start"
            style={{ width: "50px" }}
          >
            -
          </button>
        </div>
        <div>
          <button
            className="border-1 border-dark bg-light"
            style={{ width: "50px", pointerEvents: "none" }}
          >
            {numberOfProduct}
          </button>
        </div>
        <div>
          <button
            onClick={() => incrementItem()}
            className="border-1 border-dark bg-light rounded-end"
            style={{ width: "50px" }}
          >
            +
          </button>
        </div>
      </div>
      <div onClick={() => submit()} className="col pe-0 ps-0">
        <button
          onClick={props.onClose}
          className="container-fluid black-bg text-white border border-2 border-dark rounded p-2"
        >
          Adauga in cos
        </button>
      </div>
    </div>
  );
}

export default ModalLogic;
