import { Button, Modal } from "bootstrap";
import { Children, useState, useRef } from "react";



import React from 'react'

function ModalView({ show, handleClose, data, children }) {
  const prog_code = useRef(null);
  const sub_code = useRef(null);
  const sub_name = useRef(null);
  return (
    <div>
      <Modal
        size="sm"
        show={show}
        onHide={handleClose}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title>data.title</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}


        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Post
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default ModalView


