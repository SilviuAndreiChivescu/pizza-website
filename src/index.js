import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import { Menu, Home, Whoops404 } from "./pages"


function UpperSide() {
return (
  <section>
  <div id="upper-first" className="container-fluid p-2 brown-color">
    <img className="d-inline p-2 ms-5" src="https://medievalpizza.com/wp-content/uploads/2021/04/omgggg.png"></img>
    <h5 className="d-inline p-2 float-end me-5 text-secondary">Nu există sentiment mai plăcut în lume decât o cutie de pizza caldă pe picioare.</h5>
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

function UpperSideSecondMenu() {
  return(
    <img className="container-fluid p-0" height="500px" src="https:medievalpizza.com\/wp-content\/uploads\/2021\/04\/341-1-scaled.jpg"></img>
  );
}

function MainMenu() {
  const pizzas =[{"name": "pizza1"}, {"name": "pizza2"}, {"name": "pizza3"}, {"name": "pizza1"}, {"name": "pizza2"}, {"name": "pizza3"}, {"name": "pizza2"}, {"name": "pizza3"}, {"name": "pizza2"}, {"name": "pizza3"}, {"name": "pizza1"}];
  const burgari =[{"name": "burger2"},{"name": "burger1"}];
  const chifle =[{"name": "chifla1"}, {"name": "chifla2"}];
  return(
      <>
      <nav className="d-flex justify-content-between bg-secondary p-3">
        <a href="#">Pizza</a>
        <a href="#">Burgări</a>
        <a href="#">Chifle coapte pe vatră</a> 
        <a href="#">Sandwich</a>  
        <a href="#">Sucuri si Bere</a>   
      </nav>
      <div className="mb-5">
        <ul className="text-white">
          <p>Pizza</p>
          <div className="d-flex flex-wrap">
            {pizzas.map(function(d, idx){
            return (
            <div style={{width: "250px"}} className="m-1 bg-white text-dark">
              <li key={idx}>{d.name}<br></br>Continut<br></br>Pret</li>
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
          <p>Chifle</p>
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
      </> )
}

function CartNotOpened(setPopUp) {
  return(
    <section onClick={setPopUp.setPopUp} style={{cursor: "pointer"}} className="bg-dark text-white d-flex justify-content-between container-fluid position-fixed bottom-0 pe-4 ps-3">
    <button className="btn btn-primary">Open Cart</button>
    <p className="r">Vezi cosul</p>
    <p>20 lei</p>
  </section>
  )
}

function Checkout(setPopUp) {
  return(
    <>
    <section className="container-fluid vh-100 bg-white">
      <h1>This will be the cart</h1>
      <button onClick={setPopUp.setPopUp}>Close cart</button>
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

export {UpperSide, UpperSideSecond, UpperSideSecondMenu, MainMenu, CartNotOpened, Checkout, Slideshow, Main, Footer}
export default App;
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
