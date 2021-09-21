import { Card, Row, Col, Form, Button, Container } from "react-bootstrap";
import { useAddToProducts, useProductsStates } from "./NewProductLogic";

export default function NewProduct(props) {
  const { productsList, setProductsList } = props;

  // Products States
  const { productsStates, setProductsStates } = useProductsStates();

  // Add to Products Collection
  const { addToProducts } = useAddToProducts();

  return (
    <Container className="text-center">
      <Card.Title className="mt-4">Add a new product</Card.Title>
      <Card.Subtitle className="mt-4">
        If the product has multiple sizes, the sizes have to be set in the
        products list below after you add the product with price for first size
      </Card.Subtitle>
      <Row className="mt-4 ">
        <Col>
          <Form.Label>Name of product</Form.Label>
          <Form.Control
            onChange={(event) => {
              setProductsStates({
                ...productsStates,
                name: event.target.value,
                // Making the image name from 'Pizza Medieval' to 'pizza_medieval'
                imageUrl: event.target.value.toLowerCase().split(" ").join("_"),
              });
            }}
          />
        </Col>
        <Col>
          <Form.Label>Category</Form.Label>
          <Form.Control
            onChange={(event) => {
              setProductsStates({
                ...productsStates,
                category: event.target.value,
              });
            }}
          />
        </Col>
      </Row>

      <Row className="mt-2 mb-2 ">
        <Col>
          <Form.Label>Price for only / small size</Form.Label>
          <Form.Control
            placeholder="Example: 20"
            type="number"
            onChange={(event) => {
              setProductsStates({
                ...productsStates,
                price: event.target.value,
              });
            }}
          />
        </Col>
        <Col>
          <Form.Label>
            Image's name (autocomplete from Product's name).
          </Form.Label>
          <Form.Control
            value={productsStates.imageUrl}
            onChange={(event) => {
              setProductsStates({
                ...productsStates,
                imageUrl: event.target.value,
              });
            }}
          />
        </Col>
      </Row>

      <Col className="">
        <Form.Label>Product's description</Form.Label>
        <Form.Control
          as="textarea"
          rows={4}
          onChange={(event) => {
            setProductsStates({
              ...productsStates,
              description: event.target.value,
            });
          }}
        />
      </Col>

      <Button
        className="mt-3"
        variant="outline-dark"
        onClick={() => {
          addToProducts(productsStates, productsList, setProductsList);
          window.location.reload();
        }}
      >
        Add the new product
      </Button>
    </Container>
  );
}
