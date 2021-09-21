import { Card, Button, Image, Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

import MyButton from "../../shared components/MyButton";

import { useQuantitySelector, useTime } from "./CartLogic";

export default function Cart(props) {
  const { cart, setCart, totalPrice } = props;
  const { time } = useTime();
  return (
    <Container fluid className="text-center">
      <Container>
        {/* Render different if it's past the delivery hours */}
        {time > "22:29" && time < "8:59" ? (
          <PastDeliveryHours />
        ) : (
          <CartEmptyOrNot cart={cart} />
        )}

        {/* Render only if cart is not empty and is not past delivery hours */}
        {cart.length === 0 || (time > "22:29" && time < "8:59") ? null : (
          <>
            <Card className="mt-5 p-3 itemsCenterLT540W">
              {cart.map((value) => {
                return (
                  <FoodBox
                    key={value.Name}
                    cart={cart}
                    setCart={setCart}
                    value={value}
                  />
                );
              })}
            </Card>
            <Card.Title className="fw-bold mt-5 mb-5">
              Total: {totalPrice} &#163;
            </Card.Title>

            <Link to="/checkout">
              <MyButton className="mb-4" title="Order" />
            </Link>
          </>
        )}
      </Container>
    </Container>
  );
}

// The next component is used to return different UI for when Cart state is empty or not.
const CartEmptyOrNot = ({ cart }) => {
  if (cart.length === 0)
    return (
      <>
        <Image
          fluid
          className="mt-5 mb-5"
          src="images/iconEmptyBasket.svg"
          style={{ width: "70px" }}
        />
        <Card.Title className="mb-5">
          Add tasty food from the menu and then place the order
        </Card.Title>
      </>
    );
  else
    return (
      <>
        <Image
          fluid
          className="mt-5"
          src="images/iconPizzaSharing.svg"
          style={{ width: "400px" }}
        />
      </>
    );
};

// This Component is the row for particular item. It has option to add or substract from quantity.
const FoodBox = (props) => {
  const { value, cart, setCart } = props;
  const { incrementItem, decreaseItem } = useQuantitySelector(
    cart,
    setCart,
    value
  );

  return (
    <Row className="mb-2 mt-2" xs={2} sm={3} md={3} lg={3} xl={3} xxl={3}>
      <Col>
        <Card.Title>
          {value.Quantity} X {value.Name}
        </Card.Title>
      </Col>
      <Col>
        <Button
          style={{ width: "35px" }}
          className="me-2 fontSize"
          onClick={() => decreaseItem(value.Name)}
          variant="outline-dark"
        >
          -
        </Button>
        <Button
          className="fontSize"
          onClick={() => incrementItem(value.Name)}
          variant="outline-dark"
        >
          +
        </Button>
      </Col>
      <Col>
        <Card.Title className="">
          {value.Price * value.Quantity} &#163;
        </Card.Title>
      </Col>
    </Row>
  );
};

// This component is to render if curren time is past the delivery hours
const PastDeliveryHours = () => {
  return (
    <Card.Subtitle className="text-secondary mt-5">
      <h5>
        We can not take orders at the moment. Please come back daily in our
        Delivery Times 09:00 - 22:30. Thank you!
      </h5>
    </Card.Subtitle>
  );
};
