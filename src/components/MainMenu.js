import {useState, useEffect} from 'react';
import Axios from 'axios'
import Modal from './Modal/Modal.js';
import ModalLogic from "./Modal/ModalLogic";
import './Modal/Modal.css';
import { FaShoppingBag } from 'react-icons/fa';

export default function MainMenu(props) {
    // Below was just an example from when I was building the application
    // const pizzas =[{"name": "pizza1"}, {"name": "pizza2"}, {"name": "pizza3"}, {"name": "pizza1"}, {"name": "pizza2"}, {"name": "pizza3"}, {"name": "pizza2"}, {"name": "pizza3"}, {"name": "pizza2"}, {"name": "pizza3"}, {"name": "pizza1"}];
    const burgari =[{"name": "burger2"},{"name": "burger1"}];
    const chifle =[{"name": "chifla1"}, {"name": "chifla2"}];
  
    // useState to show the modal
    const [show, setShow] = useState(false);
  
    // useState for content for modal
    const [content, setContent] = useState([]);
    function getContentForModal(data) {
        setContent(data)   
    }
  
    // The below useState is used to display on the front-end all my info from db
    const [pizzas, setPizzas] = useState([]);
  
    // Get pizza category from db
    useEffect(() => {
      Axios.get('http://localhost:3001/api/getPizza').then((response) => {
          setPizzas(response.data);
      });
    }, []);
  
    const [cartItems, setCartItems] = useState(0);
    
  
    const PizzaSize = () => {
      if (content.Category === 'pizza') {
        return(
          <div className="mt-2 mb-2">
            <input type="radio" id="mica" name="timp" defaultChecked />
            <label className="ms-2 me-5" htmlFor="mica">Mica</label>
            <input type="radio" id="medie" name="timp" />
            <label className="ms-2 me-5" htmlFor="medie">Medie</label>
            <input type="radio" id="mare" name="timp" />
            <label className="ms-2" htmlFor="mare">Mare</label>
          </div>
        );}
      else return null;
    };
  
    // The box in which the recipes are shown in the Menu
    const FoodBox = (props) => {
      return(
        <div onClick={ () => {setShow(true); getContentForModal({Name: props.Name, Description: props.Description, Price: props.Price, Category: props.Category})}} style={{width: "250px"}} className="p-3 m-1 bg-white text-dark shadow bg-body rounded">
          <li key={"props.key"} className="fw-bold">{props.Name}</li>
          <p style={{height: "120px"}} className="text-secondary mt-2 mb-2">{props.Description}</p>
          <p className="fw-bolder mb-0 ">{props.Price} lei</p>
        </div>)
    };
  
    return(
        <section style={{backgroundColor: "#efeff4"}}> 
        <nav className="d-flex justify-content-between bg-secondary p-3 w-100">
          <a href="#pizza">Pizza</a>
          <a href="#">Burgări</a>
          <a href="#chifle">Chifle coapte pe vatră</a> 
          <a href="#">Sandwich</a>  
          <a href="#">Sucuri si Bere</a>   
        </nav>
        <div className="">
          <ul className="text-dark">
            <p id="pizza" className="ps-3 fs-3 fw-bold">Pizza</p>
            <div className="d-flex flex-wrap">
              {pizzas.map((val) => {
              return ( <FoodBox key={val.ProductID} Name={val.Name} Description={val.Description} Price={val.Price} Category={val.Category} /> )})}
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
        <Modal Name={content.Name} onClose={ () =>  setShow(currShow => !currShow) } show={show}> 
          <img style={{maxWidth: "100%"}} src="https:medievalpizza.com\/wp-content\/uploads\/2021\/04\/341-1-scaled.jpg"></img>
          <p className="pt-3">{content.Description}</p>
          <h5 className="fw-bold">{content.Price} lei</h5>
          <PizzaSize />
          <label className="mt-2 mb-2" htmlFor="alteInformatiiInput">
            Alte informatii (optional)
            <input className="ms-3" id="alteInformatiiInput" type="text" name="e-mail" placeholder="Fara ardei, etc." />
          </label><br></br>
          <div className="modal-footer">
              <ModalLogic Price={content.Price} Name={content.Name} cartItems={(e) => setCartItems(e)} onClose={ () => setShow(currShow => !currShow) } />
          </div>
        </Modal>
        
        <CartNotOpened cartItems={cartItems} setPopUp={props.setPopUp} />    
        </section> )
  }
  
  function CartNotOpened(props) {
  
    // THIS WAS TO GET DATA FOR HOW_MANY, but I MOVED IT INTO MODALLOGIC(SUBMIT FUNCTION) TRYING TO SOLVE IT
    // const [cartItems, setCartItems] = useState(0);
  
    // useEffect(() => {
    //   Axios.get('http://localhost:3001/api/getHowMany').then((response) => {
    //       setCartItems(response.data[0]["SUM(How_many)"]);
    //   });
    // }, []);
  
    return(
      <section onClick={props.setPopUp} style={{cursor: "pointer", backgroundColor: "#000000"}} className="text-white d-flex justify-content-between container-fluid position-fixed bottom-0 pe-4 ps-3 pt-2">
        <div className="row">
          <h5 className="col" style={{backgroundColor: "#000000"}}><FaShoppingBag /></h5>
          <h4 className="col ps-0">{props.cartItems}</h4>
        </div>
        <h5 className="fw-bold">Vezi cosul tau</h5>
        <h4 className="fw-bold">20 lei</h4>
    </section>
    )
  }