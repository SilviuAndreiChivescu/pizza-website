import Form from "react-bootstrap/Form";
import { Col, Row } from "react-bootstrap";
import { useState } from "react";

export default function DeliveryDetails() {
  // useState for if the user decides to choose a time to get his food
  const [time, setTime] = useState(false);
  // This component will render if time is ture
  const ChooseHour = () => {
    return (
      <Form.Group controlId="formGridFirstName">
        <Form.Control type="time" />
      </Form.Group>
    );
  };
  return (
    <fieldset>
      <Form.Label as="legend" column sm={2}>
        Cand se va face livrarea? *
      </Form.Label>
      <Form.Group
        onChange={() => setTime((time) => !time)}
        as={Row}
        className="mb-3"
      >
        <Col sm={10}>
          <Form.Check
            type="radio"
            label="Cat mai repede"
            name="deliveryTime"
            id="repede"
          />
          <Form.Check
            type="radio"
            label="Alege ora"
            name="deliveryTime"
            id="alege"
          />
        </Col>
      </Form.Group>
      {time ? <ChooseHour /> : null}
      <Form.Label as="legend" column sm={2}>
        Metoda de livrare *
      </Form.Label>
      <Form.Group as={Row} className="mb-3">
        <Col sm={10}>
          <Form.Check
            type="radio"
            label="Livrare la domiciliu"
            name="delivery"
            id="repede"
          />
          <Form.Check
            type="radio"
            label="Ridicare personala"
            name="delivery"
            id="alege"
          />
        </Col>
        <Form.Group className="mb-3" id="formGridCheckbox">
          <Form.Check
            type="checkbox"
            label="Pastreaza-mi datele pentru urmatoarea comanda"
          />
        </Form.Group>
        <Form.Group className="mb-3" id="formGridCheckbox">
          <Form.Check
            type="checkbox"
            label="Confirm ca am citit Termenii si conditiile care contin toate informatiile referitoare la modul de procesare a datelor cu carater personal necesare pentru procesarea si executarea comenzilor si declar ca sunt de acord cu acesti termeni si conditii. In cazul comenzilor nelivrate, suma va fi returnata pe acelasi card utilizat la tranzactionare, in decurs de 14 zile de la acceptarea returului, in functie de banca emitenta a cardului. *"
          />
        </Form.Group>
      </Form.Group>
    </fieldset>
  );
}
