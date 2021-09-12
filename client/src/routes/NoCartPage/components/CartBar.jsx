import { Col, Container, Navbar, Row } from "react-bootstrap";
import { FaShoppingBag } from "react-icons/fa";
import { Link } from "react-router-dom";

// The cart bar at the bottom of the page.
export default function CartBar(props) {
  const { totalQuantity, totalPrice } = props;
  return (
    <Link style={{ textDecoration: "none" }} to="/cart">
      <Container
        fluid
        className="position-fixed bottom-0 text-white pt-2 black-bg"
      >
        <Row>
          <Col>
            <h4>
              <FaShoppingBag
                style={{ marginBottom: "0.85vh", marginRight: "0.8vw" }}
              />
              {totalQuantity}
            </h4>
          </Col>
          <Col className="text-center">
            <h4>Vezi cosul tau</h4>
          </Col>
          <Col className="text-end">
            <h4>{totalPrice} lei</h4>
          </Col>
        </Row>
      </Container>
    </Link>
  );
}
