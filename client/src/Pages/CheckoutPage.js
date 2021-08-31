import NavBar from "../components/NavBar";
import Checkout from "../components/Checkout";

export default function CheckoutPage(props) {
  const { pageState, setPageState } = props;
  return (
    <>
      <NavBar
        title={"Aici dai comanda"}
        pageState={pageState}
        setPageState={setPageState}
      />
      <Checkout />
    </>
  );
}
