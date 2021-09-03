// This component is shared by ReceiptPage and TrackOrderPage and CheckoutPage

import { Card } from "react-bootstrap";

export default function Details(props) {
  const { cart, totalPrice, title } = props;
  return (
    <div>
      <Card>
        <Card.Title>{title}</Card.Title>
        {cart.map((value) => {
          return <DetailsRow value={value} totalPrice={totalPrice} />;
        })}
        <Card.Body>Total: {totalPrice} lei</Card.Body>
      </Card>
    </div>
  );
}

const DetailsRow = (props) => {
  const { value } = props;
  return (
    <Card.Body>
      {value.Quantity} X {value.Name} {value.Price * value.Quantity} lei
    </Card.Body>
  );
};