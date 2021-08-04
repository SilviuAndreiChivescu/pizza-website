import React from 'react'
import ReactDOM from 'react-dom'
import { CSSTransition } from 'react-transition-group'
import "./ModalInfo.css"

const modalInfo = props => {

    return ReactDOM.createPortal(
        <CSSTransition
            in={props.show}
            unmountOnExit
            timeout={{ enter: 0, exit: 300 }}
        >
            <div className={`modalInfo ${props.show ? 'showInfo' : ''}`} onClick={props.onClose}>
                <div className="modalInfo-content" onClick={e => e.stopPropagation()}>
                    <div className="modalInfo-header black-bg text-white d-inline-flex w-100 justify-content-between p-3">
                        <h4 className="modalInfo-title ps-3">{props.title}</h4>
                        <button onClick={props.onClose} className="black-bg text-white border-0 pe-3 fs-4">X</button>
                    </div>
                    <div style={{backgroundColor: "#efeff4"}} className="modalInfo-body">
                        <div className="m-4 p-4 shadow bg-white">
                            <div className="border-bottom"><p>Contact</p></div>
                            <div style={{lineHeight: "1.2"}} className="pt-2">
                                <p className="fw-bold">Pizzeria Medieval</p>
                                <p className="">Str. Petru Maior 20, Mangalia, 905500(In spatele Scolii nr.2)</p>
                                <a className="text-decoration-none text-dark" href="tel:0754911062"><p><i className="fas fa-lg fa-phone-square me-2"></i>0754 911 062</p></a>
                                <a className="text-decoration-none text-dark" href="tel:0790649803"><p><i className="fas fa-lg fa-phone-square me-2"></i>0790 649 803</p></a>
                            </div>
                        </div>
                        <div className="m-4 p-4 shadow bg-white">
                            <div className="border-bottom"><p>Orar de livrari</p></div>
                            <div className="pt-2"><p>Luni-Duminica: 9:00-23:00</p></div>
                        </div>
                    </div>
                    <div className="moadalInfo-footer">
                    </div>
                </div>
            </div>
        </CSSTransition>,
        document.getElementById('root')
    )
}

export default modalInfo