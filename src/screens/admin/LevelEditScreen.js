import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import FormContainer from "../../components/FormContainer";
import { listPrograms, updateLevel } from "../../actions/programActions";
import MultiSelect from "react-multi-select-component";
import {
  LEVEL_UPDATE_RESET,
  PROGRAM_LIST_RESET,
} from "../../constants/programConstants";

function LevelEditScreen({ match, history }) {
  const levelCode = match.params.code;
  let levelId = levelCode;

  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [image, setImage] = useState("");

  const [imageUpload, setImageUpload] = useState(false);
  const [programs, setPrograms] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [options, setOptions] = useState([
    { label: "Loading...", value: "loading..." },
  ]);
  const dispatch = useDispatch();

  const programList = useSelector((state) => state.programList);
  const { error, loading, level } = programList;

  const levelUpdate = useSelector((state) => state.levelUpdate);
  const {
    error: errorUpdate,
    loading: loadingUpdate,
    success: successUpdate,
  } = levelUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: LEVEL_UPDATE_RESET });
      dispatch({ type: PROGRAM_LIST_RESET });
      history.push("/admin/levels");
    } else {
      console.log(level, levelCode);
      if (!level.name || level.code !== levelCode) {
        dispatch(listPrograms(levelCode));
      } else {
        // get list of the programs

        const fn = async () => {
          try {
            const { data } = await axios.get("/api/programs");
            let programs = data["data"];
            setOptions(programs.map((x) => ({ label: x.code, value: x.code })));
          } catch (error) {
            setOptions([{ label: "error", value: "error" }]);
          }
        };
        fn();
        setName(level.name);
        setCode(level.code);
        setPrograms(
          level.programs.map((x) => ({ label: x.code, value: x.code }))
        );
      }
    }
  }, [dispatch, level, levelId, history, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateLevel({
        ...level,
        name,
        code,
        programs: programs.map((x) => x.value),
        ...(imageUpload && {file: image})
      })
    );
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();

    formData.append("image", file);
    formData.append("product_id", levelId);

    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post(
        "/api/products/upload/",
        formData,
        config
      );

      setImage(data);
      setUploading(false);
    } catch (error) {
      setUploading(false);
    }
  };

  return (
    // null&&
    <div>
      <Link to="/admin/level">Go Back</Link>

      <FormContainer>
        <h1>Edit Level</h1>
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
            <Form.Group>
              <Form.Label>Programs</Form.Label>
              <MultiSelect
                options={options}
                value={programs}
                onChange={setPrograms}
                labelledBy="Select"
              />
            </Form.Group>

            {/* <Form.Group className="mb-3" controlId="code">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Image uplaod"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </Form.Group> */}

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
                  onChange={(e) => {setImage(e.target.files[0])}}
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

export default LevelEditScreen;
