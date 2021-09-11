import NavBar from "../../shared components/NavBar";
import Cart from "./Cart";

export default function CartPage(props) {
  const { setPageState, cart, setCart, totalPrice } = props;
  return (
    <>
      <NavBar title={"Cosul tau"} setPageState={setPageState} to={"NoCart"} />
      <Cart
        cart={cart}
        setCart={setCart}
        totalPrice={totalPrice}
        setPageState={setPageState}
      />
    </>
  );
}
