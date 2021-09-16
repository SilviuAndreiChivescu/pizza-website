import { Col, Container, Navbar, Row } from "react-bootstrap";
import { FaShoppingBag } from "react-icons/fa";
import { Link } from "react-router-dom";
// The cart bar from the bottom of the page.
export default function CartBar(props) {
  const { totalQuantity, totalPrice, setCartAnimation } = props;
  return (
    <Link
      onClick={() => setCartAnimation("slide-in-bottom")}
      style={{
        textDecoration: "none",
        display: "block",
        position: "-webkit-sticky",
        position: "sticky",
        bottom: 0,
      }}
      to="/cart"
    >
      <Navbar className="text-white black-bg justify-content-center container-fluid">
        <Row
          style={{ width: "100%" }}
          xs={3}
          sm={3}
          md={3}
          lg={3}
          xl={3}
          xxl={3}
          className="align-items-center"
        >
          <Col>
            <h4>
              <FaShoppingBag style={{ marginBottom: "0.85vh" }} />
              &nbsp;
              {totalQuantity}
            </h4>
          </Col>
          <Col className="text-center">
            <h4>Cosul tau</h4>
          </Col>
          <Col className="text-end">
            <h4>{totalPrice} lei</h4>
          </Col>
        </Row>
      </Navbar>
    </Link>
  );
}
