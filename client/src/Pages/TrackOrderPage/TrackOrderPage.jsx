import Details from "../../shared components/Details";

export default function TrackOrderPage(props) {
  const { cart, totalPrice } = props;
  return (
    <>
      <h1>Track Order page</h1>
      <Details cart={cart} totalPrice={totalPrice} />
    </>
  );
}
