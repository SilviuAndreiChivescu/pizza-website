import React from 'react'
import ReactDOM from 'react-dom'
import { CSSTransition } from 'react-transition-group'
import "./Modal.css"

const Modal = props => {

    return ReactDOM.createPortal (
        <CSSTransition
            in={props.show}
            unmountOnExit
            timeout={{ enter: 0, exit: 300 }}
        >
        <div className={`modal ${props.show ? 'show' : ''}`} onClick={props.onClose}>
            <div className="modal-content"  onClick={e => e.stopPropagation()}>
                <div className="black-bg text-white modal-header">
                    <h4 className="modal-title ps-3">{props.title}</h4>
                    <button onClick={props.onClose} className="black-bg text-white border-0">X</button>
                    {/* Submit button if needed <button onClick={props.onSubmit} className="button">Submit</button> */}
                </div>
                <div className="modal-body">{props.children}</div>
                <div className="modal-footer">
                    <div className="row container-fluid">
                        <div className="col d-inline-flex fs-3">
                            {/* HERE I LEFT OF, I WAS DOIGN THE DESIGN OF THE -1+ button for adding items in the modal */}
                            <div><button className="border-1 bg-light">-</button></div>
                            <div>1</div>
                            <div><button className="border-1 bg-light">+</button></div>
                        </div>
                        <div className="col"><button>Adauga in cos</button></div>
                    </div>
                </div>
            </div>
        </div>
        </CSSTransition>,
        document.getElementById('root')
    )
}

export default Modal