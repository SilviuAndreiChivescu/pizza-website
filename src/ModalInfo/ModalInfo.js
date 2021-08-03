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
                    <div className="modalInfo-header black-bg text-white">
                        <h4 className="modalInfo-title">{props.title}</h4>
                    </div>
                    <div className="modalInfo-body">{props.children}</div>
                    <div className="moadalInfo-footer">
                        <button onClick={props.onClose} className="button">Close</button>
                    </div>
                </div>
            </div>
        </CSSTransition>,
        document.getElementById('root')
    )
}

export default modalInfo