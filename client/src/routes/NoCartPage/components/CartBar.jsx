import { Col, Navbar, Row } from "react-bootstrap";
import { FaShoppingBag } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function CartBar(props) {
  const { totalQuantity, totalPrice, setCartAnimation } = props;
  return (
    <Link
      onClick={() => setCartAnimation("slide-in-bottom")}
      className="slideUp"
      style={{
        textDecoration: "none",
        display: "block",
        position: "-webkit-sticky", // For ios
        position: "sticky",
        bottom: 0,
      }}
      to="/cart"
    >
      <Navbar className="text-white roleway black-bg justify-content-center container-fluid pt-1 pb-0 ps-1 pe-1">
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
              <FaShoppingBag />
              &nbsp;
              {totalQuantity}
            </h4>
          </Col>
          <Col className="text-center">
            <h4>Your cart</h4>
          </Col>
          <Col className="text-end">
            <h4>&#163; {totalPrice}</h4>
          </Col>
        </Row>
      </Navbar>
    </Link>
  );
}
