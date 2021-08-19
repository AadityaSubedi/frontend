import React, { useState, useEffect, useRef } from "react";
import {
  Col,
  Row,
  Image,
  ListGroup,
  Button,
  Card,
  Accordion,
} from "react-bootstrap";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { listProgramDetail } from "../actions/programActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
function ProgramScreen({ match }) {
  let code = match.params.code;
  let gobackto = "/level";
  gobackto += code.startsWith("B") ? "/BE" : "/M.Sc";
  // make this dynamic : ahile lai hardcoded xa 
  const number2word = ["", "First", "Second", "Third", "Fourth", "Fifth"];

  const dispatch = useDispatch();
  const programDetail = useSelector((state) => state.programDetail);
  const { error, loading, program } = programDetail;
  let reference = useRef();



  useEffect(() => {
    dispatch(listProgramDetail(code));
  }, [dispatch,code]);

  return (
    // null&&
    <div>
      <Link to={gobackto} className="btn btn-light my-3">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <h1>
            {console.log(program)}
            IOE Syllabus of {program.name} ({program.code})
          </h1>
          <Col md={6}>
            <Image src={`/images/${program.image}`} alt={program.name}  />
          </Col>
          <Col md={6}>
            <ListGroup variant="flush">
              <ListGroup.Item>{program.description}</ListGroup.Item>
            </ListGroup>
          </Col>

          <Accordion defaultActiveKey="1" flush ref ={reference} >
            {program.semesters &&
              Object.keys(program.semesters).map((key, index) => (
                <Accordion.Item eventKey={key} key={key}>
                  <Accordion.Header>
                    <h5>
                      {number2word[Math.ceil(key / 2)]} year{" "}
                      {number2word[key % 2 || 2]} part
                    </h5>
                  </Accordion.Header>
                  <Accordion.Body>
                    <ListGroup variant="flush">
                      {program.semesters[key]["subjects"].map((item, index) => (
                        <>
                          <Link
                            to={`/subject/${item.code}`}
                            style={{ "textDecoration": "none" }}
                          >
                            <ListGroup.Item
                             key={item.code} 
                             action>
                              {index + 1}.{item.name} [{item.code}]
                            </ListGroup.Item>
                          </Link>
                        </>
                      ))}
                    </ListGroup>
                  </Accordion.Body>
                </Accordion.Item>
              ))}
          </Accordion>
        </Row>
      )}
    </div>
  );
}

export default ProgramScreen;
