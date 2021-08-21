import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import FormContainer from "../../components/FormContainer";
import { listPrograms } from "../../actions/programActions";
import MultiSelect from "react-multi-select-component";

function LevelEditScreen({ match, history }) {
  const levelCode = match.params.code;
  let levelId = levelCode;

  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [image, setImage] = useState("");
  const [programs, setPrograms] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [options, setOptions] = useState([{label:"Loading...", value:"loading..."}]);
  const dispatch = useDispatch();

  const programList = useSelector((state) => state.programList);
  const { error, loading, level } = programList;

  // const levelUpdate = useSelector(state => state.levelUpdate)
  // const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = levelUpdate

  useEffect(() => {
    if (!level.name || level.code !== levelCode) {
      dispatch(listPrograms(levelCode));
    } else {
      setName(level.name);
      setCode(level.code);
      setPrograms(level.programs.map((x) => ({ label: x.cpde, value: x.code })));
    }

    // get list of the programs

    const fn = async () => {
        try{
      const { data } =await  axios.get("/api/programs");
      let programs = data['data']
      setOptions(programs.map((x) => ({ label: x.code, value: x.code })));

        }
        catch(error){
            setOptions(({ label:"error", value: "error"}));

        }
    };
    fn();
    // pass a function to map
  }, [dispatch, levelId, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    //wqdwqwdwqd
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
        {/* {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>} */}
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
              {console.log(programs)}
              <MultiSelect 
                options={options}
                value={programs}
                onChange={setPrograms}
                labelledBy="Select"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="code">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Image uplaod"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </Form.Group>

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
