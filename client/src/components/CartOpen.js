import iconEmptyBasket from "../images/iconEmptyBasket.svg";
import { useState } from "react";
import Axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

export default function CartOpen(props) {
  return (
    <>
      <section className="container-fluid position-absolute h-100 w-100 overflow-hidden bg-white text-center">
        {/* The below div is only when cart is empty, when not empty, show what I will code with buttons and meal */}
        <div className="text-secondary border-bottom border-2 border-secondary">
          <img
            className="img-fluid mt-5"
            src={iconEmptyBasket}
            style={{ width: "70px" }}
          />
          <h5 className="mb-5">
            Adauga mancare gustoasa din meniu si apoi plaseaza comanda
          </h5>
        </div>

        {props.cart.map((value) => {
          return (
            <CartOpenLogic
              setCart={props.setCart}
              cart={props.cart}
              value={value}
            />
          );
        })}

        <div className="mb-5 border-bottom border-2 border-secondary">
          <p className="fw-bold">Total: {props.totalPrice} lei</p>
        </div>
        <DeliveryHours
          cart={props.cart}
          setPopUpCheckout={props.setPopUpCheckout}
        />
      </section>
    </>
  );
}

const CartOpenLogic = (props) => {
  // Initiate a state for each product in list
  const [numberOfProduct, setNumberOfProduct] = useState(
    () => props.value.numberOfProduct
  );
  const incrementItem = (Name) => {
    // Increment the particular state
    setNumberOfProduct((prevNumber) => prevNumber + 1);
    // Create a new cart array
    var newArr = props.cart.map((value) => {
      if (value.Name === Name) {
        value.numberOfProduct += 1;
      }
      return value;
    });
    // Set the new Array as cart array
    props.setCart(newArr);
  };
  const decreaseItem = (Name) => {
    // Delete item if numberOfProduct gets to 0
    if (numberOfProduct === 1) {
      let filteredCart = props.cart.filter((value) => value.Name !== Name);
      props.setCart(filteredCart);
    } else {
      setNumberOfProduct((prevNumber) => prevNumber - 1);
      var newArr = props.cart.map((value) => {
        if (value.Name === Name) {
          value.numberOfProduct -= 1;
        }
        return value;
      });
      props.setCart(newArr);
    }
  };

  return (
    <div key={props.value._id} className="row container-fluid ">
      <div className="col d-inline-flex ps-0 justify-content-center pt-3">
        <p>{numberOfProduct} X </p>
        <p className="ps-2 pe-2">{props.value.Name}</p>
        <div>
          <button
            onClick={() => {
              decreaseItem(props.value.Name);
            }}
            className="border-1 border-dark bg-light rounded-start"
            style={{ width: "30px" }}
          >
            -
          </button>
        </div>
        <div>
          <button
            onClick={() => {
              incrementItem(props.value.Name);
            }}
            className="border-1 border-dark bg-light rounded-end"
            style={{ width: "30px" }}
          >
            +
          </button>
        </div>
        <p className="ps-2 pe-2">
          {props.value.Price * props.value.numberOfProduct} lei
        </p>
      </div>
    </div>
  );
};

const DeliveryHours = (props) => {
  const { user } = useAuth0();
  const today = new Date();
  const time = today.getHours() + ":" + today.getMinutes();
  // Post request to Orders collection
  const submit = () => {
    console.log(props.cart);
    try {
      Axios.post("http://localhost:3001/insertIntoOrders", {
        Email: user.email,
        Cart: props.cart,
      });
      console.log("Inserted data into Orders collection!");
    } catch (err) {
      console.log(err);
    }

    // ****** how to post the data thru request
    //   Email: name,
    //   Cart: cart,
    // });
  };

  if (time > "22:29" && time < "8:59") {
    return (
      <div className="mb-5 text-secondary">
        <h5>
          Momentan nu putem prelua comenzi. Va rugam reveniti zilnic in
          intervalul 09:00 - 22:30. Va multumim !
        </h5>
      </div>
    );
  } else {
    return (
      <div className="container">
        <button onClick={submit}> Send to orders collection </button>
        <button
          onClick={props.setPopUpCheckout}
          className="black-bg text-white border border-2 border-dark rounded p-2"
        >
          Comanda
        </button>
      </div>
    );
  }
};
