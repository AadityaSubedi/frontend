// Replace program with the LEVEL

import React, { useEffect, useState, useRef } from "react";

import { LinkContainer } from "react-router-bootstrap";
import { Button, Table, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listUsers } from "../../actions/userActions";
import {
  listLevels,
  deleteLevel,
  createLevel,
} from "../../actions/programActions";

import Loader from "../../components/Loader";
import Message from "../../components/Message";
import FormContainer from "../../components/FormContainer";
import { render } from "@testing-library/react";
import { ModalView } from "../../components/ModalView";
import { Modal } from "bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

function LevelListScreen({ history, match }) {

  const inputFile = useRef(null);
  const [error2, setError] = useState("");
  const dispatch = useDispatch();
  const levelList = useSelector((state) => state.levelList);
  const { loading, error, levels: programs } = levelList;

  const levelCreate = useSelector((state) => state.levelCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    level: createdLevel,
  } = levelCreate;

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
    if (window.confirm("Are you sure want to delete this level")) {
      dispatch(deleteLevel(programId));
    }
  };
  useEffect(() => {
    if (userInfo) {
      dispatch(listLevels());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo, successCreate, successDelete]);

  const createLevelHandler = (level) => {
    // create program here
    dispatch(createLevel());
  };


  const bulkProgramHandler = (e) => {
    // create program here
    // post request to post a subject
    // dispatch(createProgram(levelCode));
    const formData = new FormData();

    var file = e.target.files[0]
    formData.append("file", file);
    const fn = async () => {
      try {
        const { data } = await axios.post("/api/bulk/programs", formData);
        window.location.reload()

      } catch (error) {
        setError(
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        );
      }
    };
    fn();
  };

  return (
    // null &&
    <div>
      <Row className="align-items-center">
        <Col>
          <h1> Levels</h1>
        </Col>
        <Col className="text-end">
          <Button className="my-3" onClick={() => inputFile.current.click()}>
            <i className="fas fa-upload"></i> Bulk Programs
          </Button>
          <input
            style={{ display: "none" }}
            // accept=".zip,.rar"
            ref={inputFile}
            onChange={bulkProgramHandler}
            type="file"
          />
        </Col>
      </Row>

      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger"> {errorDelete}</Message>}

      {loading ? (
        <Loader />
      ) : error || error2 ? (
        <Message variant="danger"> {error || error2}</Message>
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

                <td>{index + 1}.</td>

                <td onClick={() => history.push(`/admin/programs/${program.code}`)} style={{ 'cursor': 'pointer' }}>{program.name}</td>

                <td>{program.code}</td>

                <td>
                  <LinkContainer to={`/admin/edit/level/${program.code}`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>

                  <Button variant="danger" className="btn-sm" onClick={() => deleteHandler(program._id["$oid"])}>
                    <i className="fas fa-trash">

                    </i>
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
