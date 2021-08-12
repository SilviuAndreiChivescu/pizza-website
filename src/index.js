import React, {useState, useEffect} from 'react';
import Axios from 'axios'
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Menu, Whoops404, Mysql } from "./pages";
import Modal from './Modal/Modal';
import './Modal/Modal.css';
import ModalInfo from './ModalInfo/ModalInfo';
import './ModalInfo/ModalInfo.css';
import { FaShoppingBag } from 'react-icons/fa';
import iconEmptyBasket from './images/iconEmptyBasket.svg';

// TODO: 
// use useEffect when console.log something that is state depenendent, because it will give you the real time value, not the value that was when you would console.log, because when you would console.log normally, it will run asynch, and you don't want that
// Div s from Menu with the Pizza and its text, make it a component
//   !when using setState for let's say, increment by 1, don't just put setCount(count+1), !!put setCount(currCount => currCount + 1)
//   !ALSO for when toggling from false to true, use setState(currState => !currState)
// See how it looks in mobile look and make it beautiful
// Change <a> with <Link> because <a> triggers a refresh page and that is not ok with react because it resets states
// Change boostrap 5 with react-bootstrap (Last after refactoring code with best practices)
// Make a loading page
// Put each component and page as for "best practices for react"
// If needed to have a submit button for the modal, use it(i have written it but I have not pass to <Modal onSubmit={myFunction}), if not, delete the comment in Modal.js
// Redux if needed
// Make search input for menu after finishing with the db
// Put image(svg) downloaded from Illustration idk, for Checkout
// Make icon-menu like a side nav that opens, with the necessary things, like Privacy policy and IDK, ask maiu and search for this
// Check if there are npm modules unused and uninstall them
// Use useEffect instead of refresh page when adding to cart, and maybe u can use it for more stuff(I think for this I need to use async and await)
// When using useEffect and in the dependency array you will put an object, due to referencing of that obj, it might give an unexpected result. SO when using useEffect and want to be dependent of an object, use useMemo() [look it up if needed]
// See if async with await is usefull for this project
// Hide the key for the db as it shoulf if I should
// Use best practice for fetching with API, make a file where to put the create, get ... and use it by calling that file easily as I have seen in that video "React Interconnection with db"
// Put "Termenii si conditiile" as Diniasi website
// Delete all non used components that were used in the Home page but I deleted it & rename all components acordinagly & make navbar for all pages the same component
// see how index.html should look like and make it clean

function UpperSide() {
  const [show, setShow] = useState(false);
  return (
    <section>
    <div id="upper-first" className="container-fluid p-2 brown-color">
      <Link to="/"><img className="d-inline p-2 ms-5" src="https://medievalpizza.com/wp-content/uploads/2021/04/omgggg.png"></img></Link>
      <a href="https://www.facebook.com/pizzamedievalmangalia/" target="_blank"><i className="fab fa-lg fa-facebook me-2 text-white"></i></a>
      <a href="https://www.instagram.com/medievalpizzamangalia/" target="_blank"><i className="fab fa-lg fa-instagram me-2 text-white"></i></a>
      <a href="tel:0754911062"><i className="fas fa-lg fa-phone-square me-2 text-white"></i></a>
      <i style={{cursor: "pointer"}} className="fas fa-lg fa-info-circle text-white" onClick={() => setShow(true)}></i>
      <ModalInfo title="Despre noi" onClose={() => setShow(false)} show={show} />
      <h5 style={{cursor: "default"}} className="d-inline p-2 float-end me-3 text-secondary">Nu există sentiment mai plăcut în lume decât o cutie de pizza caldă pe picioare. <i className="fas fa-bars ms-3"></i></h5>
    </div>
    </section>);
}

function MainMenu() {
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
  }

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
            return (
            <div onClick={ () => {setShow(true); getContentForModal({Name: val.Name, Description: val.Description, Price: val.Price, Category: val.Category})}} style={{width: "250px"}} className="p-3 m-1 bg-white text-dark shadow bg-body rounded">
              <li className="fw-bold">{val.Name}</li><p className="text-secondary mt-2 mb-2">{val.Description}</p><p className="fw-bolder mb-0">{val.Price} lei</p>
            </div>)
            })}
          </div>
          <p>Burgari</p>
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
          </div> 
                    
        </ul>
      </div>
      <Modal Price={content.Price} Description={content.Description} title={content.Name} onClose={ () => setShow(false) } show={show}> 
                <img style={{maxWidth: "100%"}} src="https:medievalpizza.com\/wp-content\/uploads\/2021\/04\/341-1-scaled.jpg"></img>
                <p className="pt-3">{content.Description}</p>
                <h5 className="fw-bold">{content.Price} lei</h5>
                <PizzaSize />
                <label className="mt-2 mb-2" htmlFor="alteInformatiiInput">
                  Alte informatii (optional)
                  <input className="ms-3" id="alteInformatiiInput" type="text" name="e-mail" placeholder="Fara ardei, etc." />
                </label><br></br>
      </Modal>     
      </section> )
}

function CartNotOpened(props) {

    const [cartItems, setCartItems] = useState(0);
    useEffect(() => {
      Axios.get('http://localhost:3001/api/getHowMany').then((response) => {
          setCartItems(response.data[0]["SUM(How_many)"]);
      });
    }, []);

  return(
    <section onClick={props.setPopUp} style={{cursor: "pointer", backgroundColor: "#000000"}} className="text-white d-flex justify-content-between container-fluid position-fixed bottom-0 pe-4 ps-3 pt-2">
      <div className="row">
        <h5 className="col" style={{backgroundColor: "#000000"}}><FaShoppingBag /></h5>
        <h4 className="col ps-0">{cartItems}</h4>
      </div>
      <h5 className="fw-bold">Vezi cosul tau</h5>
      <h4 className="fw-bold">20 lei</h4>
  </section>
  )
}

function CartOpened(props) {
  const today = new Date();
  const time = today.getHours() + ':' + today.getMinutes();

  const DeliveryHours = () => {
    if (time > '22:29' && time < '8:59') {
      return(
        <div className="mb-5 text-secondary">
          <h5>Momentan nu putem prelua comenzi. Va rugam reveniti zilnic in intervalul 09:00 - 22:30. Va multumim !</h5>
        </div>
      );
      }
    else {
      return(
        <div className="container">
          <button onClick={props.setPopUpCheckout} className="black-bg text-white border border-2 border-dark rounded p-2">Comanda</button>
        </div>
      );
    }
  }

  return(
    <>
    <SecondNavBar setPopUp={props.setPopUp} title={"Cosul tau"} />
    <section className="container-fluid position-absolute h-100 w-100 overflow-hidden bg-white text-center">
      {/* The below div is only when cart is empty, when not empty, show what I will code with buttons and meal */}
      <div className="text-secondary border-bottom border-2 border-secondary">
        <img className="img-fluid mt-5" src={iconEmptyBasket} style={{width: "70px"}} />
        <h5 className="mb-5">Adauga mancare gustoasa din meniu si apoi plaseaza comanda</h5>
      </div>

      <div className="row container-fluid ">
            <div className="col d-inline-flex ps-0 justify-content-center pt-3">
            <p>2 X </p>
            <p className="ps-2 pe-2">Pizza casei</p>
            <div className=""><button className="border-1 border-dark bg-light rounded-start" style={{width: "30px"}}>-</button></div>
            <div><button className="border-1 border-dark bg-light rounded-end" style={{width: "30px"}}>+</button></div>
            <p className="ps-2 pe-2">10.00 lei</p>
            </div>
        </div>

      <div className="mb-5 border-bottom border-2 border-secondary">
        <p className="mt-2">Sub-total: 10lei</p>
        <p className="fw-bold">Total: 20lei</p>
      </div>
      <DeliveryHours />
    </section>
    </>
  )
}

function SecondNavBar(props) {
  return(
    <header className="black-bg container-fluid d-inline-flex justify-content-between pe-3 ps-3 text-white">
    <h5 style={{cursor: "pointer"}} onClick={props.setPopUp} className="fs-1">&#8592;</h5>
    <h5 className="pt-3 me-3">{props.title}</h5>
    <h5><i className="pt-3 fas fa-bars"></i></h5>
  </header>
  );
}

function Checkout(props) {
  // useState for if the user decides to choose a time to get his food
  const [timp, setTimp] = useState(false);

  const ChooseHour = () => {
    return <input className="ms-4" id="alege" type="time" name="timp" min="09:00" max="23:00" />
  }

  return(
    <>
      <SecondNavBar setPopUp={props.setPopUp} title={"Aici dai comanda"} />
      <section className="container-fluid h-100 bg-white">
        <form className="p-5 fs-5 shadow bg-body rounded me-5 ms-5">
          <h3>Adresa de livrare:</h3>
          <label className="me-5 mt-4" htmlFor="prenumeInput">
            Prenume *<br></br>
            <input className="fs-4" id="prenumeInput" type="text" name="prenume" required/>
          </label>
          <label className="me-5 mt-4" htmlFor="numeInput">
            Nume *<br></br>
            <input className="fs-4" id="numeInput" type="text" name="nume" required/>
          </label>
          <label className="me-5 mt-4" htmlFor="adresaInput">
            Adresa * <br></br>
            <input className="fs-4" id="adresaInput" type="text" name="adresa" placeholder="Nume strada, numar etc." required/>
          </label>
          <label className="me-5 mt-4" htmlFor="orasInput">
            Oras * <br></br>
            <input className="fs-4" id="orasInput" type="text" name="oras" required/>
          </label>
          <label className="me-5 mt-4" htmlFor="telefonInput">
            Telefon * <br></br>
            <input className="fs-4" id="telefonInput" type="tel" name="telefon" required/>
          </label>
          <label className="mt-4" htmlFor="emailInput">
            E-mail * <br></br>
            <input className="fs-4" id="emailInput" type="text" name="e-mail" required/>
          </label>
          <br></br>
          <p className="mt-3">Cand se va face livrarea / servirea? *</p>
          <div className="mt-2 mb-2">
            <input type="radio" id="catMaiRepede" name="timp" onClick={() => setTimp(false)} defaultChecked />
            <label className="ms-2 me-5" htmlFor="catMaiRepede">Cat mai repede</label>
            <input type="radio" id="alege" name="timp" onClick={() => setTimp(true)} />
            <label className="ms-2" htmlFor="alege">Alege ora!</label>
            { timp ? <ChooseHour /> : null }
          </div>
          <p className="mb-1">Metoda de livrare</p>
          <div>
            <input className="me-2" type="radio" id="livrareLaDomiciliu" name="livrarea" value="livrareLaDomiciliu" checked />
            <label htmlFor="livrareLaDomiciliu">Livrare la domiciliu</label>
          </div>
          <div>
            <input className="me-2" type="radio" id="ridicarePersonala" name="livrarea" value="ridicarePersonala" />
            <label htmlFor="ridicarePersonala">Ridicare personala</label>
          </div>
          <input type="checkbox" id="datele" name="datele" value="true" />
          <label className="ms-2" htmlFor="datele"> Pastreaza-mi datele pentru urmatoarea comanda</label><br></br>
          <div className="d-inline-flex">
            <input className="mt-2" type="checkbox" id="conditiile" name="conditiile" value="true" required />
            <label className="ms-2" htmlFor="conditiile"> Confirm ca am citit Termenii si conditiile care contin toate informatiile referitoare la modul de procesare a datelor cu carater personal necesare pentru procesarea si executarea comenzilor si declar ca sunt de acord cu acesti termeni si conditii. In cazul comenzilor nelivrate, suma va fi returnata pe acelasi card utilizat la tranzactionare, in decurs de 14 zile de la acceptarea returului, in functie de banca emitenta a cardului. *</label><br></br>
          </div>
          <input type="checkbox" id="cont" name="cont" value="true" />
          <label className="ms-2" htmlFor="cont"> Creezi un cont?</label><br></br>
          <h2 className="mt-4 mb-4">Comanda ta</h2>
          <div className="d-inline-flex mb-3">
            <p>2 X</p>
            <p className="ms-5"> Pizza medieval mare</p>
            <p className="ms-5">20.00 lei</p>
          </div>
          <p className="border-top border-2 fs-3">Total: <strong>20.00lei</strong></p>
          <button className="container black-bg text-white border border-2 border-dark rounded p-2">PLASEAZA COMANDA</button>
        </form>
      </section>
    </>
  )
}

function Footer({year}) {
  return (
    <footer className="position-relative">
    <div className="text-white position-absolute container-fluid text-center brown-color p-2">
      <p>905500 Str. Petru Maior 20, Mangalia ( In spatele Scolii nr.2 )
+40754 911 062
+40790 649 803
9:00 - 23:00 Luni - Duminica</p>
      <p>Copyright {year} </p>
    </div>
    </footer>
  );
}

function App() {
  return (
    <>
    <Routes>
      {/* <Route path="/" element={<Home /> } /> */}
      <Route path="/" element={<Menu />} />
      <Route path="*" element={<Whoops404 />} />
      <Route path="/mysql" element={<Mysql />} />
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

export {UpperSide, MainMenu, CartNotOpened, CartOpened, Checkout, Footer}
export default App;
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
