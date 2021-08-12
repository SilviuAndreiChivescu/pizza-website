import React, { useState, useEffect } from 'react';
import Axios from 'axios'

function ModalLogic(props) {
    const [clicks, setClicks] = useState(1);

    function IncrementItem() {
        setClicks(currClicks => currClicks + 1)
    }
    function DecreaseItem() {
        if (clicks <= 1) return;
        setClicks(currClicks => currClicks - 1)
    }

    const submit = () => {
        Axios.post('http://localhost:3001/api/insertCart', 
        {Product: props.title, How_many: clicks, Price: props.Price})
        // This below is: we are pushing inside our products array, the new insert so that you don't need to refresh page in order to get new info [dont know if I need it here]
        // setProducts([
        //     ...products,
        //     {Name: Name, Price: Price},
        // ]);

    };
    // useEffect(() => {
    //     Axios.post('http://localhost:3001/api/insertCart', 
    //     {Product: product, How_many: clicks, Price: price})
    //     }, [product]);

    return(
        <div className="row container-fluid">
            <div className="col d-inline-flex fs-3 ps-0">
            <div className=""><button onClick={() => DecreaseItem()} className="border-1 border-dark bg-light rounded-start" style={{width: "50px"}}>-</button></div>
            <div><button className="border-1 border-dark bg-light" style={{width: "50px", pointerEvents: "none"}}>{clicks}</button></div>
            <div><button onClick={() => IncrementItem()} className="border-1 border-dark bg-light rounded-end" style={{width: "50px"}}>+</button></div>
            </div>
            <div onClick={submit} className="col pe-0 ps-0"><button onClick={props.onClose} className="container-fluid black-bg text-white border border-2 border-dark rounded p-2">Adauga in cos</button></div> 
        </div>
    );

}


export default ModalLogic;