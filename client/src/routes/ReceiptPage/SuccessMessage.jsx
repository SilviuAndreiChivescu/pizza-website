import { Card, Container } from "react-bootstrap";
import { ImCheckboxChecked } from "react-icons/im";

export default function SuccessMessage() {
  return (
    <Container className="text-center mt-4">
      <ImCheckboxChecked size={"6em"} />
      <Card.Title className="mt-4">
        Felicitari! Comanda a fost efectuata cu succes.
      </Card.Title>
    </Container>
  );
}
