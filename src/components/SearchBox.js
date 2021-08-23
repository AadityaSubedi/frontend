import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Row, Col } from "react-bootstrap";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';


function SearchBox({show, setShow, handleClose, handleShow}) {


  const [searchValue, setSearchValue] = useState("");
  const [searchType, setSearchType] = useState("subName");

  const selectHandler = (e) => {
    setSearchType(e.target.value);
  };

  const textHandler = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Search Box</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="g-2">
            <Col md>
              <FloatingLabel controlId="floatingSelectGrid" label="Search by">
                <Form.Select aria-label="Floating label select example" onChange={selectHandler}>
                  <option value="name">Subject Name</option>
                  <option value="code">Subject Code</option>
                </Form.Select>
              </FloatingLabel>
            </Col>
            <Col md>
              <FloatingLabel controlId="floatingInputGrid" label="search box">
                <Form.Control type="text" placeholder="Enter the keyword" onChange={textHandler}/>
              </FloatingLabel>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>
            <Link 
              to={{
                pathname: `/search/?${searchType}=${searchValue}`,
                state: {
                  searchValue: searchValue,
                  searchType: searchType
                }
              }} 
              style={{ color: 'white'}}>
              Search
            </Link>
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default SearchBox;


