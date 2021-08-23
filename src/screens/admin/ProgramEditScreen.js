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

function ProgramEditScreen({ match, history }) {
  const programCode = match.params.code;
  let programId = programCode;

  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [subjects, setSubjects] = useState([
    { 1: { 1: { subjects: [] }, 2: { subjects: [] } } },
  ]);

  const [imageUpload, setImageUpload] = useState(false);
  // const [programs, setPrograms] = useState([]);
  // const [uploading, setUploading] = useState(false);
  const [options, setOptions] = useState([
    { label: "Loading...", value: "loading..." },
  ]);
  const dispatch = useDispatch();

  const programDetail = useSelector((state) => state.programDetail);
  const { error, loading, program } = programDetail;

  const programUpdate = useSelector((state) => state.programUpdate);
  const {
    error: errorUpdate,
    loading: loadingUpdate,
    success: successUpdate,
  } = programUpdate;

  useEffect(() => {
    if (successUpdate) {
      // let level  =
      dispatch({ type: PROGRAM_UPDATE_RESET });
      dispatch({ type: PROGRAM_DETAIL_RESET });
      history.push(`/admin/programs/${program.level}`);
    } else {
      // console.log(program, programCode);
      if (!program.name || program.code !== programCode) {
        dispatch(listProgramDetail(programCode));
      } else {
        // get list of the all subjectss

        const fn = async () => {
          try {
            const { data } = await axios.get("/api/subjects");
            let subjects = data["data"];
            setOptions(subjects.map((x) => ({ label: x.code, value: x.code })));
          } catch (error) {
            setOptions([{ label: "error", value: "error" }]);
          }
        };
        fn();
        setName(program.name);
        setCode(program.code);
        setDescription(program.description);

        // setSubjects(
        //   program['semesters'].map((x) => ({ label: x.code, value: x.code }))
        // );

        // [{1:{1:{"subjects":[]}, 2:{"subjects":[]}} }]

        let subject = Object.keys(program.semesters)
          .map(
            (key, index) =>
              key % 2 === 1 && {
                [Math.ceil(key / 2)]: {
                  1: {
                    subjects: program.semesters[key].subjects.map((x) => ({
                      label: x.code,
                      value: x.code,
                    })),
                  },
                  2: {
                    subjects: program.semesters[`${+key + 1}`].subjects.map(
                      (x) => ({
                        label: x.code,
                        value: x.code,
                      })
                    ),
                  },
                },
              }
          )
          .filter((item) => item);
        console.log(subject);
        setSubjects(subject);
      }
    }
  }, [dispatch, program, programCode, history, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();

    // [{1:{1:{"subjects":[
    //   { label: "SH405", value: "SH405" },
    //    { label: "error", value: "error" }
    //   ]
    // }, 2:{"subjects":[]}} }, {2:{1:{"subjects":[]}, 2:{"subjects":[]}} }, {3:{1:{"subjects":[]}, 2:{"subjects":[]}} }]
    // parse the semester data

    // "semesters" : {
    // "1" : { "subjects" : [ "SH401", "CT401" ] },
    // "2" : { "subjects" : [ "SH451", "UH451" ] },
    //  "3" : { "subjects" : [ "SH501", "CT501" ] },
    //  "4" : { "subjects" : [ "EE554", "SH553" ] }
    //  },
    let semesters = {};
    subjects.forEach((item, index) => {
      semesters[index * 2 + 1] = {};
      semesters[index * 2 + 1]["subjects"] = item[index + 1][1]["subjects"].map(
        (item) => item.value
      );
      semesters[index * 2 + 2] = {};
      semesters[index * 2 + 2]["subjects"] = item[index + 1][2]["subjects"].map(
        (item) => item.value
      );
    });

    dispatch(
      updateProgram({
        ...program,
        name,
        code,
        description,
        semesters,
        // programs: programs.map((x) => x.value),
        ...(imageUpload && { file: image }),
      })
    );
  };

  const onSubjectSelect = (index, part, selectedItems) => {
    // here: index is 1 based
    const subject = [...subjects];
    subject[index][index + 1][part]["subjects"] = selectedItems;
    setSubjects(subject);

    // [{1:{1:{"subjects":[]}, 2:{"subjects":[]}} }]
  };

  return (
    // null&&
    <div>
      <Link to="/admin/level">Go Back</Link>

      <FormContainer>
        <h1>Edit Program</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
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
            <Form.Group className="mb-3" controlId="code">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Program Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            Subjects
            {/* render this conditionally  */}
            <p></p>
            <i
              className="fas fa-plus-circle"
              onClick={() => {
                let length = subjects.length;
                setSubjects([
                  ...subjects,
                  {
                    [length + 1]: { 1: { subjects: [] }, 2: { subjects: [] } },
                  },
                ]);
              }}
              style={{ cursor: "pointer" }}
            ></i>
            {/* <i class="fas fa-plus-circle"></i> */}
            Add year
            {subjects.map((item, index) => (
              <>
                <Form.Group key={index}>
                  <center>
                    <Form.Label>{index + 1}.Year</Form.Label>{" "}
                  </center>

                  <Row>
                    <Col>
                      {/* { 1: { 1: { subjects: [] }, 2: { subjects: [] } } }, */}
                      {/* {console.log(item[index + 1][1].subjects)} */}
                      1. Part
                      <MultiSelect
                        options={options}
                        value={item[index + 1][1].subjects}
                        onChange={(selectedItems) => {
                          onSubjectSelect(index, 1, selectedItems);
                        }}
                        labelledBy="Select"
                      />
                    </Col>
                    <Col>
                      2. part
                      <MultiSelect
                        options={options}
                        value={item[index + 1][2].subjects}
                        onChange={(selectedItems) => {
                          onSubjectSelect(index, 2, selectedItems);
                        }}
                        labelledBy="Select"
                      />
                    </Col>
                  </Row>
                </Form.Group>
                <p></p>
              </>
            ))}
            {/*  */}
            {/* <input type="checkbox" id="music" name="interest" value="music">ss</input> */}
            <Form.Group className="mb-3" controlId="code">
              <Form.Label></Form.Label>
              <Form.Check
                type="checkbox"
                label="Wish to upload new Image?"
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
            <Row className="mb-3"></Row>
            <Button variant="primary" type="submit">
              UPDATE
            </Button>
          </Form>
        )}
      </FormContainer>
    </div>
  );
}

export default ProgramEditScreen;
