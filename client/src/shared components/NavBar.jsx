import { useState } from "react";
import MyModal from "./MyModal";
import Drawer from "./Drawer";
import { Link } from "react-router-dom";

export default function NavBar(props) {
  // Destructuring props
  const { to, title } = props;

  // State for Modal
  const [show, setShow] = useState(false);

  // Arrow component to render a left arrow HTML entity with the functionality to go to previous page
  const Arrow = () => {
    return (
      <Link style={{ textDecoration: "none", color: "white" }} to={`/${to}`}>
        <h5 style={{ display: "inline" }} className="fs-1">
          &#8592;
        </h5>
      </Link>
    );
  };

  return (
    <header>
      <div className="black-bg container-fluid d-inline-flex justify-content-between pe-3 ps-3 text-white">
        <div className="mt-2">
          {/* If on NoCartPage, don't render the Arrow because it's home page. If on any other page, render the arrow with the setPageState to go back one page (specified in <NavBar setPageState={() => setPageState("PreviousName")} /> ) */}
          {to ? <Arrow /> : null}
          <a
            href="https://www.facebook.com/pizzamedievalmangalia/"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fab fa-lg fa-facebook me-2 text-white"></i>
          </a>
          <a
            href="https://www.instagram.com/medievalpizzamangalia/"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fab fa-lg fa-instagram me-2 text-white"></i>
          </a>
          <a href="tel:0754911062">
            <i className="fas fa-lg fa-phone-square me-2 text-white"></i>
          </a>
          <i
            style={{ cursor: "pointer" }}
            className="fas fa-lg fa-info-circle text-white"
            onClick={() => setShow(true)}
          ></i>
        </div>
        <h5 style={{ cursor: "default" }} className="d-inline p-2 ms-5">
          {title}
        </h5>
        <Drawer Icon={<i className="fas fa-lg text-white fa-bars ms-5"></i>} />
      </div>
      <MyModal
        Name="Despre noi"
        onClose={() => setShow((currShow) => !currShow)}
        show={show}
      >
        {/* ModalContent is locally and can be found below this function */}
        <ModalContent />
      </MyModal>
    </header>
  );
}

const ModalContent = () => {
  return (
    <>
      <div className="m-4 p-4 shadow bg-white">
        <div className="border-bottom">
          <p>Contact</p>
        </div>
        <div style={{ lineHeight: "1.2" }} className="pt-2">
          <p className="fw-bold">Pizzeria Medieval</p>
          <p className="">
            Str. Petru Maior 20, Mangalia, 905500(In spatele Scolii nr.2)
          </p>
          <a className="text-decoration-none text-dark" href="tel:0754911062">
            <p>
              <i className="fas fa-lg fa-phone-square me-2"></i>0754 911 062
            </p>
          </a>
          <a className="text-decoration-none text-dark" href="tel:0790649803">
            <p>
              <i className="fas fa-lg fa-phone-square me-2"></i>0790 649 803
            </p>
          </a>
        </div>
      </div>
      <div className="m-4 p-4 shadow bg-white">
        <div className="border-bottom">
          <p>Orar de livrari</p>
        </div>
        <div className="pt-2">
          <p>Luni-Duminica: 9:00-23:00</p>
        </div>
      </div>
      <div className="moadalInfo-footer"></div>
    </>
  );
};
