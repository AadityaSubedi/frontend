import React, {useState, useEffect} from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';

import { useDispatch, useSelector } from "react-redux";

import Table from 'react-bootstrap/Table'

import { listSearchData } from "../../actions/programActions";
import Loader from "../../components/Loader";
import Message from "../../components/Message";


export default function SearchScreen() {
  const location = useLocation();
  const dispatch = useDispatch();
  const searchList = useSelector((state) => state.searchList);
  const searchType = location.state.searchType;
  const searchValue = location.state.searchValue;
  const { error, loading, searchData } = searchList;

  useEffect(() => {
    dispatch(listSearchData(searchType, searchValue));
  }, [dispatch,searchType,searchValue]);


  return (
    <div>
      <h1> Search Results </h1>
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
          {searchData.map((subject, key) => (
            subject.syllabus.map((syllabus, index) => (
              <tr key={index}>
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
            ))
          ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

