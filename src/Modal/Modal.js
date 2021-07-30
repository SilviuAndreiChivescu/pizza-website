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
                <div className="modal-header">
                    <h4 className="modal-title">{props.title}</h4>
                </div>
                <div className="modal-body">{props.children}</div>
                <div className="modal-footer">
                    <button onClick={props.onClose} className="button">Close</button>
                    {/* Submit button if needed <button onClick={props.onSubmit} className="button">Submit</button> */}
                </div>
            </div>
        </div>
        </CSSTransition>,
        document.getElementById('root')
    )
}

export default Modal