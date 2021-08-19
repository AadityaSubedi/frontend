import React from "react";
import { Navbar, Container, Nav, Row, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from '../actions/userActions'


function Header() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
const dispatch = useDispatch()
  const logoutHandler =()=>{

   dispatch(logout())
  }
  return (
    <header>
      <Navbar bg="dark" variant="dark" collapseOnSelect expand="lg">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Syllabus</Navbar.Brand>
            {/* Replace "syllabus" with LOGO  */}
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <LinkContainer to="/updates">
                <Nav.Link>
                  <i className="fas fa-sync-alt"></i>Updates
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
