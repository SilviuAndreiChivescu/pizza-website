import Details from "../../shared components/Details";
import NavBar from "../../shared components/NavBar";
import DeliveryDetails from "./DeliveryDetails";
import CustomButton from "./CustomButton";
import UserDetailsInputs from "../../shared components/UserDetailsInputs";

export default function CheckoutPage(props) {
  const {
    pageState,
    setPageState,
    cart,
    setCart,
    totalPrice,
    setLastOrder,
    setLastOrderTime,
  } = props;
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
        onClick={() => {
          setLastOrder(cart);
          setCart([]);
          setPageState("Receipt");
          setLastOrderTime(getCurrentDate("/"));
        }}
      />
    </>
  );
}

function getCurrentDate(separator = " ") {
  let newDate = new Date();
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();

  // return `${year}${separator}${
  //   month < 10 ? `0${month}` : `${month}`
  // }${separator}${date}`;
  return `${date}${separator}${month}${separator}${year}`;
}
