import React, {useState, useEffect} from 'react';
import Axios from 'axios'
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Menu, Whoops404, Mysql, Autentificare } from "./pages";
import Modal from './Modal/Modal';
import ModalLogic from "./Modal/ModalLogic";
import './Modal/Modal.css';
import { FaShoppingBag } from 'react-icons/fa';


// TODO: 
// File Structure - Put each component and page as for "best practices for react" ( draw it on paper if necessary, see the connections between components)
// About the cart: Maybe use a state with an json object inside the application to which I add the food, maybe I don't need a db for this, maybe the "cart table" will be updated only at the end(when user press order), and up to that I store it in localStorage if anything
//   Try to make that feature when user adds something in cart from Modal, to get real time updates in the CartNotOpened (maybe with refresh at the begging if can't find something else)
// Dobra said something about Mongus library for query of MongoDb, see if it is in video of that guy on yt with connection between react and mongodb
// IN RELATION WITH ABOVE TODO, Dobra said use localStorage for not loggined users and cart table if account & USE ENCRYPT PASSWORD for pass and save only the encryption in the db
// Use Array Destructing when having more props. Do this const {prop1, prop2, prop3} = props. Then u can use prop1 instead of props.prop1
// Make search input for menu after finishing with the db
// Generate pages for the sideNav and put content in them like Privacy policy and termeni si conditii, there is a generator for them; Also do the Forgot password for SignIn component

// FoodBox component maybe delete the ingredients, because they are in the modal anyway
// Clean index.html
// Delete all non used components that were used in the Home page but I deleted it & rename all components acordinagly & make navbar for all pages the same component
// Put image(svg) downloaded from Illustration idk, for Checkout when having food in cart
// Use best practice for fetching with API, make a file where to put the create, get ... and use it by calling that file easily as I have seen in that video "React Interconnection with db"
// Change boostrap 5 with react-bootstrap (Last and if needed)
// Change <a> with <Link> because <a> triggers a refresh page(check if so) and that is not ok with react because it resets states
// Make a loading page
// Redux if needed or Context API
// Optimize for mobile(maybe bootstrap will do it for me)
// Hide the key for the db as it shoulf if I should
// Unit tests?
// Check if there are npm modules unused and uninstall them


// GOOD TO KNOW
// use useEffect when console.log something that is state depenendent, because it will give you the real time value, not the value that was when you would console.log, because when you would console.log normally, it will run asynch, and you don't want that
// when using setState for let's say, increment by 1, don't just put setCount(count+1), !!put setCount(currCount => currCount + 1)
// ALSO for when toggling from false to true, use setState(currState => !currState)
// When using useEffect and in the dependency array you will put an object, due to referencing of that obj, it might give an unexpected result. SO when using useEffect and want to be dependent of an object, use useMemo() [look it up if needed]
// See if async with await is usefull for this project
// Material UI check


function MainMenu(props) {
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
    if (content.Category == 'pizza') {
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
        <li className="fw-bold">{props.Name}</li>
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
            return ( <FoodBox Name={val.Name} Description={val.Description} Price={val.Price} Category={val.Category} /> )})}
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


function App() {
  return (
    <>
    <Routes>
      {/* <Route path="/" element={<Home /> } /> */}
      <Route path="/" element={<Menu />} />
      <Route path="*" element={<Whoops404 />} />
      <Route path="/mysql" element={<Mysql />} />
      <Route path="/autentificare" element={<Autentificare />} />
    </Routes>
    </>
  );
}

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);

export { MainMenu, CartNotOpened}
export default App;
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
