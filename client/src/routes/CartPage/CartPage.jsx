import NavBar from "../../shared components/NavBar";
import Cart from "./Cart";

// AM RAMAS AICI, SA FAC UI SI ALEA
// GEN TREBUIE SA PUN SI TOATE CAP LA CAP, DE EX NAVBAR UNDE NU AM SI ASA, VEZI DACA PE NOCARTPAGE MAI TRB CEVA CA AM TRECUT
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
