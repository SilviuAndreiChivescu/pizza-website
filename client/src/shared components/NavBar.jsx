import { useState } from "react";
import MyModal from "./MyModal";
import Drawer from "./Drawer";
import { Link } from "react-router-dom";
import { Col, Container, Navbar, Card } from "react-bootstrap";

export default function NavBar(props) {
  // Destructuring props
  const { to, title } = props;

  // State for Modal
  const [show, setShow] = useState(false);

  // Arrow component to render a left arrow HTML entity with the functionality to go to previous page
  const Arrow = () => {
    return (
      <Link style={{ textDecoration: "none", color: "white" }} to={`${to}`}>
        <h5 style={{ display: "inline" }} className="fs-1">
          &#8592;
        </h5>
      </Link>
    );
  };

  return (
    <Container fluid className="p-0">
      <Navbar className="black-bg container-fluid">
        <Col sm={1} lg={4} className="text-start ms-2">
          <h5>
            {/* Render the Arrow only if the "to" path is specified */}
            {to ? <Arrow /> : null}
            <a
              href="https://www.facebook.com/pizzamedievalmangalia/"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fab  fa-facebook m-1 text-white"></i>
            </a>

            <a
              href="https://www.instagram.com/medievalpizzamangalia/"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fab fa-instagram m-1 text-white"></i>
            </a>
            <a href="tel:0754911062">
              <i className="fas fa-phone-square m-1 text-white"></i>
            </a>
            <i
              style={{ cursor: "pointer" }}
              className="fas fa-info-circle text-white m-1"
              onClick={() => setShow(true)}
            ></i>
          </h5>
        </Col>
        <Col className="text-center">
          <Navbar.Brand style={{ cursor: "default" }} className="text-white">
            {title ? title : "Orice comanda este confirmata in maxim 5 minute."}
          </Navbar.Brand>
        </Col>
        <Col className="text-end">
          <Drawer Icon={<i className="fas fa-lg text-white fa-bars"></i>} />
        </Col>
      </Navbar>
      <MyModal
        Name="Despre noi"
        onClose={() => setShow((currShow) => !currShow)}
        show={show}
      >
        {/* ModalContent is locally and can be found below this function */}
        <ModalContent />
      </MyModal>
    </Container>
  );
}

const ModalContent = () => {
  return (
    <>
      <Card className="mt-2 mb-4 shadow border-1">
        <Card.Body>
          <Card.Title>Pizzeria Medieval</Card.Title>
          <Card.Text>
            Str. Petru Maior 20, Mangalia, 905500(In spatele Scolii nr.2)
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
