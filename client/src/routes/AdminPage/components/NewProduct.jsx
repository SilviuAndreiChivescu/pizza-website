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
      <Card.Title className="mt-4">Adauga un produs nou</Card.Title>
      <Card.Subtitle className="mt-4">
        Daca produsul are mai multe dimensiuni, dimensiunile vor fi setate in
        lista de produse de mai jos dupa ce adaugati produsul cu pretul pentru
        prima dimensiune
      </Card.Subtitle>
      <Row className="mt-4 ">
        <Col>
          <Form.Label>Numele produsului</Form.Label>
          <Form.Control
            placeholder="Pizza Medieval"
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
          <Form.Label>
            Categoria produsului ( pizza, burgers, chifle, sandwich, drinks )
          </Form.Label>
          <Form.Control
            placeholder="pizza"
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
          <Form.Label>Pretul pentru prima / singura dimensiune</Form.Label>
          <Form.Control
            placeholder="Exemplu: 20"
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
            Numele imaginii pentru produs (se va completa automat).
          </Form.Label>
          <Form.Control
            placeholder="Numele imaginii"
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
        <Form.Label>Descrierea produsului</Form.Label>
        <Form.Control
          as="textarea"
          rows={4}
          placeholder="Margine de cascaval etc."
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
        Adauga noul produsul
      </Button>
    </Container>
  );
}
