import React, { useState, useEffect } from "react";

import {
  useProductsStates,
  useAddToProducts,
  useUpdateProducts,
  useDeleteProduct,
  useProductsList,
} from "./AdminLogic";

import { Col, Container, Form, Row, Button } from "react-bootstrap";

// TODO, MAKE THIS FILE A Admin.jsx FILE THAT LIVES IN ADMINPAGE.JSX WHERE I CAN PUT NAVBAR AS WELL
export default function AdminPage() {
  // Products States
  const { productsStates, setProductsStates } = useProductsStates();

  // Read from Products Collection
  const { productsList, setProductsList } = useProductsList();

  // Add to Products Collection
  const { addToProducts } = useAddToProducts(productsList, setProductsList);

  // Update Products Collection by id
  const { updateProducts, newProduct, setNewProduct } = useUpdateProducts();

  // Delete product from Products Collection by id
  const { deleteProduct } = useDeleteProduct();

  return (
    <Container className="text-center">
      <h1>Admin Page</h1>
      <br></br>

      <Row>
        <Col>
          <Form.Control
            placeholder="Product name"
            onChange={(event) => {
              setProductsStates({
                ...productsStates,
                name: event.target.value,
                // Making the name from 'Pizza Medieval' to 'pizza_medieval'
                imageUrl: event.target.value.toLowerCase().split(" ").join("_"),
              });
            }}
          />
        </Col>
        <Col>
          <Form.Control
            placeholder="Category"
            onChange={(event) => {
              setProductsStates({
                ...productsStates,
                category: event.target.value,
              });
            }}
          />
        </Col>
      </Row>

      <Row className="mt-2 mb-2">
        <Col>
          <Form.Control
            placeholder="Price"
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
          <Form.Control
            placeholder="ImageName"
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
      <Col>
        <Form.Control
          as="textarea"
          rows={4}
          placeholder="Description"
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
        onClick={() => addToProducts(productsStates)}
      >
        Add to List
      </Button>
      <h1>Products List</h1>

      {productsList.map((val, key) => {
        return (
          <div key={key}>
            <h1>
              {val.Name} for {val.Price}
            </h1>
            <input
              onChange={(event) =>
                setNewProduct({ ...newProduct, name: event.target.value })
              }
              type="text"
              placeholder="New product name"
            />
            <button onClick={() => updateProducts(val._id, newProduct)}>
              Update
            </button>
            <button onClick={() => deleteProduct(val._id)}>Delete</button>
          </div>
        );
      })}
    </Container>
  );
}
