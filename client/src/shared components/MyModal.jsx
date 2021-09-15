import { Modal } from "react-bootstrap";
import React from "react";

export default function MyModal(props) {
  const { onClose, name, children } = props;
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
        closeVariant="white"
        className="black-bg text-white"
      >
        <Modal.Title id="contained-modal-title-vcenter">{name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
}
