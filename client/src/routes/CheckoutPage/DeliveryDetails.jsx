import Form from "react-bootstrap/Form";
import { Col, Container, Row } from "react-bootstrap";
import { useState } from "react";

export default function DeliveryDetails(props) {
  const { setDeliveryDetailsStates, deliveryDetailsStates } = props;
  // useState for if the user decides to choose a time to get his food
  const [time, setTime] = useState(false);

  return (
    <Container className="mb-4">
      <Form.Label as="legend" column sm={2}>
        Delivery time *
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
            label="ASAP"
            name="deliveryTime"
            value="ASAP"
            id="ASAP"
            required
          />
          <Form.Check
            onChange={() => {
              setTime(true);
              setDeliveryDetailsStates({
                ...deliveryDetailsStates,
                deliveryTime: "",
              });
            }}
            type="radio"
            label="Choose time"
            name="deliveryTime"
            id="choose"
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
              required
              placeholder="Exemple: 16:30"
            />
          ) : null}
        </Col>
      </Form.Group>

      <Form.Label as="legend" column sm={2}>
        Delivery / Pick-up *
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
            label="Delivery"
            name="deliveryWay"
            value="Delivery"
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
            label="Personal Pick-up"
            name="deliveryWay"
            value="Personal Pick-up"
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
            label="Keep my data for next orders"
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
            label="I agree to the Terms and Conditions... *"
            required
          />
        </Col>
      </Form.Group>
    </Container>
  );
}
