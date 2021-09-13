// This component is shared by ReceiptPage and TrackOrderPage and CheckoutPage

import { Card, Container } from "react-bootstrap";

export default function Details(props) {
  const { cart, totalPrice, title } = props;
  return (
    <Container>
      <Card className={"m-3 p-3"}>
        <Card.Title>{title}</Card.Title>
        {props.children}
        {cart.map((value) => {
          return <DetailsRow value={value} totalPrice={totalPrice} />;
        })}
        <Card.Body className="fs-5">
          <strong>Total:</strong> {totalPrice} lei
        </Card.Body>
      </Card>
    </Container>
  );
}

const DetailsRow = (props) => {
  const { value } = props;
  return (
    <Card.Body>
      {value.Quantity} &nbsp; X &nbsp;{value.Name} &nbsp; {value.Price} lei /
      buc
    </Card.Body>
  );
};
