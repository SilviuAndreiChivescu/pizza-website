import { useState } from "react";
import { Form } from "react-bootstrap";
import { useQuantitySelector, useAddToCart } from "./ModalContentLogic";

// Content of Modal in NoCartPage
export default function ModalContent(props) {
  const { content, cart, setCart, onClose } = props;

  // **** From ModalContentLogic ****

  const { quantity, incrementItem, decreaseItem } = useQuantitySelector();
  const { addToCart } = useAddToCart();

  // **** END ModalContentLogic ****

  // State for Pizza's sizes
  const [size, setSize] = useState("0");
  const [sizeName, setSizeName] = useState("");

  // If the Product Category === "pizza", make options for size
  const PizzaSize = () => {
    // This Array is used to keep the checked value for the <Form.Check />
    const values = [{ Mica: "0" }, { Medie: "1" }, { Mare: "2" }];
    return (
      <>
        <Form.Group className="mb-3">
          {values.map((e) => {
            return (
              <>
                <Form.Check
                  type="radio"
                  name="pizzaSize"
                  label={Object.keys(e)}
                  id={Object.keys(e)}
                  value={Object.values(e)}
                  checked={size == Object.values(e)} // using "==" instead of "===" because this is the only way it works. (I belive because values array has objects in it and it points to object value)
                  onChange={(e) => {
                    setSize(e.currentTarget.value);
                    setSizeName(e.currentTarget.id);
                  }}
                />
              </>
            );
          })}
        </Form.Group>
      </>
    );
  };

  const handleSubmit = () => {
    onClose();
    addToCart(cart, setCart, content, quantity, content.Price[size], sizeName);
  };

  return (
    <>
      <img
        style={{ maxWidth: "100%" }}
        src="https:medievalpizza.com\/wp-content\/uploads\/2021\/04\/341-1-scaled.jpg"
      ></img>
      <p className="pt-3">{content.Description}</p>
      <h5 className="fw-bold">{content.Price[size]} lei</h5>
      {content.Category === "pizza" ? <PizzaSize setSize={setSize} /> : null}
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
                {quantity}
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
              onClick={() => handleSubmit()}
              className="container-fluid black-bg text-white border border-2 border-dark rounded p-2"
            >
              Adauga in cos
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
