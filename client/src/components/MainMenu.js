import React, { useEffect, useState } from "react";
import Modal from "./Modal/Modal.js";
import { useQuantitySelector, useAddToCart } from "./Modal/ModalLogic";
import "./Modal/Modal.css";
import { FaShoppingBag } from "react-icons/fa";

// AM RAMAS AICI< FACAND CURAT NUJ SI PRIN FILES N SHIT MAI GANDESTE TE

export default function MainMenu(props) {
  const { cart, setCart, productsList } = props;

  // useState to show the modal
  const [show, setShow] = useState(false);

  // useState for content for modal
  const [content, setContent] = useState([]);
  function getContentForModal(data) {
    setContent(data);
  }

  // The box in which the title & price are shown in the Menu
  const FoodBox = (props) => {
    const { val } = props;
    return (
      <div
        onClick={() => {
          setShow(true);
          getContentForModal({
            Name: val.Name,
            Price: val.Price,
            Category: val.Category,
          });
        }}
        style={{ width: "250px" }}
        className="p-3 m-1 bg-white text-dark shadow bg-body rounded"
      >
        <li key={"props.key"} className="fw-bold">
          {val.Name}
        </li>
        <p style={{ height: "120px" }} className="text-secondary mt-2 mb-2">
          Description
        </p>
        <p className="fw-bolder mb-0 ">{val.Price} lei</p>
      </div>
    );
  };

  // Content of Modal in this NoCart Page
  const ModalBody = (props) => {
    const { onClose } = props;

    // If the product is pizza, make options for size
    const PizzaSize = () => {
      return (
        <div className="mt-2 mb-2">
          <input type="radio" id="mica" name="timp" defaultChecked />
          <label className="ms-2 me-5" htmlFor="mica">
            Mica
          </label>
          <input type="radio" id="medie" name="timp" />
          <label className="ms-2 me-5" htmlFor="medie">
            Medie
          </label>
          <input type="radio" id="mare" name="timp" />
          <label className="ms-2" htmlFor="mare">
            Mare
          </label>
        </div>
      );
    };

    // **** From ModalLogic ****
    const { numberOfProduct, incrementItem, decreaseItem } =
      useQuantitySelector();

    const { addToCart } = useAddToCart();
    // I had to make a custom hook with onClose function that close the modal and with addToCart function, due to rerendering to fast of component.
    const useBothFunctionsWithTimeout = () => {
      const submit = (cart, setCart, content, numberOfProduct) => {
        onClose();
        // Using setTimeout due to the rerendering too fast of cart variable and it is causing the transition of modal to not get called. 300 ms it takes for transition to finish, then the function gets called
        // Also, I could not put this hook in the ModalLogic file. It just did not recognize as a function
        setTimeout(() => {
          addToCart(cart, setCart, content, numberOfProduct);
        }, 300);
      };
      return { submit };
    };
    const { submit } = useBothFunctionsWithTimeout();
    // **** END ModalLogic ****

    return (
      <>
        <img
          style={{ maxWidth: "100%" }}
          src="https:medievalpizza.com\/wp-content\/uploads\/2021\/04\/341-1-scaled.jpg"
        ></img>
        <p className="pt-3">{content.Description}</p>
        <h5 className="fw-bold">{content.Price} lei</h5>
        {content.Category === "pizza" ? <PizzaSize /> : null}
        <label className="mt-2 mb-2" htmlFor="alteInformatiiInput">
          Alte informatii (optional)
          <input
            className="ms-3"
            id="alteInformatiiInput"
            type="text"
            name="e-mail"
            placeholder="Fara ardei, etc."
          />
        </label>
        <br></br>
        <div className="modal-footer">
          <div className="row container-fluid">
            <div className="col d-inline-flex fs-3 ps-0">
              <div>
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
            <div className="col pe-0 ps-0">
              <button
                onClick={() =>
                  submit(cart, setCart, content, numberOfProduct, onClose)
                }
                className="container-fluid black-bg text-white border border-2 border-dark rounded p-2"
              >
                Adauga in cos
              </button>
            </div>
          </div>
        </div>
      </>
    );
  };
  // The fixed bar from the bottom
  function CartNotOpened(props) {
    return (
      <section
        onClick={props.setPageState}
        style={{ cursor: "pointer", backgroundColor: "#000000" }}
        className="text-white d-flex justify-content-between container-fluid position-fixed bottom-0 pe-4 ps-3 pt-2"
      >
        <div className="row">
          <h5 className="col" style={{ backgroundColor: "#000000" }}>
            <FaShoppingBag />
          </h5>
          <h4 className="col ps-0">{props.totalNumberOfProduct}</h4>
        </div>
        <h5 className="fw-bold">Vezi cosul tau</h5>
        <h4 className="fw-bold">{props.totalPrice} lei</h4>
      </section>
    );
  }

  return (
    <section style={{ backgroundColor: "#efeff4" }}>
      <nav className="d-flex justify-content-between bg-secondary p-3 w-100">
        <a href="#pizza">Pizza</a>
        <a href="#">Burgări</a>
        <a href="#chifle">Chifle coapte pe vatră</a>
        <a href="#">Sandwich</a>
        <a href="#">Sucuri si Bere</a>
      </nav>
      <div className="">
        <ul className="text-dark">
          <p id="pizza" className="ps-3 fs-3 fw-bold">
            Pizza
          </p>
          <div className="d-flex flex-wrap">
            {productsList.map((val) => {
              return <FoodBox key={val._id} val={val} />;
            })}
          </div>
          {/* <p>Burgari</p>
            <div className="d-flex flex-wrap">
              {burgari.map(function(d, idx){
                return (
                <div style={{width: "250px"}} className="m-1 bg-white text-dark">
                  <li key={idx}>{d.name}</li>
                </div>)
              })}*/}
        </ul>
      </div>
      <Modal
        Name={content.Name}
        onClose={() => setShow((currShow) => !currShow)}
        show={show}
      >
        <ModalBody onClose={() => setShow((currShow) => !currShow)} />
      </Modal>

      <CartNotOpened
        totalPrice={props.totalPrice}
        totalNumberOfProduct={props.totalNumberOfProduct}
        setPageState={props.setPageState}
      />
    </section>
  );
}
