import { useState } from "react";
import {
  Col,
  Container,
  Form,
  Row,
  Button,
  Card,
  FormControl,
} from "react-bootstrap";
import {
  useFilteredProductsList,
  useDeleteProduct,
  useUpdateProducts,
} from "./ProductsListLogic";

export default function ProductsList(props) {
  const { productsList } = props;

  // Filter the list with search field
  const { filteredList, setFilter } = useFilteredProductsList(productsList);

  return (
    <Container className="text-center mt-5">
      <Row>
        <Card.Title className="fs-5 mb-3">
          Lista cu produse ( de la ultimul la primul )
        </Card.Title>
        <Form className="mb-2">
          <FormControl
            onChange={(e) => setFilter(e.target.value)}
            type="search"
            placeholder="Cauta un produs"
            aria-label="Search"
          />
        </Form>
        {filteredList.map((val) => {
          // List Component can be found below
          return <List val={val} key={val._id} />;
        })}
      </Row>
    </Container>
  );
}

const List = (props) => {
  const { val, key } = props;

  // Update Products Collection by id
  const { updateProducts, newProduct, setNewProduct } = useUpdateProducts(val);

  // Delete product from Products Collection by id
  const { deleteProduct } = useDeleteProduct();

  return (
    <>
      <Card className="mt-4 p-4" key={key}>
        <Card.Title className="fs-4">
          {val.Name} la{" "}
          {val.Price.length === 1
            ? `${val.Price} de lei`
            : `${val.Price[0]}, ${val.Price[1]}, ${val.Price[2]} de lei`}
        </Card.Title>

        <Card.Title>
          Scrie in campul pe care vrei sa il schimbi sau sterge produsul
        </Card.Title>
        <Card.Subtitle className="mt-2 mb-4">
          <strong>Atentie</strong> &nbsp; Daca ai adaugat doua dimensiuni la un
          produs si vrei sa o stergi pe ultima, va trebui sa stergi tot produsul
          si sa il introduci din nou. Ai grija sa nu mai introduci la cea de a 3
          a dimensiune daca produsul nu are 3 dimensiuni. Se aplica si pentru
          cea de a 2 a dimensiune!
        </Card.Subtitle>
        <Row>
          <Col>
            <Form.Label>Noul nume al produsului</Form.Label>
            <Form.Control
              placeholder="Nume nou"
              value={newProduct.name}
              onChange={(event) => {
                setNewProduct({
                  ...newProduct,
                  name: event.target.value,
                  // Making the image name from 'Pizza Medieval' to 'pizza_medieval'
                  imageUrl: event.target.value
                    .toLowerCase()
                    .split(" ")
                    .join("_"),
                });
              }}
            />
          </Col>
          <Col>
            <Form.Label>
              Categoria noua a produsului ( pizza, burgers, chifle, sandwich,
              drinks )
            </Form.Label>
            <Form.Control
              placeholder="Categoria noua"
              value={newProduct.category}
              onChange={(event) => {
                setNewProduct({
                  ...newProduct,
                  category: event.target.value,
                });
              }}
            />
          </Col>
        </Row>

        <Row className="mt-2 mb-2">
          <Col>
            <Form.Label>Noul pret pentru prima / singura dimensiune</Form.Label>
            <Form.Control
              placeholder="Pretul nou"
              type="number"
              value={newProduct.price}
              onChange={(event) => {
                setNewProduct({
                  ...newProduct,
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
              placeholder="Imagine noua"
              value={newProduct.imageUrl}
              onChange={(event) => {
                setNewProduct({
                  ...newProduct,
                  imageUrl: event.target.value,
                });
              }}
            />
          </Col>
        </Row>
        <Row className="mb-2">
          <Col>
            <Form.Label>Noul pret pentru a doua dimensiune</Form.Label>
            <Form.Control
              placeholder="Pretul 2 ( numar )"
              type="number"
              value={newProduct.price2}
              onChange={(event) => {
                setNewProduct({
                  ...newProduct,
                  price2: event.target.value,
                });
              }}
            />
          </Col>
          <Col>
            <Form.Label>Noul pret pentru a treia dimensiune</Form.Label>
            <Form.Control
              placeholder="Pretul 3 ( numar )"
              type="number"
              value={newProduct.price3}
              onChange={(event) => {
                setNewProduct({
                  ...newProduct,
                  price3: event.target.value,
                });
              }}
            />
          </Col>
        </Row>
        <Col>
          <Form.Label>Noua descrierea a produsului</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            placeholder="Descriere noua"
            value={newProduct.description}
            onChange={(event) => {
              setNewProduct({
                ...newProduct,
                description: event.target.value,
              });
            }}
          />
        </Col>
        <Row className="mt-4 mb-3">
          <Col>
            <Button
              variant="outline-dark"
              onClick={() => {
                updateProducts(val._id, newProduct);
                window.location.reload();
              }}
            >
              Schimba produsul
            </Button>
          </Col>
          <Col>
            <Button
              variant="danger"
              onClick={() => {
                deleteProduct(val._id);
                window.location.reload();
              }}
            >
              Sterge produsul
            </Button>
          </Col>
        </Row>
      </Card>
    </>
  );
};
