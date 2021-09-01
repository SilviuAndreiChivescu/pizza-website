import Details from "../../shared components/Details";

export default function ReceiptPage(props) {
  const { cart, totalPrice } = props;
  return (
    <>
      <h1>Receipt page</h1>
      <Details cart={cart} totalPrice={totalPrice} />
    </>
  );
}
