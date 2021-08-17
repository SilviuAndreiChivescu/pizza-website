import React, { useState } from 'react';
import Axios from 'axios'

function ModalLogic(props) {
    const [numberOfProduct, setNumberOfProduct] = useState(1);

    function IncrementItem() {
        setNumberOfProduct(currClicks => currClicks + 1)
    }
    function DecreaseItem() {
        if (numberOfProduct <= 1) return;
        setNumberOfProduct(currClicks => currClicks - 1)
    }

    const submit = () => {
        Axios.post('http://localhost:3001/insertIntoCart', 
        {Name: props.Name, numberOfProduct: numberOfProduct, Price: props.Price});
        props.setCartList([
            ...props.cartList,
            {Name: props.Name, numberOfProduct: numberOfProduct, Price: props.Price},
        ]);
    };
    
    // useEffect(() => {
    //     Axios.post('http://localhost:3001/api/insertCart', 
    //     {Product: product, How_many: clicks, Price: price})
    //     }, [product]);

    return(
        <div className="row container-fluid">
            <div className="col d-inline-flex fs-3 ps-0">
            <div className=""><button onClick={() => DecreaseItem()} className="border-1 border-dark bg-light rounded-start" style={{width: "50px"}}>-</button></div>
            <div><button className="border-1 border-dark bg-light" style={{width: "50px", pointerEvents: "none"}}>{numberOfProduct}</button></div>
            <div><button onClick={() => IncrementItem()} className="border-1 border-dark bg-light rounded-end" style={{width: "50px"}}>+</button></div>
            </div>
            <div onClick={submit} className="col pe-0 ps-0"><button onClick={props.onClose} className="container-fluid black-bg text-white border border-2 border-dark rounded p-2">Adauga in cos</button></div> 
        </div>
    );

}


export default ModalLogic;