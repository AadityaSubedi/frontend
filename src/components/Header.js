import React, {useState} from "react";
import { Navbar, Container, Nav, Row, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Button from 'react-bootstrap/Button';

import SearchBox from "./SearchBox";
import { logout } from '../actions/userActions';


function Header() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();
  const logoutHandler =()=>{
    dispatch(logout())
  }

  return (
    <header>
      <SearchBox show={show} setShow={setShow} handleClose={handleClose} handleShow={handleShow} />
      <Navbar bg="dark" variant="dark" collapseOnSelect expand="lg">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Syllabus</Navbar.Brand>
            {/* Replace "syllabus" with LOGO  */}
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <LinkContainer to="/updates" >
                <Nav.Link>
                  <i className="fas fa-sync-alt"></i>Updates
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/updates" onClick={handleShow} >
                <Nav.Link>
                  <i className="fas fa-search"></i>Search
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <>
                {/* <i className="fas fa-user"></i> */}
                <NavDropdown title={userInfo.sub} id="username">
                  <LinkContainer to="/admin/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/users">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to="/admin/levels">
                    <NavDropdown.Item>Edit Syllabus</NavDropdown.Item>
                  </LinkContainer>


                  <LinkContainer to="/admin/subjects">
                    <NavDropdown.Item>Subjects</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>Log out</NavDropdown.Item>

                </NavDropdown>
                </>
              ) : (
                <LinkContainer to="/login">
                <Nav.Link>
                  <i className="fas fa-user"></i>Login
                </Nav.Link>
              </LinkContainer>
              )}

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
