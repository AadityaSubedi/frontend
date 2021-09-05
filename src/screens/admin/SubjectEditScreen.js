import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import FormContainer from "../../components/FormContainer";
import { listProgramDetail, updateProgram } from "../../actions/programActions";
import MultiSelect from "react-multi-select-component";
import {
  PROGRAM_UPDATE_RESET,
  PROGRAM_DETAIL_RESET,
} from "../../constants/programConstants";

function SubjectEditScreen({ match, history }) {
  const subjectCode = match.params.code;
  let subjectId = subjectCode;
  let loading = false;

  const [error, setError] = useState("");
  const [subject, setSubject] = useState({});
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [remarks, setRemarks] = useState("");
  const [level, setLevel] = useState("");
  const [syllabus, setSyllabus] = useState([]);
  const [image, setImage] = useState("");
  const [batch, setBatch] = useState("");
  //   const [subjects, setSubjects] = useState([
  //     { 1: { 1: { subjects: [] }, 2: { subjects: [] } } },
  //   ]);

  const [imageUpload, setImageUpload] = useState(false);
  const [newVersion, setNewVersion] = useState(false);
  // const [programs, setPrograms] = useState([]);
  // const [uploading, setUploading] = useState(false);
  //   const [options, setOptions] = useState([
  //     { label: "Loading...", value: "loading..." },
  //   ]);
  //   const dispatch = useDispatch();

  //   const programDetail = useSelector((state) => state.programDetail);
  //   const { error, loading, program } = programDetail;

  //   const programUpdate = useSelector((state) => state.programUpdate);
  //   const {
  //     error: errorUpdate,
  //     loading: loadingUpdate,
  //     success: successUpdate,
  //   } = programUpdate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      // dispatch(listPrograms(levelCode));
      // request the list of subjects
      const fn = async () => {
        try {
          const { data } = await axios.get(`/api/subject/${subjectCode}`);
          // console.log(data);
          let subject = data["data"];
          console.log(data["data"])
          setSubject(subject);
          setName(subject.name);
          setCode(subject.code);
          setSyllabus(subject.syllabus);
          setBatch(subject.syllabus[0] &&subject.syllabus[0].batch )
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

  const submitHandler = (e) => {
    e.preventDefault();
    // let button = e.nativeEvent.submitter.id;
    // let revised  = true
    // if (button ==="update"){
    let revised = newVersion;
    // }

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.access_token}`,
      },
    };

    delete level.image;

    const formData = new FormData();

    formData.append("name", name);
    formData.append("code", code);

    formData.append("remarks", remarks);
    formData.append("revised", revised);

    !revised && formData.append("batch", batch); 
    imageUpload && formData.append("file", image);

    const fn = async () => {
      try {
        const { data } = await axios.put(
          `/api/subject/${subject._id["$oid"]}`,
          formData,
          config
        );
        history.push("/admin/subjects");
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
    // null&&
    <div>
      <Link to="/admin/level">Go Back</Link>

      <FormContainer>
        <h1>Edit Program</h1>
        {/* {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>} */}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Level Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="code">
              <Form.Label>Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Level Code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </Form.Group>

            {/* render this conditionally  */}

            {/* <i class="fas fa-plus-circle"></i> */}

            {/*  */}
            {/* <input type="checkbox" id="music" name="interest" value="music">ss</input> */}

            <Form.Group className="mb-3" controlId="code">
              <Form.Label>Remarks</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Remarks"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="code">
              <Form.Label></Form.Label>
              <Form.Check
                type="checkbox"
                label="Wish to upload new syllabus file ?"
                onChange={() => {
                  setImageUpload(!imageUpload);
                }}
              />
            </Form.Group>

            {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
    <Form.Check type="checkbox" label="Check me out" />
  </Form.Group> */}
            {imageUpload && (
              <Form.Group className="mb-3" controlId="code">
                <Form.Label>Choose Image</Form.Label>
                <Form.Control
                  type="file"
                  name="file"
                  onChange={(e) => {
                    setImage(e.target.files[0]);
                  }}
                  required
                />
              </Form.Group>
            )}

            <Form.Group className="mb-3" controlId="code">
              <Form.Label></Form.Label>
              <Form.Check
                type="checkbox"
                label="Update as NEW?"
                onChange={() => {
                  setNewVersion(!newVersion);
                }}
              />
            </Form.Group>

            {!newVersion && (
              <>
              <Form.Label>Choose Batch</Form.Label>
              <Form.Select onChange={(e) => {
                    setBatch(e.target.value);
                  }} >
              
              {  syllabus.map((item) => (<option>{item.batch}</option>))}

                
              </Form.Select>
              </>
            )}
            <Row className="mb-3">
              <Col>
                <Button variant="primary" type="submit" id="update">
                  UPDATE
                </Button>
              </Col>
            </Row>
          </Form>
        )}
      </FormContainer>
    </div>
  );
}

export default SubjectEditScreen;
