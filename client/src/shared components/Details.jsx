// This component is shared by ReceiptPage, TrackOrderPage and CheckoutPage

import { Card, Col, Container, ListGroup, Row } from "react-bootstrap";

export default function Details(props) {
  const { cart, title } = props;
  return (
    <Container>
      <Row className="justify-content-center ">
        <Col sm={12} md={10} lg={8} xl={8} xxl={9}>
          <Card className={"m-2 p-2"}>
            <Card.Title className="fs-4">{title}</Card.Title>
            {props.children}
            <Card.Body>
              <ListGroup as="ul">
                {cart.map((value) => {
                  return <DetailsRow key={value.Name} value={value} />;
                })}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

const DetailsRow = (props) => {
  const { value } = props;
  return (
    <ListGroup.Item className="mb-3 " as="li">
      <strong>{value.Quantity}</strong> &nbsp; X &nbsp;{value.Name} &nbsp;{" "}
      <strong>{value.Price}</strong> &#163; / unit
    </ListGroup.Item>
  );
};
