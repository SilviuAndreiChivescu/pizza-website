import NavBar from "../../shared components/NavBar";
import Cart from "./Cart";

export default function CartPage(props) {
  const { cart, setCart, totalPrice } = props;
  return (
    <main className="page">
      <NavBar title={"Cosul tau"} to={"/"} />
      <Cart cart={cart} setCart={setCart} totalPrice={totalPrice} />
    </main>
  );
}
