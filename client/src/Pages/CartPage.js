import NavBar from "../components/NavBar";
import CartOpen from "../components/CartOpen";

export default function CartPage(props) {
  const { pageState, setPageState, cart, setCart, totalPrice } = props;
  return (
    <>
      <NavBar
        title={"Cosul tau"}
        pageState={pageState}
        setPageState={setPageState}
      />
      <CartOpen
        cart={cart}
        setCart={(e) => setCart(e)}
        totalPrice={totalPrice}
        setPageState={setPageState}
      />
    </>
  );
}
