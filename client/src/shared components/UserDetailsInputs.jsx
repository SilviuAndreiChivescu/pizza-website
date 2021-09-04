import Form from "react-bootstrap/Form";
import { Col, Row } from "react-bootstrap";

export default function UserDetailsInputs(props) {
  const {
    readOnly,
    setFirstName,
    setLastName,
    setEmail,
    setPhoneNo,
    setAddress,
    setCity,
  } = props;
  return (
    <>
      <Form className={"m-5"}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridLastName">
            <Form.Label>Nume *</Form.Label>
            <Form.Control onChange={(e) => setFirstName(e.target.value)} />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridFirstName">
            <Form.Label>Prenume *</Form.Label>
            <Form.Control onChange={(e) => setLastName(e.target.value)} />
          </Form.Group>
        </Row>
        <Row className="mb-e">
          <Form.Group as={Col} controlId="formGridPhone">
            <Form.Label>Email *</Form.Label>
            <Form.Control
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              readOnly={readOnly}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridPhone">
            <Form.Label>Telefon *</Form.Label>
            <Form.Control
              onChange={(e) => setPhoneNo(e.target.value)}
              type="tel"
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} className="mb-3" controlId="formGridAddress1">
            <Form.Label>Adresa *</Form.Label>
            <Form.Control
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Nume strada, numar etc."
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>Oras *</Form.Label>
            <Form.Control onChange={(e) => setCity(e.target.value)} />
          </Form.Group>
        </Row>
        {props.children}
      </Form>
    </>
  );
}
