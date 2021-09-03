import Details from "../../shared components/Details";
import NavBar from "../../shared components/NavBar";
import DeliveryDetails from "./DeliveryDetails";
import CustomButton from "./CustomButton";
import UserDetailsInputs from "./UserDetailsInputs";

export default function CheckoutPage(props) {
  const { pageState, setPageState, cart, totalPrice } = props;
  return (
    <>
      <NavBar
        title={"Aici dai comanda"}
        pageState={pageState}
        setPageState={setPageState}
      />
      <UserDetailsInputs setPageState={setPageState} />
      <DeliveryDetails />
      <Details title={"Comanda ta"} cart={cart} totalPrice={totalPrice} />
      <CustomButton
        title={"Plaseaza Comanda"}
        onClick={() => setPageState("Receipt")}
      />
    </>
  );
}
