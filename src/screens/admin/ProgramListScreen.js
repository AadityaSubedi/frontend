// Replace program with the LEVEL

import React, { useEffect, useState } from "react";

import { LinkContainer } from "react-router-bootstrap";
import { Button, Table, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listUsers } from "../../actions/userActions";
import {
  listPrograms,
  createProgram,

} from "../../actions/programActions";

import Loader from "../../components/Loader";
import Message from "../../components/Message";
import FormContainer from "../../components/FormContainer";
import { render } from "@testing-library/react";
import { ModalView } from "../../components/ModalView";
import { Modal } from "bootstrap";

function ProgramListScreen({ history, match }) {
  const dispatch = useDispatch();
  const programList = useSelector((state) => state.programList);
  const { loading, error, level:{programs}, level } = programList;


  let levelCode = match.params.code 

  const programCreate = useSelector((state) => state.programCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    program: createdProgram,
  } = programCreate;
//   const programDelete = useSelector((state) => state.programDelete);
//   const {
//     loading: loadingDelete,
//     error: errorDelete,
//     success: successDelete,
//   } = programDelete;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteHandler = (programId) => {
    if (window.confirm("Are you sure want to delete this level")) {
    //   dispatch(deleteLevel(programId));
    }
  };
  useEffect(() => {
    if (userInfo) {
      dispatch(listPrograms(levelCode));
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo, successCreate, ]);//successDelete]);

  const createProgramHandler = () => {
    // create program here

  //  this is infact, updating the level with new program added 
    dispatch(createProgram(levelCode));
  };
  return (
    levelCode === level.code &&
    <div>
      <Row className="align-items-center">
        <Col>
          <h1> Programs in {levelCode}</h1>
        </Col>
        <Col className="text-end">
          <Button className="my-3" onClick={createProgramHandler}>
            <i className="fas fa-plus"></i> Add program
          </Button>
        </Col>
      </Row>
{/* 
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger"> {errorDelete}</Message>} */}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger"> {error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>SN</th>
              <th>PROGRAM NAME</th>
              <th>PROGRAM CODE</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {console.log(programs)}
            {programs.map((program, index) => (
              <tr key={program._id["$oid"]}>
                <td>{index + 1}</td>
                <td onClick={()=>history.push(`/admin/program/${program.code}`)} style ={{'cursor':'pointer'}}>{program.name}</td>
                <td>{program.code}</td>
                <td>
                  <LinkContainer to={`/admin/edit/program/${program.code}`}>
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

export default ProgramListScreen;
