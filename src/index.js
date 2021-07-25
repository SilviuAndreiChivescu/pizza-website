import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import './App.css';

function UpperSide() {
return (
  <div className="container-fluid">
    <p className="d-inline p-2">MEDIEVAL PIZZA</p>
    <p className="d-inline p-2 float-right">We make food with love, not love with food</p>
    <hr color="red" width="80%"></hr>
    <h2>We are now open for ONLINE ORDERS!</h2>
  </div>);
}

function Button() {
return (
  <button>Meniu & Comanda</button>
);
}


function Slideshow() {
  const pictures = ["https:\/\/medievalpizza.com\/wp-content\/uploads\/2021\/04\/341-1-scaled.jpg", "https:\/\/medievalpizza.com\/wp-content\/uploads\/2021\/04\/226-1-scaled-e1617704481484.jpg", "https:\/\/medievalpizza.com\/wp-content\/uploads\/2021\/04\/12183-scaled-e1617704565414.jpg", "https:\/\/medievalpizza.com\/wp-content\/uploads\/2021\/04\/8117-scaled.jpg"];
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
            className="slide"
            key={index}
            src={img}
            alt="new">
            </img>
        ))}
      </div>

    </div>
  );
}

function MiddleSide() {
return (
  <div>
    <h3>Pizza</h3>
    <img width="620" height="930" src="https://medievalpizza.com/wp-content/uploads/2021/04/237-683x1024.jpg" alt="Pizza"></img>
    <h3>Burgers</h3>
    <img width="620" height="931" src="https://medievalpizza.com/wp-content/uploads/2021/04/2141-682x1024.jpg" alt="Burgers"></img>
    <h3>Chifle</h3>
    <img width="620" height="931" src="https://medievalpizza.com/wp-content/uploads/2021/04/2366-682x1024.jpg"></img>
  </div>
  );
}

function Footer() {
  return (
    <footer>
    <div>
      <p>905500 Str. Petru Maior 20, Mangalia ( In spatele Scolii nr.2 )
+40754 911 062
+40790 649 803
9:00 - 23:00 Luni - Duminica</p>
    </div>
    </footer>
  );
}

function App() {
  return (
    <>
    <body>
    <UpperSide></UpperSide>
    <Button></Button>
    <Slideshow></Slideshow>
    <MiddleSide></MiddleSide>
    <Footer></Footer>
    </body>
    </>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

export default App;
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
