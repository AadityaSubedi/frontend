import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import FormContainer from "../../components/FormContainer";
import { createBulkSyllabus } from "../../actions/programActions";

function SyllabusBulkScreen({ match, history }) {
  const levelCode = match.params.code;
  let levelId = levelCode;
  const [syllabus, setSyllabus] = useState([]);
  const [datafile, setDatafile] = useState("");

  const [subLevel, setLevel] = useState(false);
  const dispatch = useDispatch();

  const bulkSyllabusCreate = useSelector((state) => state.bulkSyllabusCreate);
  const { error, loading, bulk } = bulkSyllabusCreate;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createBulkSyllabus({
        subLevel,
        datafile,
        syllabus,
      })
    );
  };

  return (
    // null&&
    <div>
      <Link to="/admin/level">Go Back</Link>

      <FormContainer>
        <h1>Create Bulk Syllabus</h1>
        {loading && <Loader />}
        {error && <Message variant="danger">{error}</Message>}
          <Form onSubmit={submitHandler}>
           

              <Form.Group className="mb-3" controlId="code">
                <Form.Label></Form.Label>
                <Form.Check
                  type="checkbox"
                  label="Select the box for uploading Masters Syllabus"
                  onChange={() => {
                    setLevel(!subLevel);
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="code">
                <Form.Label>Select the csv file of syllabus data</Form.Label>
                <Form.Control
                  type="file"
                  name="csv_file"
                  onChange={(e) => {setDatafile(e.target.files[0])}}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="code">
                <Form.Label>Select the syllabus pdf files</Form.Label>
                <Form.Control
                  type="file"
                  name="syllabus"
                  onChange={(e) => {setSyllabus(e.target.files)}}
                  multiple
                  required
                />
              </Form.Group>

            <Row className="mb-3"></Row>

            <Button variant="primary" type="submit">
              CREATE
            </Button>
          </Form>
      </FormContainer>
    </div>
  );
}

export default SyllabusBulkScreen;
