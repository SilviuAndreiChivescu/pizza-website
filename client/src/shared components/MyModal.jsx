import { Modal } from "react-bootstrap";
import React from "react";

export default function MyModal(props) {
  const { onClose, Name } = props;
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="true"
      onHide={onClose}
    >
      <Modal.Header
        closeButton
        closeLabel
        closeVariant="white"
        toggle={onClose}
        className="black-bg text-white"
      >
        <Modal.Title id="contained-modal-title-vcenter">{Name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.children}</Modal.Body>
    </Modal>
  );
}
