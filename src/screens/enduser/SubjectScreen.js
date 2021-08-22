import React, {useState, useEffect} from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";


import Table from 'react-bootstrap/Table'

import { listSubjectDetail } from "../../actions/programActions";
import Loader from "../../components/Loader";
import Message from "../../components/Message";


export default function SubjectScreen() {
  const { code } = useParams();
  const dispatch = useDispatch();
  const subjectDetail = useSelector((state) => state.subjectDetail);
  const { error, loading, subject } = subjectDetail;

  useEffect(() => {
    dispatch(listSubjectDetail(code));
  }, [dispatch,code]);

  return (
    <div>
      <h1> {} </h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'> {error}</Message>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Subject Name</th>
              <th>Subject Code</th>
              <th>Batch</th>
              <th>Remarks</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          {subject.syllabus.map((syllabus, key) => (
            <tr key={key}>
              <td>{subject.name}</td>
              <td>{subject.code}</td>
              <td>{syllabus.batch}</td>
              <td>{syllabus.remarks}</td>
              <td>
                <Link 
                  to={{
                    pathname: `/subject/${subject.code}/${syllabus.batch}`
                    ,state: {
                      syllabus: syllabus
                    }
                  }}
                >
                  View
                </Link>
                  <br/>
                <Link to="/">Edit</Link>
              </td>
            </tr>
          ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

