import React, { useState } from 'react';


function ModalLogic(props) {
    const [clicks, setClicks] = useState(1);

// Am ramas aici unde ma gandeam cum sa fac gen cu cart db si/sau localStorage gen sa iau mancarea de pe modal sa o bag undeva sa o am in cart si in cartnotopened
    function IncrementItem() {
        setClicks(currClicks => currClicks + 1)
    }
    function DecreaseItem() {
        if (clicks <= 1) return;
        setClicks(currClicks => currClicks - 1)
    }
    function AddToCart() {
        if (window.localStorage.getItem('myCartItems') != null) {
            var items = parseInt(window.localStorage.getItem('myCartItems'));
            items += clicks;
            window.localStorage.setItem('myCartItems', items);
        }
        else window.localStorage.setItem('myCartItems', clicks);

    }
    // Refresh page to get the actual number of cartItems in the <CartNotOpened />
    function RefreshPage() {
        window.location.reload();
    }

    return(
        <div className="row container-fluid">
            <div className="col d-inline-flex fs-3 ps-0">
            <div className=""><button onClick={() => DecreaseItem()} className="border-1 border-dark bg-light rounded-start" style={{width: "50px"}}>-</button></div>
            <div><button className="border-1 border-dark bg-light" style={{width: "50px", pointerEvents: "none"}}>{clicks}</button></div>
            <div><button onClick={() => IncrementItem()} className="border-1 border-dark bg-light rounded-end" style={{width: "50px"}}>+</button></div>
            </div>
            <div onClick={() => {RefreshPage(); AddToCart()}} className="col pe-0 ps-0"><button onClick={props.onClose} className="container-fluid black-bg text-white border border-2 border-dark rounded p-2">Adauga in cos</button></div> 
        </div>
    );

}


export default ModalLogic;