import NavBar from "../../shared components/NavBar";
import Cart from "./Cart";

export default function CartPage(props) {
  const { cart, setCart, totalPrice, cartAnimation, setNoCartAnimation } =
    props;

  return (
    <main className={`page ${cartAnimation}`}>
      <NavBar setAnimation={setNoCartAnimation} title={"Cosul tau"} to={"/"} />

      <Cart cart={cart} setCart={setCart} totalPrice={totalPrice} />
    </main>
  );
}
