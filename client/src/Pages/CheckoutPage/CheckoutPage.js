import NavBar from "../../shared components/NavBar";
import Checkout from "./Checkout";

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
