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
import MyButton from "../../../shared components/MyButton";
import { useQuantitySelector, useHandleSubmit } from "./ModalContentLogic";

// Content of Modal in NoCartPage
export default function ModalContent(props) {
  const { content, cart, setCart, onClose } = props;

  // **** From ModalContentLogic ****

  const { quantity, incrementItem, decreaseItem } = useQuantitySelector();
  const { handleSubmit } = useHandleSubmit();

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
                checked={size == Object.values(e)}
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

  return (
    <Container fluid="xs">
      <Card>
        <Card.Img variant="top" src={`images/${content.Image}.jpg`} />
        <Card.Body>
          <Card.Title>{content.Price[size]} lei </Card.Title>
          <Card.Subtitle className="mb-3">{content.Description}</Card.Subtitle>

          {/* Render sizes for pizza only if content is pizza and particular pizza has multiple sizes */}
          {content.Category === "pizza" && content.Price[1] ? (
            <PizzaSize setSize={setSize} />
          ) : null}
          <Card.Text>
            Other info (optional):{" "}
            <FormControl
              onChange={(e) => setSpecifics(e.target.value)}
              placeholder="Exemple: Hot Ketchup"
            />
          </Card.Text>
          <Row className="justify-content-center">
            <Col xs="auto" sm="auto" md="auto" lg="auto" xl="auto" xxl="auto">
              <Button
                onClick={() => decreaseItem()}
                variant="outline-dark"
                className="fontSize"
              >
                -
              </Button>
              <Button disabled variant="outline-dark" className="fontSize">
                {quantity}
              </Button>
              <Button
                onClick={() => incrementItem()}
                variant="outline-dark"
                className="fontSize"
              >
                +
              </Button>
            </Col>
            <Col xs="auto" sm="auto" md="auto" lg="auto" xl="auto" xxl="auto">
              <MyButton
                className="fontSize"
                title="Adauga in cos"
                onClick={() =>
                  handleSubmit(
                    onClose,
                    cart,
                    setCart,
                    content,
                    quantity,
                    content.Price[size],
                    sizeName,
                    specifics
                  )
                }
              />
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}
