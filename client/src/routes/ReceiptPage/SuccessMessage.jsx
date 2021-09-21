import { Card, Container } from "react-bootstrap";
import { ImCheckboxChecked } from "react-icons/im";

export default function SuccessMessage() {
  return (
    <Container className="text-center mt-4">
      <ImCheckboxChecked size={"6em"} />
      <Card.Title className="mt-4">
        Congratulations! Your order has been placed.
      </Card.Title>
    </Container>
  );
}
