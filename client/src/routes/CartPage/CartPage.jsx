import MyNavbar from "../../shared components/MyNavbar";
import Cart from "./Cart";

export default function CartPage(props) {
  const { cart, setCart, totalPrice, cartAnimation, setNoCartAnimation } =
    props;

  return (
    <main className={`${cartAnimation}`}>
      <MyNavbar
        setAnimation={setNoCartAnimation}
        title={"Your cart"}
        to={"/"}
      />

      <Cart cart={cart} setCart={setCart} totalPrice={totalPrice} />
    </main>
  );
}
