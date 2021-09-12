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
        {/* INCEARCA AICI GEN UNDE UNDE AI BOTTOM, SA PUI SI LEFT SI RIGHT OLEACA, CA SA NU MAI FIE FULL WIDTH */}
        <Row>
          <Col>
            <h3>
              <FaShoppingBag
                style={{ marginBottom: "0.85vh", marginRight: "0.3vw" }}
              />
              {totalQuantity}
            </h3>
          </Col>
          <Col className="text-center">
            <h3>Vezi cosul tau</h3>
          </Col>
          <Col className="text-end">
            <h3>{totalPrice} lei</h3>
          </Col>
        </Row>
      </Container>
    </Link>
  );
}
