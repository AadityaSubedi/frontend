import React, {useState, useEffect} from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import { Row } from "react-bootstrap";


import Table from 'react-bootstrap/Table'

import { listSubjectDetail } from "../../actions/programActions";
import Loader from "../../components/Loader";
import Message from "../../components/Message";


export default function SubjectScreen() {
  let { code } = useParams();
  let history = useHistory();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listSubjectDetail(code));
  }, [dispatch,code]);

  const subjectDetail = useSelector((state) => state.subjectDetail);
  const { error, loading, subject } = subjectDetail;

  return (
    <div>
      <h1> {} </h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'> {error}</Message>
      ) : (
      <Row>
        <h4>{subject.code}</h4>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Subject Name</th>
              <th>Batch</th>
              <th>Remarks</th>
            </tr>
          </thead>
          <tbody>
          {subject && subject.syllabus && subject.syllabus.map((syllabus, index) => (
            <tr key={index} onClick={()=>history.push({ pathname: `/subject/${subject.code}/${syllabus.batch}`, state: {syllabus: syllabus}})} style ={{'cursor':'pointer'}}>
              <td>{subject.name}</td>
              <td>{syllabus.batch}</td>
              <td>{syllabus.remarks}</td>
            </tr>
          ))}
          </tbody>
        </Table>
        </Row>
      )}
    </div>
  );
}

//               <th>Actions</th>
// <td>
//                 <Link 
//                   to={{
//                     pathname: `/subject/${subject.code}/${syllabus.batch}`
//                     ,state: {
//                       syllabus: syllabus
//                     }
//                   }}
//                 >
//                   View
//                 </Link>
//                   <br/>
//                 <Link to="/">Edit</Link>
//               </td>
