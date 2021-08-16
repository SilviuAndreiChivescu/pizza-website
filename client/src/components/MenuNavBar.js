import { useState } from 'react';
import { Link } from "react-router-dom";
import Modal from './Modal/Modal';
import './Modal/Modal.css';
import Drawer from './Drawer';

export default function MenuNavBar() {
    const [show, setShow] = useState(false);
    return (
      <header>
      <div className="container-fluid p-2 black-bg d-flex justify-content-between">
        <Link to="/"><img className="d-inline p-2 ms-2" src="https://medievalpizza.com/wp-content/uploads/2021/04/omgggg.png"></img></Link>
        <div className="mt-2">
          <a href="https://www.facebook.com/pizzamedievalmangalia/" target="_blank"><i className="fab fa-lg fa-facebook me-2 text-white"></i></a>
          <a href="https://www.instagram.com/medievalpizzamangalia/" target="_blank"><i className="fab fa-lg fa-instagram me-2 text-white"></i></a>
          <a href="tel:0754911062"><i className="fas fa-lg fa-phone-square me-2 text-white"></i></a>
          <i style={{cursor: "pointer"}} className="fas fa-lg fa-info-circle text-white" onClick={() => setShow(true)}></i>
          <Modal Name="Despre noi" onClose={ () =>  setShow(currShow => !currShow) } show={show}>
            <div className="m-4 p-4 shadow bg-white">
              <div className="border-bottom"><p>Contact</p></div>
              <div style={{lineHeight: "1.2"}} className="pt-2">
                <p className="fw-bold">Pizzeria Medieval</p>
                <p className="">Str. Petru Maior 20, Mangalia, 905500(In spatele Scolii nr.2)</p>
                <a className="text-decoration-none text-dark" href="tel:0754911062"><p><i className="fas fa-lg fa-phone-square me-2"></i>0754 911 062</p></a>
                <a className="text-decoration-none text-dark" href="tel:0790649803"><p><i className="fas fa-lg fa-phone-square me-2"></i>0790 649 803</p></a>
              </div>
            </div>
            <div className="m-4 p-4 shadow bg-white">
              <div className="border-bottom"><p>Orar de livrari</p></div>
              <div className="pt-2"><p>Luni-Duminica: 9:00-23:00</p></div>
            </div>
            <div className="moadalInfo-footer"></div>          
          </Modal>
        </div>
        <h5 style={{cursor: "default"}} className="d-inline p-2 text-secondary ms-5">Nu există sentiment mai plăcut în lume decât o cutie de pizza caldă pe picioare.</h5>
        <Drawer Icon={<i className="fas fa-lg text-white fa-bars ms-5"></i>} /> 
      </div>
      </header>);
  }