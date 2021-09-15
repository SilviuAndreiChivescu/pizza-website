import { Col, Container, Row } from "react-bootstrap";
import { FaShoppingBag } from "react-icons/fa";
import { Link } from "react-router-dom";

// The cart bar from the bottom of the page.
export default function CartBar(props) {
  const { totalQuantity, totalPrice, setCartAnimation } = props;
  return (
    <Link
      onClick={() => setCartAnimation("slide-in-bottom")}
      style={{ textDecoration: "none" }}
      to="/cart"
    >
      <Container
        fluid
        className="position-sticky bottom-0 text-white pt-2 black-bg"
      >
        <Row>
          <Col>
            <h4>
              <FaShoppingBag style={{ marginBottom: "0.85vh" }} />
              &nbsp;
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
