export default function Details(props) {
  const { cart, totalPrice } = props;
  return (
    <div>
      {cart.map((value) => {
        return <DetailsRow value={value} totalPrice={totalPrice} />;
      })}
      <h1>{totalPrice}</h1>
    </div>
  );
}

const DetailsRow = (props) => {
  const { value } = props;
  return (
    <div key={value._id}>
      <p>{value.Quantity} X </p>
      <p>{value.Name}</p>
      <p>{value.Price * value.Quantity} lei</p>
    </div>
  );
};
