import React, {useState, useEffect} from 'react';
import { useParams, Link, useLocation, useHistory } from 'react-router-dom';

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
  let history = useHistory();

  useEffect(() => {
    console.log("searchType, searchValue")
    dispatch(listSearchData(searchType, searchValue));
  }, [dispatch,searchType,searchValue]);

  return (
    <div>
      Search
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
            </tr>
          </thead>
          <tbody>
          { searchData && searchData.map((subject, key) => (
            subject.syllabus.map((syllabus, index) => (
              <tr key={index} onClick={()=>history.push({ pathname: `/subject/${subject.code}/${syllabus.batch}`, state: {syllabus: syllabus}})} style ={{'cursor':'pointer'}}>
                <td>{subject.name}</td>
                <td>{subject.code}</td>
                <td>{syllabus.batch}</td>
                <td>{syllabus.remarks}</td>
              </tr>
            ))
          ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

