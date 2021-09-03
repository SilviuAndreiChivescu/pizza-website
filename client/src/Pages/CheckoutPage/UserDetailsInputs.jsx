import { useState } from "react";
import Form from "react-bootstrap/Form";
import { Col, Row, Button } from "react-bootstrap";

export default function UserDetailsInputs(props) {
  return (
    <>
      <Form className={"m-5"}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridLastName">
            <Form.Label>Nume *</Form.Label>
            <Form.Control />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridFirstName">
            <Form.Label>Prenume *</Form.Label>
            <Form.Control />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridPhone">
            <Form.Label>Email *</Form.Label>
            <Form.Control type="email" />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridPhone">
            <Form.Label>Telefon *</Form.Label>
            <Form.Control type="tel" />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} className="mb-3" controlId="formGridAddress1">
            <Form.Label>Adresa *</Form.Label>
            <Form.Control placeholder="Nume strada, numar etc." />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>Oras *</Form.Label>
            <Form.Control />
          </Form.Group>
        </Row>
      </Form>
    </>
  );
}
