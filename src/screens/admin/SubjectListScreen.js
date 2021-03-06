// Replace program with the LEVEL

import React, { useEffect, useState, useRef } from "react";

import { LinkContainer } from "react-router-bootstrap";
import { Form, Button, Table, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listUsers } from "../../actions/userActions";
import { listPrograms, createProgram } from "../../actions/programActions";

import Loader from "../../components/Loader";
import Message from "../../components/Message";
import FormDialog from "../../components/Modal";
import axios from "axios";

function SubjectListScreen({ history, match }) {
  // const dispatch = useDispatch();
  // const programList = useSelector((state) => state.programList);
  // const { loading, error, level:{programs}, level } = programList;

  // let levelCode = match.params.code

  // const programCreate = useSelector((state) => state.programCreate);
  // const {
  //   loading: loadingCreate,
  //   error: errorCreate,
  //   success: successCreate,
  //   program: createdProgram,
  // } = programCreate;
  //   const programDelete = useSelector((state) => state.programDelete);
  //   const {
  //     loading: loadingDelete,
  //     error: errorDelete,
  //     success: successDelete,
  //   } = programDelete;
  const inputFile = useRef(null);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [subjects, setSubjects] = useState([]);
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);

  const deleteHandler = (subjectId) => {
    if (window.confirm("Are you sure want to delete this subject")) {
      //   dispatch(deleteLevel(programId));
      const fn = async () => {
        try {
          const { data } = await axios.delete(`/api/subject/${subjectId}`);

        } catch (error) {
          setError(
            error.response && error.response.data.detail
              ? error.response.data.detail
              : error.message
          );
        }
      };
      fn();


    }
  };

  useEffect(() => {
    if (userInfo) {
      // dispatch(listPrograms(levelCode));
      // request the list of subjects
      const fn = async () => {
        try {
          const { data } = await axios.get("/api/subjects");
          console.log(data);
          setSubjects(data["data"]);
        } catch (error) {
          setError(
            error.response && error.response.data.detail
              ? error.response.data.detail
              : error.message
          );
        }
      };
      fn();
    } else {
      history.push("/login");
    }
  }, [history, userInfo]); //successDelete]);

  const createSubjectHandler = () => {
    // create program here
    // post request to post a subject
    // dispatch(createProgram(levelCode));


    const fn = async () => {
      try {
        const { data } = await axios.post("/api/subjects");
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

  const bulkSubjectHandler = (e) => {
    // create program here
    // post request to post a subject
    // dispatch(createProgram(levelCode));
    const formData = new FormData();

    var file = e.target.files[0]
    file && formData.append("file", file);
    const fn = async () => {
      try {
        const { data } = await axios.post("/api/bulk/subjects", formData);
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

  const handleClose = (subCode=null,progCode=null,subName=null,) => {
    setShow(false)
    if (subCode && progCode && subName) {
      // send the request
      const fn = async () => {
        const subjectData = {subCode , progCode , subName}
        try {
          const { data } = await axios.post("/api/subjects", subjectData);
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
    }

  };

  return (
    <div>
      <FormDialog show={show} handleClose={handleClose} data={{"title":"add subject"}}>
     </FormDialog>
      <Row className="align-items-center">
        <Col>
          <h1> Subjects </h1>
        </Col>
        <Col className="text-end">
          <Button className="my-3" onClick={() => { setShow(true)}}>
            <i className="fas fa-plus"></i> Create Subject
          </Button>
          <Button className="my-3" onClick={() => inputFile.current.click()}>
            <i class="fa fa-upload"></i> Bulk Upload
          </Button>
          <input
              style={{ display: "none" }}
              // accept=".zip,.rar"
              ref={inputFile}
              onChange={bulkSubjectHandler}
              type="file"
            />

        </Col>
      </Row>
      {/* 
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger"> {errorDelete}</Message>} */}

      {/*  error ? (
        <Message variant="danger"> {error}</Message> */}
      {console.log(error)}
      {error ? (
        <Message variant="danger"> {error}</Message>
      ) : !subjects.length ? (
        <Loader />
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>SN</th>
              <th>SUBJECT NAME</th>
              <th>SUBJECT CODE</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* {console.log(subjects)} */}
            {subjects.map((program, index) => (
              <tr key={program._id["$oid"]}>
                <td>{index + 1}</td>
                <td
                  onClick={() => history.push(`/admin/program/${program.code}`)}
                  style={{ cursor: "pointer" }}
                >
                  {program.name}
                </td>
                <td>{program.code}</td>
                <td>
                  <LinkContainer to={`/admin/edit/subject/${program.code}`}>
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

export default SubjectListScreen;
