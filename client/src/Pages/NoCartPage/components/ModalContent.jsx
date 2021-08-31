import { useQuantitySelector, useAddToCart } from "./ModalContentLogic";

// Content of Modal in NoCartPage
export default function ModalContent(props) {
  const { content, cart, setCart, onClose } = props;

  // **** From ModalContentLogic ****

  const { numberOfProduct, incrementItem, decreaseItem } =
    useQuantitySelector();
  const { addToCart } = useAddToCart();

  // **** END ModalContentLogic ****

  // If the Product Category === "pizza", make options for size
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
              onClick={() => {
                onClose();
                addToCart(cart, setCart, content, numberOfProduct);
              }}
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
