import iconEmptyBasket from '../images/iconEmptyBasket.svg';

export default function CartOpen(props) {
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