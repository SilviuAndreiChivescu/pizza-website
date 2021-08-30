import { useState } from "react";
import Modal from "./Modal/Modal.js";
import ModalLogic from "./Modal/ModalLogic";
import "./Modal/Modal.css";
import { FaShoppingBag } from "react-icons/fa";

export default function MainMenu(props) {
  const { cart, setCart, productsList } = props;

  // useState to show the modal
  const [show, setShow] = useState(false);

  // useState for content for modal
  const [content, setContent] = useState([]);
  function getContentForModal(data) {
    setContent(data);
  }

  const PizzaSize = () => {
    if (content.Category === "pizza") {
      return (
        <div className="mt-2 mb-2">
          <input type="radio" id="mica" name="timp" defaultChecked />
          <label className="ms-2 me-5" htmlFor="mica">
            Mica
          </label>
          <input type="radio" id="medie" name="timp" />
          <label className="ms-2 me-5" htmlFor="medie">
            Medie
          </label>
          <input type="radio" id="mare" name="timp" />
          <label className="ms-2" htmlFor="mare">
            Mare
          </label>
        </div>
      );
    } else return null;
  };

  // The box in which the title & price are shown in the Menu
  const FoodBox = (props) => {
    return (
      <div
        onClick={() => {
          setShow(true);
          getContentForModal({ Name: props.Name, Price: props.Price });
        }}
        style={{ width: "250px" }}
        className="p-3 m-1 bg-white text-dark shadow bg-body rounded"
      >
        <li key={"props.key"} className="fw-bold">
          {props.Name}
        </li>
        <p style={{ height: "120px" }} className="text-secondary mt-2 mb-2">
          Description
        </p>
        <p className="fw-bolder mb-0 ">{props.Price} lei</p>
      </div>
    );
  };

  return (
    <section style={{ backgroundColor: "#efeff4" }}>
      <nav className="d-flex justify-content-between bg-secondary p-3 w-100">
        <a href="#pizza">Pizza</a>
        <a href="#">Burgări</a>
        <a href="#chifle">Chifle coapte pe vatră</a>
        <a href="#">Sandwich</a>
        <a href="#">Sucuri si Bere</a>
      </nav>
      <div className="">
        <ul className="text-dark">
          <p id="pizza" className="ps-3 fs-3 fw-bold">
            Pizza
          </p>
          <div className="d-flex flex-wrap">
            {productsList.map((val) => {
              return (
                <FoodBox key={val._id} Name={val.Name} Price={val.Price} />
              );
            })}
          </div>
          {/* <p>Burgari</p>
            <div className="d-flex flex-wrap">
              {burgari.map(function(d, idx){
                return (
                <div style={{width: "250px"}} className="m-1 bg-white text-dark">
                  <li key={idx}>{d.name}</li>
                </div>)
              })}
            </div> 
            <p id="chifle">Chifle</p>
            <div className="d-flex flex-wrap">
              {chifle.map(function(d, idx){
                return (
                <div style={{width: "250px"}} className="m-1 bg-white text-dark">
                  <li key={idx}>{d.name}</li>
                </div>)
              })}
            </div>  */}
        </ul>
      </div>
      <Modal
        Name={content.Name}
        onClose={() => setShow((currShow) => !currShow)}
        show={show}
      >
        <img
          style={{ maxWidth: "100%" }}
          src="https:medievalpizza.com\/wp-content\/uploads\/2021\/04\/341-1-scaled.jpg"
        ></img>
        <p className="pt-3">{content.Description}</p>
        <h5 className="fw-bold">{content.Price} lei</h5>
        <PizzaSize />
        <label className="mt-2 mb-2" htmlFor="alteInformatiiInput">
          Alte informatii (optional)
          <input
            className="ms-3"
            id="alteInformatiiInput"
            type="text"
            name="e-mail"
            placeholder="Fara ardei, etc."
          />
        </label>
        <br></br>
        <div className="modal-footer">
          <ModalLogic
            cart={cart}
            setCart={setCart}
            Price={content.Price}
            Name={content.Name}
            ID={content._id}
            onClose={() => setShow((currShow) => !currShow)}
          />
        </div>
      </Modal>

      <CartNotOpened
        totalPrice={props.totalPrice}
        totalNumberOfProduct={props.totalNumberOfProduct}
        cartList={props.cartList}
        setPopUp={props.setPopUp}
      />
    </section>
  );
}

function CartNotOpened(props) {
  return (
    <section
      onClick={props.setPopUp}
      style={{ cursor: "pointer", backgroundColor: "#000000" }}
      className="text-white d-flex justify-content-between container-fluid position-fixed bottom-0 pe-4 ps-3 pt-2"
    >
      <div className="row">
        <h5 className="col" style={{ backgroundColor: "#000000" }}>
          <FaShoppingBag />
        </h5>
        <h4 className="col ps-0">{props.totalNumberOfProduct}</h4>
      </div>
      <h5 className="fw-bold">Vezi cosul tau</h5>
      <h4 className="fw-bold">{props.totalPrice} lei</h4>
    </section>
  );
}
