import NavBar from "../../shared components/NavBar";
import Cart from "./Cart";

export default function CartPage(props) {
  const { pageState, setPageState, cart, setCart, totalPrice } = props;
  return (
    <>
      <NavBar
        title={"Cosul tau"}
        pageState={pageState}
        setPageState={setPageState}
      />
      <Cart
        cart={cart}
        setCart={setCart}
        totalPrice={totalPrice}
        setPageState={setPageState}
      />
    </>
  );
}
