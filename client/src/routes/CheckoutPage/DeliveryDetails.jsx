import Form from "react-bootstrap/Form";
import { Col, Container, Row } from "react-bootstrap";
import { useState } from "react";
import Feedback from "react-bootstrap/esm/Feedback";

export default function DeliveryDetails(props) {
  const { setDeliveryDetailsStates, deliveryDetailsStates } = props;
  // useState for if the user decides to choose a time to get his food
  const [time, setTime] = useState(false);

  return (
    <Container className="mb-4">
      <Form.Label as="legend" column sm={2}>
        Cand se va face livrarea? *
      </Form.Label>
      <Form.Group as={Row} className="mb-3">
        <Col>
          <Form.Check
            onClick={(e) => {
              setTime(false);
              setDeliveryDetailsStates({
                ...deliveryDetailsStates,
                deliveryTime: e.target.value,
              });
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
              onChange={(e) =>
                setDeliveryDetailsStates({
                  ...deliveryDetailsStates,
                  deliveryTime: e.target.value,
                })
              }
              placeholder="Exemplu: 16:30"
            />
          ) : null}
        </Col>
      </Form.Group>

      <Form.Label as="legend" column sm={2}>
        Metoda de livrare *
      </Form.Label>
      <Form.Group as={Row} className="mb-3">
        <Col>
          <Form.Check
            onChange={(e) =>
              setDeliveryDetailsStates({
                ...deliveryDetailsStates,
                deliveryWay: e.target.value,
              })
            }
            type="radio"
            label="Livrare la domiciliu"
            name="deliveryWay"
            value="Livrare la domiciliu"
            id="homeOrder"
            required
          />
          <Form.Check
            onChange={(e) =>
              setDeliveryDetailsStates({
                ...deliveryDetailsStates,
                deliveryWay: e.target.value,
              })
            }
            type="radio"
            label="Ridicare personala"
            name="deliveryWay"
            value="Ridicare personala"
            id="pickUp"
            required
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Col>
          <Form.Check
            onClick={() =>
              setDeliveryDetailsStates({
                ...deliveryDetailsStates,
                keepData: !deliveryDetailsStates.keepData,
              })
            }
            type="checkbox"
            id="data"
            name="keepData"
            label="Pastreaza-mi datele pentru urmatoarea comanda"
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Col>
          <Form.Check
            onClick={() =>
              setDeliveryDetailsStates({
                ...deliveryDetailsStates,
                terms: !deliveryDetailsStates.terms,
              })
            }
            type="checkbox"
            id="confirm"
            name="terms"
            label="Confirm ca am citit Termenii si conditiile care contin toate informatiile referitoare la modul de procesare a datelor cu carater personal necesare pentru procesarea si executarea comenzilor si declar ca sunt de acord cu acesti termeni si conditii. *"
            required
          />
        </Col>
      </Form.Group>
    </Container>
  );
}
