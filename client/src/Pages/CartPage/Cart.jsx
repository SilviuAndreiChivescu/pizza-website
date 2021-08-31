import iconEmptyBasket from "../../images/iconEmptyBasket.svg";
import iconPizzaSharing from "../../images/iconPizzaSharing.svg";
import { usePostToOrders, useQuantitySelector } from "./CartLogic";

export default function Cart(props) {
  const { setPageState, cart, setCart, totalPrice } = props;
  return (
    <>
      <section className="container-fluid position-absolute h-100 w-100 overflow-hidden bg-white text-center">
        {/* The below div is only when cart is empty, when not empty, show what I will code with buttons and meal */}
        <div className="text-secondary border-bottom border-2 border-secondary">
          {cart.length === 0 ? <NoProductInCart /> : <ProductInCart />}
        </div>

        {cart.map((value) => {
          return <FoodBox cart={cart} setCart={setCart} value={value} />;
        })}

        <div className="mb-5 border-bottom border-2 border-secondary">
          <p className="fw-bold">Total: {totalPrice} lei</p>
        </div>
        <DeliveryHours cart={cart} setPageState={setPageState} />
      </section>
    </>
  );
}

// The next two components are used to return different UI for when Cart state is empty or not.
const NoProductInCart = () => {
  return (
    <>
      <img
        className="img-fluid mt-5"
        src={iconEmptyBasket}
        style={{ width: "70px" }}
      />
      <h5 className="mb-5">
        Adauga mancare gustoasa din meniu si apoi plaseaza comanda
      </h5>
    </>
  );
};
const ProductInCart = () => {
  return (
    <>
      <img
        className="img-fluid mt-5"
        src={iconPizzaSharing}
        style={{ width: "400px" }}
      />
    </>
  );
};

// This Component is the row for particular item. It has option to add or substract from quantity.
const FoodBox = (props) => {
  const { value, cart, setCart } = props;
  const { incrementItem, decreaseItem } = useQuantitySelector(
    cart,
    setCart,
    value
  );

  return (
    <div key={value._id} className="row container-fluid ">
      <div className="col d-inline-flex ps-0 justify-content-center pt-3">
        <p>{value.Quantity} X </p>
        <p className="ps-2 pe-2">{value.Name}</p>
        <div>
          <button
            onClick={() => {
              decreaseItem(value.Name);
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
              incrementItem(value.Name);
            }}
            className="border-1 border-dark bg-light rounded-end"
            style={{ width: "30px" }}
          >
            +
          </button>
        </div>
        <p className="ps-2 pe-2">{value.Price * value.Quantity} lei</p>
      </div>
    </div>
  );
};

// This function is to render the "Order" button depending on the time.
const DeliveryHours = (props) => {
  const { cart, setPageState } = props;

  const today = new Date();
  const time = today.getHours() + ":" + today.getMinutes();

  // Get from CartLogic function to post request to Orders collection
  const { submit } = usePostToOrders();

  // Closed
  if (time > "22:29" && time < "8:59") {
    return (
      <div className="mb-5 text-secondary">
        <h5>
          Momentan nu putem prelua comenzi. Va rugam reveniti zilnic in
          intervalul 09:00 - 22:30. Va multumim !
        </h5>
      </div>
    );
  }
  // Open
  else {
    return (
      <div className="container">
        <button onClick={() => submit(cart)}>Send to orders collection</button>
        <button
          onClick={() => setPageState("Checkout")}
          className="black-bg text-white border border-2 border-dark rounded p-2"
        >
          Comanda
        </button>
      </div>
    );
  }
};
