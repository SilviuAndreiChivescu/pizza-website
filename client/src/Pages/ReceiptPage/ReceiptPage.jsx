import Details from "./Details";

export default function ReceiptPage(props) {
  const { cart, totalPrice } = props;
  return (
    <>
      <Details cart={cart} totalPrice={totalPrice} />
    </>
  );
}
