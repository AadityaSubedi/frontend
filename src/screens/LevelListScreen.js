// Replace program with the LEVEL

import React, { useEffect, useState } from "react";

import { LinkContainer } from "react-router-bootstrap";
import { Button, Table, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listUsers } from "../actions/userActions";
import { listPrograms, deleteLevel } from "../actions/programActions";

import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { render } from "@testing-library/react";
import { ModalView } from "../components/ModalView";
import { Modal } from "bootstrap";

function LevelListScreen({ history, match }) {
  const dispatch = useDispatch();
  const levelList = useSelector((state) => state.programList);
  const { loading, error, programs } = levelList;

  const levelDelete = useSelector((state) => state.levelDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = levelDelete;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteHandler = (programId) => {
    console.log("fuck off")
    if (window.confirm("Are you sure want to delete this level")) {
      dispatch(deleteLevel(programId));
    }
  };
  useEffect(() => {
    if (userInfo) {
      dispatch(listPrograms());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo, successDelete]);

  const createLevelHandler = (level) => {
    // create program here
  };
  return (
    <div>
      <Row className="align-items-center">
        <Col>
          <h1> Levels</h1>
        </Col>
        <Col className="text-end">
          <Button className="my-3" onClick={handleShow}>
            <i className="fas fa-plus"></i> Add level
          </Button>
        </Col>
      </Row>

    



      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger"> {errorDelete}</Message>}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger"> {error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
            <th>SN</th>
            <th>LEVEL NAME</th>
            <th>LEVEL CODE</th>
            <th></th>
            </tr>
          </thead>
          <tbody>
            {programs.map((program, index) => (
              <tr key={program._id["$oid"]}>
                <td>{index + 1}</td>
                <td>{program.name}</td>
                <td>{program.code}</td>
                <td>
                  <LinkContainer to={`/admin/level/${program._id["$oid"]}`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>

                  <Button variant="danger" className="btn-sm">
                    <i
                      className="fas fa-trash"
                      onClick={() => deleteHandler(program._id["$oid"])}
                    ></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default LevelListScreen;
