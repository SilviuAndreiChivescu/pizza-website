import { useState } from "react";
import Modal from "./Modal/Modal";
import "./Modal/Modal.css";
import Drawer from "./Drawer";

export default function NavBar(props) {
  // Destructuring props
  const { pageState, setPageState, title } = props;

  // State for modal with info
  const [show, setShow] = useState(false);

  // Below can be found the particular differences NavBar has on each Page State
  const NoCartNavBar = () => {
    return (
      <img
        className="d-inline p-2 ms-2"
        src="https://medievalpizza.com/wp-content/uploads/2021/04/omgggg.png"
        alt="medieval pizza logo"
      ></img>
    );
  };

  const CartNavBar = () => {
    return (
      <h5
        style={{ display: "inline", cursor: "pointer" }}
        onClick={() => setPageState("NoCart")}
        className="fs-1"
      >
        &#8592;
      </h5>
    );
  };

  const CheckoutNavBar = () => {
    return (
      <h5
        style={{ display: "inline", cursor: "pointer" }}
        onClick={() => setPageState("Cart")}
        className="fs-1"
      >
        &#8592;
      </h5>
    );
  };

  return (
    <header>
      <div className="black-bg container-fluid d-inline-flex justify-content-between pe-3 ps-3 text-white">
        <div className="mt-2">
          {/* Render something different for each Page State */}
          {pageState === "NoCart" ? <NoCartNavBar /> : null}
          {pageState === "Cart" ? <CartNavBar /> : null}
          {pageState === "Checkout" ? <CheckoutNavBar /> : null}
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
        <Drawer
          setPageState={setPageState}
          Icon={<i className="fas fa-lg text-white fa-bars ms-5"></i>}
        />
      </div>
      <Modal
        Name="Despre noi"
        onClose={() => setShow((currShow) => !currShow)}
        show={show}
      >
        {/* ModalContent is locally for this component and can be found below this function */}
        <ModalContent />
      </Modal>
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
