import React, { Component } from 'react';

//  HERE I LEFT OFF, TRYING TO GET MY CART ITEMS ON THE FIRST PAGE WITH CARTNOTOPENED FIRSTYL
var cartItemsToExport = 0;
class ModalLogic extends Component {
    constructor(props) {
      super(props);
      this.state = {
        clicks:1,
        cartItems:0
      };
    }

    IncrementItem = () => {
        this.setState({ clicks: this.state.clicks + 1 });   
    }
    DecreaseItem = () => {
        if (this.state.clicks == 1) return;
        this.setState({ clicks: this.state.clicks - 1 });
    }

    AddToCart = () => {
        this.setState({ cartItems: this.state.cartItems + this.state.clicks});
        cartItemsToExport = this.state.cartItems;
    }

    render() {
        return (
            <div className="row container-fluid">
                <div className="col d-inline-flex fs-3 ps-0">
                <div className=""><button onClick={this.DecreaseItem} className="border-1 border-dark bg-light rounded-start" style={{width: "50px"}}>-</button></div>
                <div><button className="border-1 border-dark bg-light" style={{width: "50px", pointerEvents: "none"}}>{this.state.clicks}</button></div>
                <div><button onClick={this.IncrementItem} className="border-1 border-dark bg-light rounded-end" style={{width: "50px"}}>+</button></div>
            </div>
            <div onClick={this.AddToCart} className="col pe-0 ps-0"><button onClick={this.props.onClose} className="container-fluid black-bg text-white border border-2 border-dark rounded p-2">Adauga in cos</button></div> 
            </div>
        );
    }
}

export { cartItemsToExport };
export default ModalLogic;