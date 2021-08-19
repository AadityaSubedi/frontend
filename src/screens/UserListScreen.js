import React, { useEffect, useState } from "react";

import { LinkContainer } from "react-router-bootstrap";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listUsers } from "../actions/userActions";

import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";


function UserListScreen({history}) {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;


  const userLogin = useSelector((state) => state.userLogin);
  const {  userInfo } = userLogin;


  const deleteHandler = (userId)=>{
      console.log("handle user deletion here") 
  }
  useEffect(() => {

    if (userInfo)
    {
    dispatch(listUsers());
    }
    else {
    history.push('/login')
    }
  }, [dispatch, history]);

  return (
    <div>
      <h1> Users</h1>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger"> {error}</Message>
      ) : (
        <Table striped bordered hover responsive className ='table-sm'>
            <thead>
            <th>SN</th>
                <th>USERNAME</th>
                <th>EMAIL</th>
                <th></th>
            </thead>
<tbody>
    {users.map(
        (user, index)=>(
            <tr key= {user._id['$oid']}>
                <td>{index+1}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                    <LinkContainer to = {`/admin/user/${user._id['$oid']}`}>
                        <Button variant ='light' className='btn-sm'>
                            <i className='fas fa-edit'></i>
                        </Button>
                    </LinkContainer>


                    <Button variant ='danger' className='btn-sm'>
                            <i className='fas fa-trash' onClick = {()=>deleteHandler(user._id['$oid'])}></i>
                        </Button>

                </td>

            </tr>
        )
    )}
</tbody>

        </Table>
      )}
    </div>
  );
}

export default UserListScreen;
