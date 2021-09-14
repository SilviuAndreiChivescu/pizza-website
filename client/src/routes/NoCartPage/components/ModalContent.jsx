import { useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  FormControl,
  Row,
} from "react-bootstrap";
import CustomButton from "../../../shared components/CustomButton";
import { useQuantitySelector, useAddToCart } from "./ModalContentLogic";

// Content of Modal in NoCartPage
export default function ModalContent(props) {
  const { content, cart, setCart, onClose } = props;

  // **** From ModalContentLogic ****

  const { quantity, incrementItem, decreaseItem } = useQuantitySelector();
  const { addToCart } = useAddToCart();

  // **** END ModalContentLogic ****

  // State for Pizza's sizes
  const [size, setSize] = useState("0");
  const [sizeName, setSizeName] = useState("");

  // State for specifics for product
  const [specifics, setSpecifics] = useState("");

  // If the Product Category === "pizza", make options for size
  const PizzaSize = () => {
    // This Array is used to set size for pizza and to keep the checked value for the <Form.Check />
    const values = [{ Mica: "0" }, { Medie: "1" }, { Mare: "2" }];
    return (
      <Form.Group className="mb-3">
        {values.map((e) => {
          return (
            <main key={Object.values(e)}>
              <Form.Check
                type="radio"
                name="pizzaSize"
                label={Object.keys(e)}
                id={Object.keys(e)}
                value={Object.values(e)}
                checked={size == Object.values(e)} // using "==" instead of "===" because this is the only way it works. (I belive because values array has objects in it and it points to object value)
                onChange={(e) => {
                  setSize(e.currentTarget.value);
                  setSizeName(e.currentTarget.id);
                }}
              />
            </main>
          );
        })}
      </Form.Group>
    );
  };

  const handleSubmit = () => {
    onClose();
    addToCart(
      cart,
      setCart,
      content,
      quantity,
      content.Price[size],
      sizeName,
      specifics
    );
  };

  return (
    <Container>
      <Card>
        <Card.Img
          variant="top"
          src="https:medievalpizza.com\/wp-content\/uploads\/2021\/04\/341-1-scaled.jpg"
        />
        <Card.Body>
          <Card.Title>{content.Price[size]} lei </Card.Title>
          <Card.Subtitle> {content.Description} </Card.Subtitle>
          {content.Category === "pizza" ? (
            <PizzaSize setSize={setSize} />
          ) : null}
          <Card.Text>
            Alte informatii (optional):{" "}
            <FormControl
              onChange={(e) => setSpecifics(e.target.value)}
              placeholder="Exemplu: Fara ardei"
            />
          </Card.Text>
          <Row className="justify-content-md-center" sm={2} lg={2}>
            <Col xs lg="3">
              <Button
                size="lg"
                onClick={() => decreaseItem()}
                variant="outline-dark"
              >
                -
              </Button>
              <Button size="lg" disabled variant="outline-dark">
                {quantity}
              </Button>
              <Button
                size="lg"
                onClick={() => incrementItem()}
                variant="outline-dark"
              >
                +
              </Button>
            </Col>
            <Col xs lg="4">
              <CustomButton
                title="Adauga in cos"
                onClick={() => handleSubmit()}
              />
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}
