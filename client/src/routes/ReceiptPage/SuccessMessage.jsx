import { Card, Container } from "react-bootstrap";
import { ImCheckboxChecked } from "react-icons/im";

// AM RAMAS AICI, FACEAM SI EU FRUMOS CU UN ICON SI UN MESAJ CA A FOST ORDERUITA CU SUCCESS
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
