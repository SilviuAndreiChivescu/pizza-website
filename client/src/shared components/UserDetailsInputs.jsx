import Form from "react-bootstrap/Form";
import { Col, Container, Row } from "react-bootstrap";

export default function UserDetailsInputs(props) {
  const { readOnly, userDetailsStates, setUserDetailsStates } = props;

  return (
    <Container>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridLastName">
          <Form.Label>First Name *</Form.Label>
          <Form.Control
            value={
              userDetailsStates.firstName ? userDetailsStates.firstName : ""
            }
            onChange={(e) =>
              setUserDetailsStates({
                ...userDetailsStates,
                firstName: e.target.value,
              })
            }
            required
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridFirstName">
          <Form.Label>Last Name *</Form.Label>
          <Form.Control
            value={userDetailsStates.lastName ? userDetailsStates.lastName : ""}
            onChange={(e) =>
              setUserDetailsStates({
                ...userDetailsStates,
                lastName: e.target.value,
              })
            }
            required
          />
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridPhone">
          <Form.Label>Email *</Form.Label>
          <Form.Control
            value={userDetailsStates.email ? userDetailsStates.email : ""}
            onChange={(e) =>
              setUserDetailsStates({
                ...userDetailsStates,
                email: e.target.value,
              })
            }
            type="email"
            readOnly={readOnly}
            required
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridPhone">
          <Form.Label>Mobile *</Form.Label>
          <Form.Control
            value={userDetailsStates.phoneNo ? userDetailsStates.phoneNo : ""}
            onChange={(e) =>
              setUserDetailsStates({
                ...userDetailsStates,
                phoneNo: e.target.value,
              })
            }
            type="tel"
            required
          />
        </Form.Group>
      </Row>

      <Row>
        <Form.Group as={Col} className="mb-3" controlId="formGridAddress1">
          <Form.Label>Delivery Address *</Form.Label>
          <Form.Control
            value={userDetailsStates.address ? userDetailsStates.address : ""}
            onChange={(e) =>
              setUserDetailsStates({
                ...userDetailsStates,
                address: e.target.value,
              })
            }
            placeholder="Street, city ..."
            required
          />
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>City *</Form.Label>
          <Form.Control
            value={userDetailsStates.city ? userDetailsStates.city : ""}
            onChange={(e) =>
              setUserDetailsStates({
                ...userDetailsStates,
                city: e.target.value,
              })
            }
            required
          />
        </Form.Group>
      </Row>
      {props.children}
    </Container>
  );
}
