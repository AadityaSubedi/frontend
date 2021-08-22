import React, { useState, useEffect } from "react";

import { Row, Col } from "react-bootstrap";
import CardView from "../../components/CardView";

import { useDispatch, useSelector } from "react-redux";
import { listLevels } from "../../actions/programActions";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import Message from "../../components/Message";



function HomeScreen() {
  const dispatch = useDispatch();
  const levelList = useSelector((state) => state.levelList);
  const { error, loading,  levels } = levelList;

  useEffect(() => {
    dispatch(listLevels());
  }, [dispatch]);

  return (
    <div>
      <h1> Levels in Engineering</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'> {error}</Message>
      ) : (
        <Row>
          {levels.map((item, index) => (
            <Col key={index} sm={12} md={6} lg={4} xl={3}>
              <Link to={`/level/${item.code}`}>
                <CardView item={item} />
              </Link>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

export default HomeScreen;
