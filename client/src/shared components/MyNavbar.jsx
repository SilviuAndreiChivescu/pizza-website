import { useState } from "react";
import MyModal from "./MyModal";
import Drawer from "./Drawer";
import { Link } from "react-router-dom";
import { Col, Container, Navbar, Card } from "react-bootstrap";

export default function MyNavbar(props) {
  const { to, title, setAnimation } = props;

  // State for Modal
  const [show, setShow] = useState(false);

  // This component returns a left arrow HTML entity with the functionality to go to previous page
  const Arrow = () => {
    return (
      <Link
        onClick={() => setAnimation("slide-in-left")}
        style={{ textDecoration: "none", color: "white" }}
        to={`${to}`}
        className="fs-2"
      >
        &#8592;
      </Link>
    );
  };

  return (
    <Navbar
      style={{ position: "sticky", top: 0, zIndex: 5 }}
      className="black-bg"
    >
      <Container fluid>
        <Col xs={4} sm={4} md={4} lg={4} xl={4} xxl={4} className="text-start">
          <h5>
            {/* Render the Arrow only if the "to" path is specified */}
            {to ? <Arrow /> : null}
            <i
              style={{ cursor: "pointer" }}
              className="fas fa-info-circle text-white ms-2 mt-2"
              onClick={() => setShow(true)}
            ></i>
          </h5>
        </Col>
        <Col className="text-center">
          <Navbar.Brand style={{ cursor: "default" }} className="text-white">
            {title ? title : null}
          </Navbar.Brand>
        </Col>
        <Col className="text-end">
          <Drawer
            Icon={<i className="fas fa-lg text-white fa-bars ms-5"></i>}
          />
        </Col>

        <MyModal
          name="Despre noi"
          onClose={() => setShow((currShow) => !currShow)}
          show={show}
        >
          {/* ModalContent is locally and can be found below this function */}
          <ModalContent />
        </MyModal>
      </Container>
    </Navbar>
  );
}

const ModalContent = () => {
  return (
    <>
      <Card className="mt-2 mb-4 shadow border-1">
        <Card.Body>
          <Card.Title>
            Pizzeria Medieval{" "}
            <a
              href="https://www.facebook.com/pizzamedievalmangalia/"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fab fa-lg fa-facebook m-1 text-black"></i>
            </a>
            <a
              href="https://www.instagram.com/medievalpizzamangalia/"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fab fa-lg fa-instagram m-1 text-black"></i>
            </a>
          </Card.Title>
          <Card.Text>
            Str. Petru Maior 20, Mangalia, 905500 (In spatele Scolii nr.2)
          </Card.Text>
          <Card.Text>
            <a className="text-decoration-none text-dark" href="tel:0754911062">
              <i className="fas fa-lg fa-phone-square me-2"></i>0754 911 062
            </a>
          </Card.Text>
          <Card.Text>
            <a className="text-decoration-none text-dark" href="tel:0790649803">
              <i className="fas fa-lg fa-phone-square me-2"></i>0790 649 803
            </a>
          </Card.Text>
        </Card.Body>
      </Card>

      <Card className="mb-2 shadow ">
        <Card.Body>
          <Card.Title>Orar de livrari</Card.Title>
          <Card.Text>Luni-Duminica: 9:00-23:00</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};
