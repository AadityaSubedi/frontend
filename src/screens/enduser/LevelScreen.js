import React, { useState, useEffect } from "react";

import { Row, Col } from "react-bootstrap";
import CardView from "../../components/CardView";

import { useDispatch, useSelector } from "react-redux";
import { listPrograms } from "../../actions/programActions";
import { Link, useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import Message from "../../components/Message";

function LevelScreen(props) {
  const dispatch = useDispatch();
  const programList = useSelector((state) => state.programList);
  const { error, loading, level:{programs}} = programList;
 
  const { level } = useParams();

  useEffect(() => {
    dispatch(listPrograms(level));

  }, [dispatch]);

  return (
    <div>
      <Link to="/" className="btn btn-light my-3">
        {" "}
        Go Back
      </Link>
      <h1> Programs in {level}</h1>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger"> {error}</Message>
      ) : (
        // null &&
         (
          <Row>
            {programs.map((item, index) => (
              <Col key={index} sm={12} md={6} lg={4} xl={3}>
                <Link to={`/program/${item.code}`}>
                  <CardView item={item} />
                </Link>
              </Col>
            ))}
          </Row>
        )
      )}
    </div>
  );
}

export default LevelScreen;
