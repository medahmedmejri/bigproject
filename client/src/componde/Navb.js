import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';

function Navb() {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" className="fixed-top">
        <Container>
          <Navbar.Brand onClick={() => handleNavigate('/')}>Dashboard</Navbar.Brand>
          <Nav className="me-auto">
            <NavDropdown title="User" id="homeusers-dropdown">
              <NavDropdown.Item onClick={() => handleNavigate('/Users')}>
                Users
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleNavigate('/AddUser')}>
                AddUser
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Film" id="homefilms-dropdown">
              <NavDropdown.Item onClick={() => handleNavigate('/Films')}>
                Films
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleNavigate('/AddFilms')}>
                AddFilm
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Container>
      </Navbar>
      <div style={{ paddingTop: '56px' }}>
        {}
      </div>
    </>
  );
}

export default Navb;
