import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Menu, Home, Whoops404 } from "./pages";
import Modal from './Modal/Modal';
import './Modal/Modal.css';
import ModalInfo from './ModalInfo/ModalInfo';
import './ModalInfo/ModalInfo.css';
import { FaShoppingBag } from 'react-icons/fa';
import iconEmptyBasket from './images/iconEmptyBasket.svg';

// TODO: 
// See how it looks in mobile look and make it beautiful
// SLIDER IMAGE MAKE IT FULL WIDTH FOR EVERY SCREEN
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
// See if async with await is usefull for this project
// Hide the key for the db as it shoulf if I should
// Use best practice for fetching with API, make a file where to put the create, get ... and use it by calling that file easily as I have seen in that video "React Interconnection with db"
// Put "Termenii si conditiile" as Diniasi website


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

function UpperSideSecond() {
  return(
    <section>
    <div id="upper-second" className="container-fluid p-1 text-secondary border-top border-bottom border-danger">
      <h1 className="d-inline ms-5 display-3 fw-normal">De acum puteti</h1><br></br>
      <h1 className="d-inline ms-5 display-1 fw-bolder">COMANDA ONLINE!</h1>
      <Link to="menu"><button type="button" id="button-firstPage" className="btn btn-danger d-inline float-end me-5">Meniu & Comanda</button></Link>
  </div>
  </section>
  );
}

function MainMenu() {
  const pizzas =[{"name": "pizza1"}, {"name": "pizza2"}, {"name": "pizza3"}, {"name": "pizza1"}, {"name": "pizza2"}, {"name": "pizza3"}, {"name": "pizza2"}, {"name": "pizza3"}, {"name": "pizza2"}, {"name": "pizza3"}, {"name": "pizza1"}];
  const burgari =[{"name": "burger2"},{"name": "burger1"}];
  const chifle =[{"name": "chifla1"}, {"name": "chifla2"}];

  // useState to show the modal
  const [show, setShow] = useState(false);

  // useState for content for modal
  const [content, setContent] = useState(null);

  function getContentForModal(data) {
      setContent(data)   
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
            {pizzas.map(function(d, idx){
            return (
            <div onClick={ () => { setShow(true); getContentForModal(d.name) } } style={{width: "250px"}} className="p-3 m-1 bg-white text-dark shadow bg-body rounded">
              <li className="fw-bold" key={idx}>{d.name}</li><p className="text-secondary mt-2 mb-2">Continut</p><p className="fw-bolder mb-0">Pret</p>
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
      <Modal title={content} onClose={ () => setShow(false) } show={show}> 
                <img style={{maxWidth: "100%"}} src="https:medievalpizza.com\/wp-content\/uploads\/2021\/04\/341-1-scaled.jpg"></img>
                <p className="pt-3"> Here will go the content of the particular pizza /burger</p>
                <h5 className="fw-bold">10 lei</h5>
      </Modal>     
      </section> )
}

function CartNotOpened(props) {
  const cartItems = parseInt(window.localStorage.getItem('myCartItems'));

  return(
    <section onClick={props.setPopUp} style={{cursor: "pointer", backgroundColor: "#000000"}} className="text-white d-flex justify-content-between container-fluid position-fixed bottom-0 pe-4 ps-3 pt-2">
      <div className="row">
        <h5 className="col" style={{backgroundColor: "#000000"}}><FaShoppingBag /></h5>
        <h4 className="col ps-0">{Number.isNaN(cartItems) ? 0 : cartItems}</h4>
      </div>
      <h5 className="fw-bold">Vezi cosul tau</h5>
      <h4 className="fw-bold">20 lei</h4>
  </section>
  )
}

function CartOpened(props) {
// AICI AM RAMAS INCERCAND SA COMPAR DATA DE ACU CU ORELE NOASTRE DE LIVRARE + SA INTRODUC SA APARA DIVU DIN VAR PastDeliveryHours CAND E PESTE 23:, si BUTONU CAND E INTRE 9-23
  // const today = new Date('December 25, 2017');
  // const pastDevlieryHours = new Date('December 25, 2017 01:30:00');
  // const time = today.getHours() + ':' + today.getMinutes();
  // console.log(time);

  const PastDeliveryHours = () => {
    return(
      <div className="mb-5 text-secondary">
        <h5>Momentan nu putem prelua comenzi. Va rugam reveniti zilnic in intervalul 09:00 - 23:00. Va multumim !</h5>
      </div>
    );
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

      {/* The below div, will show up only when it's past our delivery hours */}
      <PastDeliveryHours />
      {/* <div className="container">
        <button onClick={props.setPopUpCheckout} className="black-bg text-white border border-2 border-dark rounded p-2">Comanda</button>
      </div> */}
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
          <label className="mt-2 mb-2" htmlFor="alteInformatiiInput">
            Alte informatii (optional)
            <input className="ms-3 fs-4" id="alteInformatiiInput" type="text" name="e-mail" placeholder="Fara ardei, etc." />
          </label><br></br>
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

function Slideshow() {
  const pictures = ["https:medievalpizza.com\/wp-content\/uploads\/2021\/04\/341-1-scaled.jpg", "https:\/\/medievalpizza.com\/wp-content\/uploads\/2021\/04\/226-1-scaled-e1617704481484.jpg", "https:\/\/medievalpizza.com\/wp-content\/uploads\/2021\/04\/12183-scaled-e1617704565414.jpg", "https:\/\/medievalpizza.com\/wp-content\/uploads\/2021\/04\/8117-scaled.jpg"];
  const delay = 2500;
  const [index, setIndex] = React.useState(0);
  const timeoutRef = React.useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  React.useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === pictures.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index]);

  return (
    <div className="slideshow">
      <div
        className="slideshowSlider"
        style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
      >
        {pictures.map((img, index) => (
          <img
            className="slide p-0 container-fluid"
            key={index}
            src={img}
            alt="new">
            </img>
        ))}
      </div>
    </div>
  );
}

function Main() {
return (
  <section className="container d-flex text-center text-white mb-5 mt-5 justify-content-center">
    <Link style={{textDecoration: "none"}} to="menu">
        <div className="p-3">
        <h3 className="display-3 fw-bold text-white">Pizza</h3>
        <img className="transition-transform" width="350" height="500" src="https://medievalpizza.com/wp-content/uploads/2021/04/237-683x1024.jpg" alt="Pizza"></img>
      </div>
    </Link>
    <Link style={{textDecoration: "none"}} to="menu">
      <div className="p-3">
        <img className="transition-transform" width="350" height="500" src="https://medievalpizza.com/wp-content/uploads/2021/04/2141-682x1024.jpg" alt="Burgers"></img>
        <h3 className="display-3 fw-bold text-white">Burgări</h3>
      </div>
    </Link>
    <Link style={{textDecoration: "none"}} to="menu">
      <div className="p-3">
        <h3 className="display-3 fw-bold text-white">Chifle</h3>
        <img className="transition-transform" width="350" height="500" src="https://medievalpizza.com/wp-content/uploads/2021/04/2366-682x1024.jpg"></img>
      </div>
    </Link>  
  </section>
  );
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
      <Route path="/" element={<Home /> } />
      <Route path="/menu" element={<Menu />} />
      <Route path="*" element={<Whoops404 />} />
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

export {UpperSide, UpperSideSecond, MainMenu, CartNotOpened, CartOpened, Checkout, Slideshow, Main, Footer}
export default App;
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
