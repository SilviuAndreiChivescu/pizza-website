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
// Change <a> with <Link>
// Change boostrap 5 with react-bootstrap (Last after refactoring code with best practices)
// Make a loading page
// Put each component and page as for "best practices for react"
// If needed to have a submit button for the modal, use it(i have written it but I have not pass to <Modal onSubmit={myFunction}), if not, delete the comment in Modal.js
// Redux
// Make search input for menu after finishing with the db
// Put image(svg) downloaded from Illustration idk, for Checkout
// Use props at the functions. because if I don't, I still have to put double the name of what I am passing(U know what I am talking about)
// Make icon-menu like a side nav that opens, with the necessary things, like Privacy policy and IDK, ask maiu and search for this
// Check for something that sees what npm modules are not used and then uninstall them.
// Use useEffect instead of refresh page when adding to cart, and maybe u can use it for more stuff(I think for this I need to use async and await)
// See if async with await is usefull for this project
// Hide the key for the db as it shoulf if I should
// Use best practice for fetching with API, make a file where to put the create, get ... and use it by calling that file easily as I have seen in that video "React Interconnection with db"


function UpperSide() {
  const [show, setShow] = useState(false);
  return (
    <section>
    <div id="upper-first" className="container-fluid p-2 brown-color">
      <img className="d-inline p-2 ms-5" src="https://medievalpizza.com/wp-content/uploads/2021/04/omgggg.png"></img>
      <a href="https://www.facebook.com/pizzamedievalmangalia/" target="_blank"><i className="fab fa-lg fa-facebook me-2 text-white"></i></a>
      <a href="https://www.instagram.com/medievalpizzamangalia/" target="_blank"><i className="fab fa-lg fa-instagram me-2 text-white"></i></a>
      <a href="tel:0754911062"><i className="fas fa-lg fa-phone-square me-2 text-white"></i></a>
      <i style={{cursor: "pointer"}} className="fas fa-lg fa-info-circle text-white" onClick={() => setShow(true)}></i>
      <ModalInfo title="Despre noi" onClose={() => setShow(false)} show={show} />
      <h5 className="d-inline p-2 float-end me-3 text-secondary">Nu există sentiment mai plăcut în lume decât o cutie de pizza caldă pe picioare. <i className="fas fa-bars ms-3"></i></h5>
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
      <section className="bg-white">
      <nav className="d-flex justify-content-between bg-secondary p-3 w-100">
        <a href="#">Pizza</a>
        <a href="#">Burgări</a>
        <a href="#chifle">Chifle coapte pe vatră</a> 
        <a href="#">Sandwich</a>  
        <a href="#">Sucuri si Bere</a>   
      </nav>
      <div className="">
        <ul className="text-dark">
          <p className="ps-3 fs-3 fw-bold">Pizza</p>
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

function CartNotOpened(setPopUp) {
  const cartItems = parseInt(window.localStorage.getItem('myCartItems'));

  return(
    <section onClick={setPopUp.setPopUp} style={{cursor: "pointer", backgroundColor: "#000000"}} className="text-white d-flex justify-content-between container-fluid position-fixed bottom-0 pe-4 ps-3 pt-2">
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
  return(
    <>
    <section className="container-fluid position-absolute h-100 w-100 overflow-hidden bg-white text-center">
      <div className="d-inline-flex pt-3">
        <h1>Cosul tau</h1>
        <button className="bg-white text-dark border-0 fs-4" onClick={props.setPopUp}>X</button>
        {/* The below div is only when cart is empty, when not empty, show what I will code with buttons and meal */}
      </div>
      <div className="text-secondary border-top border-bottom border-1 border-secondary">
        <img className="img-fluid mt-5" src={iconEmptyBasket} style={{width: "70px"}} />
        <h5 className="mb-5">Adauga mancare gustoasa din meniu si apoi plaseaza comanda</h5>
      </div>

      <div className="row container-fluid ">
            <div className="col d-inline-flex ps-0 justify-content-center pt-3 border-top border-1 border-secondary">
            <p>2 X </p>
            <p className="ps-2 pe-2">Pizza casei</p>
            <div className=""><button className="border-1 border-dark bg-light rounded-start" style={{width: "30px"}}>-</button></div>
            <div><button className="border-1 border-dark bg-light rounded-end" style={{width: "30px"}}>+</button></div>
            <p className="ps-2 pe-2">10.00 lei</p>
            </div>
        </div>

      <div className="mb-5 border-bottom border-1 border-secondary">
        <p className="mt-2">Sub-total: 10lei</p>
        <p className="fw-bold">Total: 20lei</p>
      </div>

      {/* The below div, will show up only when it's past our delivery hours */}
      {/* <div className="mb-5 border-bottom border-1 border-secondary">
        <p>Momentan nu putem prelua comenzi. Va rugam reveniti zilnic in intervalul 09:00 - 19:00. Va multumim !</p>
        <p>Luam comenzi! (for this I have to look tmorrow at DIniasi and make it so if it is past our hours, to show not taking orders!</p>
        <p>Luni-Duminica: 9:00-23:00</p>
      </div> */}
      <div className="container"><button onClick={props.setPopUpCheckout} className="black-bg text-white border border-2 border-dark rounded p-2">Comanda</button></div>
    </section>
    </>
  )
}

function Checkout() {

  return(
    <section className="container-fluid position-absolute h-100 w-100 overflow-hidden bg-white text-center">
      <header className="black-bg container-fluid d-inline-flex justify-content-between pe-3 ps-3">
        <h5 className="fs-1">&#8592;</h5>
        <h5 className="pt-3">This is the checkout</h5>
        <h5><i className="pt-3 fas fa-bars"></i></h5>
      </header>
      <form>
        <h5>Adresa de livrare:</h5>
        <label htmlFor="prenumeInput">
          Prenume *<br></br>
          <input id="prenumeInput" type="text" name="prenume" required/>
        </label>
        <label htmlFor="numeInput">
          Nume *<br></br>
          <input id="numeInput" type="text" name="nume" required/>
        </label><br></br>
        <label htmlFor="adresaInput">
          Adresa * <br></br>
          <input id="adresaInput" type="text" name="adresa" placeholder="Nume strada, numar etc." required/>
        </label>
        <label htmlFor="orasInput">
          Oras * <br></br>
          <input id="orasInput" type="text" name="oras" required/>
        </label><br></br>
        <label htmlFor="telefonInput">
          Telefon * <br></br>
          <input id="telefonInput" type="tel" name="telefon" required/>
        </label>
        <label htmlFor="emailInput">
          E-mail * <br></br>
          <input id="emailInput" type="text" name="e-mail" required/>
        </label>
        <br></br>
        <p className="mb-0">Cand se va face livrarea / servirea? *</p>
        <div>
          <input type="radio" id="catMaiRepede" name="timp" value="catMaiRepede" checked />
          <label htmlFor="catMaiRepede">Cat mai repede</label>
        </div>
        <div>
          <input type="radio" id="alege" name="timp" value="alege" />
          <label htmlFor="alege">Alege data si ora!</label>
        </div>
        <p className="mb-0">Metoda de livrare</p>
        <div>
          <input type="radio" id="livrareLaDomiciliu" name="livrarea" value="livrareLaDomiciliu" checked />
          <label htmlFor="livrareLaDomiciliu">Livrare la domiciliu</label>
        </div>
        <div>
          <input type="radio" id="alege" name="livrarea" value="ridicarePersonala" />
          <label htmlFor="ridicarePersonala">Ridicare personala</label>
        </div>
        <input type="checkbox" id="datele" name="datele" value="true" />
        <label for="datele"> Pastreaza-mi datele pentru urmatoarea comanda</label><br></br>
        <input type="checkbox" id="conditiile" name="conditiile" value="true" required />
        <label for="conditiile"> Confirm ca am citit Termenii si conditiile care contin toate informatiile referitoare la modul de procesare a datelor cu carater personal necesare pentru procesarea si executarea comenzilor si declar ca sunt de acord cu acesti termeni si conditii. In cazul comenzilor nelivrate, suma va fi returnata pe acelasi card utilizat la tranzactionare, in decurs de 14 zile de la acceptarea returului, in functie de banca emitenta a cardului. *</label><br></br>
        <input type="checkbox" id="cont" name="cont" value="true" />
        <label for="cont"> Creezi un cont?</label><br></br>
        {/* AICI AM RAMAS, CONTINUAM DE TERMINAT UI PENTRU CHECKOUT PAGE */}
        <button className="container black-bg text-white border border-2 border-dark rounded p-2">PLASEAZA COMANDA</button>
      </form>
      
      
    </section>
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
    <div className="p-3">
      <h3 className="display-3 fw-bold">Pizza</h3>
      <img className="transition-transform" width="350" height="500" src="https://medievalpizza.com/wp-content/uploads/2021/04/237-683x1024.jpg" alt="Pizza"></img>
    </div>
    <div className="p-3">
      <img className="transition-transform" width="350" height="500" src="https://medievalpizza.com/wp-content/uploads/2021/04/2141-682x1024.jpg" alt="Burgers"></img>
      <h3 className="display-3 fw-bold">Burgări</h3>
    </div>
    <div className="p-3">
      <h3 className="display-3 fw-bold">Chifle</h3>
      <img className="transition-transform" width="350" height="500" src="https://medievalpizza.com/wp-content/uploads/2021/04/2366-682x1024.jpg"></img>
    </div>  
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
