import Form from "react-bootstrap/Form";
import { Col, Row } from "react-bootstrap";
import { useState } from "react";

export default function DeliveryDetails(props) {
  const { setDeliveryWay, setDeliveryTime, setKeepData } = props;
  // useState for if the user decides to choose a time to get his food
  const [time, setTime] = useState(false);
  //AICI AM RAMAS, INCERCAM SA FAC INPUTURILE REQUIRED GEN, SI NU MERGE DOAR SA PUN REQUIRED PE CONTROL FORMS, TREBUIE PROBABIL SA FAC TOT FORMU UN COPIL, EU MOMENTAN AM MAI MULTE FORMURI SI BUTONU IN AFARA GEN, FA IN CHECKOUT PAGE FORMU SI BAGA CA CHILDREN TOATE ASTEA, VEZI AT
  return (
    <>
      <Form.Label as="legend" column sm={2}>
        Cand se va face livrarea? *
      </Form.Label>
      <Form.Group required as={Row} className="mb-3">
        <Col sm={10}>
          <Form.Check
            onClick={(e) => {
              setTime(false);
              setDeliveryTime(e.target.value);
            }}
            type="radio"
            label="Cat mai repede"
            name="deliveryTime"
            value="Cat mai repede"
            id="repede"
            required
          />
          <Form.Check
            onChange={() => setTime(true)}
            type="radio"
            label="Alege ora"
            name="deliveryTime"
            id="alege"
            required
          />
          {time ? (
            <Form.Control
              onChange={(e) => setDeliveryTime(e.target.value)}
              placeholder="Exemplu: 16:30"
              required
            />
          ) : null}
        </Col>
      </Form.Group>

      <Form.Label as="legend" column sm={2}>
        Metoda de livrare *
      </Form.Label>
      <Form.Group as={Row} className="mb-3">
        <Col sm={10}>
          <Form.Check
            onChange={(e) => setDeliveryWay(e.target.value)}
            type="radio"
            label="Livrare la domiciliu"
            name="deliveryWay"
            value="Livrare la domiciliu"
            id="homeOrder"
            required
          />
          <Form.Check
            onChange={(e) => setDeliveryWay(e.target.value)}
            type="radio"
            label="Ridicare personala"
            name="deliveryWay"
            value="Ridicare personala"
            id="pickUp"
            required
          />
        </Col>
        <Form.Group className="mb-3" id="formGridCheckbox">
          <Form.Check
            onClick={() => setKeepData((data) => !data)}
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
    </>
  );
}
