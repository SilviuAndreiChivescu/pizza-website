import iconEmptyBasket from '../images/iconEmptyBasket.svg';
import {useState, useEffect} from 'react';
import Axios from 'axios';

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

    // state to make functionality of buttons to increment or decrease the numberOfProduct
    // const [clicks, setClicks] = useState(1);
    // AICI AM RAMAS ICNERCARND SA FAC LA CART GEN SA SE UPDATEZE SI FRONT-ENDUL DUPA CE DAU UPDATE LA MONGODB
    function IncrementItem(newClicks, id) {
        Axios.put('http://localhost:3001/update', {id: id, newNumberOfProduct: newClicks + 1})

    }
    
    useEffect(() => {
      Axios.get('http://localhost:3001/read').then((response) => {
          props.setProductsList(response.data);
      });
  }, []);
    // function DecreaseItem(id) {
    //     if (clicks < 1) {
    //       Axios.delete(`http://localhost:3001/delete/${id}`)
    //     };
    //     setClicks(currClicks => currClicks - 1)
    // }
  
    return(
      <>
      <section className="container-fluid position-absolute h-100 w-100 overflow-hidden bg-white text-center">
        {/* The below div is only when cart is empty, when not empty, show what I will code with buttons and meal */}
        <div className="text-secondary border-bottom border-2 border-secondary">
          <img className="img-fluid mt-5" src={iconEmptyBasket} style={{width: "70px"}} />
          <h5 className="mb-5">Adauga mancare gustoasa din meniu si apoi plaseaza comanda</h5>
        </div>

        {/* Aici vine productsList NOTE!!!
         change key to id see if it is ok
          I only want to display it for now, after that i have to change to make it find the product if it is already and add to its number
        */}
        {/* {productsList.map((val, key) => {
                return (
                <div key={key}>
                    <h1>{val.Name} for {val.Price}</h1>
                    <input onChange={(event) => setNewName(event.target.value)} type="text" placeholder='New product name'/>
                    <button onClick={() => updateProduct(val._id)}>Update</button>
                    <button onClick={() => deleteProduct(val._id)}>Delete</button>
                </div> 
                );
            })} */}
        {props.productsList.map((val, key) => {
          return (
              <div key={key} className="row container-fluid ">
                    <div className="col d-inline-flex ps-0 justify-content-center pt-3">
                    <p>{val.numberOfProduct} X </p>
                    <p className="ps-2 pe-2">{val.Name}</p>
                    {/* <div className=""><button onClick={() => DecreaseItem(val._id)} className="border-1 border-dark bg-light rounded-start" style={{width: "30px"}}>-</button></div> */}
                    <div><button onClick={() => IncrementItem(val.numberOfProduct, val._id)} className="border-1 border-dark bg-light rounded-end" style={{width: "30px"}}>+</button></div>
                    <p className="ps-2 pe-2">{val.Price}</p>
                    </div>
              </div>
          );
        })}
  
        <div className="mb-5 border-bottom border-2 border-secondary">
          <p className="mt-2">Sub-total: 10lei</p>
          <p className="fw-bold">Total: 20lei</p>
        </div>
        <DeliveryHours />
      </section>
      </>
    )
  }