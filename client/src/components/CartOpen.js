import iconEmptyBasket from "../images/iconEmptyBasket.svg";
import { useState } from "react";
import Axios from "axios";

export default function CartOpen(props) {
  const today = new Date();
  const time = today.getHours() + ":" + today.getMinutes();

  const DeliveryHours = () => {
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

  const incrementItem = (numberOfProduct, id) => {
    try {
      Axios.put("http://localhost:3001/updateCart", {
        id: id,
        newNumberOfProduct: numberOfProduct + 1,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const decreaseItem = (numberOfProduct, id) => {
    if (numberOfProduct === 1) return;
    else {
      try {
        Axios.put("http://localhost:3001/updateCart", {
          id: id,
          newNumberOfProduct: numberOfProduct - 1,
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  const deleteProduct = (id) => {
    if (id === undefined) return;
    try {
      Axios.delete(`http://localhost:3001/deleteFromCart/${id}`);
    } catch (err) {
      console.log(err);
    }
  };

  // if using useState and useEffect to fetch data and set it as state and then display it, you should put both functions inside a function call useDisplayName(), and add a return value inside it, and that is a custom hook you can reuse, then inside where you need your custom hook, just declare a variable and put it = useDisplayName();
  // Cica if using useEffect to fetch data and to update state, do it with .then after axios request
  // Cica useEffect daca nu i dai nici un argument, o sa dea run de fiecare data cand un state din componenta respectiva se va schimba.
  // AM RAMAS AICI INCERCAND SA FAC CA ATUNCI CAND UPDATEZI COSU DIN CART, GEN DAI +SAU-, TOTAL PRICE GETS UPDATED ONLY WHEN GOING BACK TO noCart
  const [totalPrice, setTotalPrice] = useState(props.price);
  const CartOpenLogic = (props) => {
    const [numberOfProduct, setNumberOfProduct] = useState(
      props.val.numberOfProduct
    );
    // get initial price of product in order to add or substract from price of product whenever the user adds or substracts one from numberOfProduct
    const [initialPriceOfProduct, setInitialPriceOfProduct] = useState(
      props.val.Price
    );
    const [priceOfProduct, setPriceOfProduct] = useState(
      initialPriceOfProduct * numberOfProduct
    );

    // Function to run all setStates in the same function
    function runAll(numberOfProduct) {
      setPriceOfProduct((currPrice) => currPrice - initialPriceOfProduct);
      setNumberOfProduct((currNumber) => currNumber - 1);

      decreaseItem(numberOfProduct, props.val._id);
      //
    }

    // useEffect(() => {
    //   props.setTotalPrice(prevPrice => prevPrice - initialPriceOfProduct);
    // }, [priceOfProduct])

    // If numberOfProduct is 0, delete the product from list and from db
    if (numberOfProduct === 0) {
      deleteProduct(props.val._id);
      return null;
    }
    return (
      <div key={props.val._id} className="row container-fluid ">
        <div className="col d-inline-flex ps-0 justify-content-center pt-3">
          <p>{numberOfProduct} X </p>
          <p className="ps-2 pe-2">{props.val.Name}</p>
          <div>
            <button
              onClick={() => runAll(numberOfProduct)}
              className="border-1 border-dark bg-light rounded-start"
              style={{ width: "30px" }}
            >
              -
            </button>
          </div>
          <div>
            <button
              onClick={() => {
                setPriceOfProduct(
                  (currPrice) => currPrice + initialPriceOfProduct
                );
                setNumberOfProduct((currNumber) => currNumber + 1);
                incrementItem(numberOfProduct, props.val._id);
              }}
              className="border-1 border-dark bg-light rounded-end"
              style={{ width: "30px" }}
            >
              +
            </button>
          </div>
          <p className="ps-2 pe-2">{priceOfProduct} lei</p>
        </div>
      </div>
    );
  };
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

        {props.cartList.map((val) => {
          return (
            <CartOpenLogic setTotalPrice={(e) => setTotalPrice(e)} val={val} />
          );
        })}

        <div className="mb-5 border-bottom border-2 border-secondary">
          <p className="fw-bold">Total: {totalPrice} lei</p>
        </div>
        <DeliveryHours />
      </section>
    </>
  );
}
