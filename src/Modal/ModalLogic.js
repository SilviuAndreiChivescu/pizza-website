import React, { Component, useState } from 'react';


function ModalLogic(onClose) {
    const [clicks, setClicks] = useState(1);

    function IncrementItem() {
        setClicks(parseInt(clicks) + 1)
    }
    function DecreaseItem() {
        if (clicks <= 1) return;
        setClicks(parseInt(clicks) - 1)
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
            <div onClick={() => {RefreshPage(); AddToCart()}} className="col pe-0 ps-0"><button onClick={onClose.onClose} className="container-fluid black-bg text-white border border-2 border-dark rounded p-2">Adauga in cos</button></div> 
        </div>
    );

}


// class ModalLogic extends Component {
//     constructor(props) {
//       super(props);
//       this.state = {
//         clicks:1,
//         cartItems:0
//       };
//     }

//     RefreshPage = () =>{
//         window.location.reload();
//     }

//     IncrementItem = () => {
//         this.setState({ clicks: this.state.clicks + 1 });   
//     }
//     DecreaseItem = () => {
//         if (this.state.clicks == 1) return;
//         this.setState({ clicks: this.state.clicks - 1 });
//     }

//     AddToCart = () => {
//         this.setState({ cartItems: this.state.cartItems + this.state.clicks});
//         window.localStorage.setItem('myCartItems', this.state.clicks);
//     }

//     render() {
//         return (
//             <div className="row container-fluid">
//                 <div className="col d-inline-flex fs-3 ps-0">
//                 <div className=""><button onClick={this.DecreaseItem} className="border-1 border-dark bg-light rounded-start" style={{width: "50px"}}>-</button></div>
//                 <div><button className="border-1 border-dark bg-light" style={{width: "50px", pointerEvents: "none"}}>{this.state.clicks}</button></div>
//                 <div><button onClick={this.IncrementItem} className="border-1 border-dark bg-light rounded-end" style={{width: "50px"}}>+</button></div>
//             </div>
//             <div onClick={this.AddToCart} className="col pe-0 ps-0"><button onClick={this.props.onClose} className="container-fluid black-bg text-white border border-2 border-dark rounded p-2">Adauga in cos</button></div> 
//             </div>
//         );
//     }
// }

export default ModalLogic;