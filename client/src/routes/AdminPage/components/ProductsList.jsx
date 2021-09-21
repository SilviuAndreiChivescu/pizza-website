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
          Products list ( from last to first )
        </Card.Title>
        <Form className="mb-2">
          <FormControl
            onChange={(e) => setFilter(e.target.value)}
            type="search"
            placeholder="Search for a product"
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
          {val.Name} for{" "}
          {val.Price.length === 1
            ? `${val.Price} £`
            : `${val.Price[0]}, ${val.Price[1]}, ${val.Price[2]} £`}
        </Card.Title>

        <Card.Title>
          Write in the field that you want to change or delete the product
        </Card.Title>
        <Card.Subtitle className="mt-2 mb-4">
          <strong>Warning:</strong> &nbsp; If you have added another 2 sizes for
          a product and you want to delete the last one, you will have to delete
          the product and add it again. Same goes for 2 sizes.
        </Card.Subtitle>
        <Row>
          <Col>
            <Form.Label>New name</Form.Label>
            <Form.Control
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
            <Form.Label>New category</Form.Label>
            <Form.Control
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
            <Form.Label>New price for first size</Form.Label>
            <Form.Control
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
              Image's name (autocomplete from Product's name).
            </Form.Label>
            <Form.Control
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
            <Form.Label>New price for second size</Form.Label>
            <Form.Control
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
            <Form.Label>New price for third size</Form.Label>
            <Form.Control
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
          <Form.Label>New description</Form.Label>
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
              Change the product
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
              Delete the product
            </Button>
          </Col>
        </Row>
      </Card>
    </>
  );
};
