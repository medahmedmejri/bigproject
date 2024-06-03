import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navb from './Navb';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import CloseIcon from '@mui/icons-material/Close';
import { Row, Col } from 'react-bootstrap';
import './user.css';
import { Modal, Button } from 'react-bootstrap';

function Users() {
  const [users, setUsers] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [searchName, setSearchName] = useState('');
  const [searchAge, setSearchAge] = useState('');

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5555/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = (id) => {
    try {
      axios.delete(`http://localhost:5555/api/users/${id}`);
      setUsers(users.filter(user => user._id !== id));
      setShowConfirm(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  const confirmDelete = (index) => {
    setUserToDelete(users[index]._id); 
    setShowConfirm(true);
  };

  const handleSearchNameChange = (e) => {
    setSearchName(e.target.value);
  };

  const handleSearchAgeChange = (e) => {
    setSearchAge(e.target.value);
  };

  const filteredUsers = users.filter(user => {
    return (
      (user.name.toLowerCase().includes(searchName.toLowerCase()) || searchName === '') &&
      (user.age.toString().includes(searchAge) || searchAge === '')
    );
  });

  return (
    <div className="users-page-bg">
      <Navb />
      <div className="search-bar-container">
        <Form className="d-flex mb-3">
          <Form.Control
            type="search"
            placeholder="Search by name"
            className="me-2"
            aria-label="Search"
            value={searchName}
            onChange={handleSearchNameChange}
          />
          <Form.Control
            type="search"
            placeholder="Search by age"
            className="me-2"
            aria-label="Search"
            value={searchAge}
            onChange={handleSearchAgeChange}
          />
        </Form>
      </div>
      <Container className="mt-4">
        <Row className="justify-content-center">
          {filteredUsers.map((user, index) => (
            <Col xs={12} key={index} className="mb-4">
              <div className="user-card border p-3 rounded position-relative d-flex align-items-center">
                <CloseIcon
                  onClick={() => confirmDelete(index)}
                  style={{ cursor: 'pointer', color: 'red', position: 'absolute', top: 0, right: 0, zIndex: 1 }}
                  className="icon-style"
                />
                <img
                  src={user.image}
                  alt={`${user.name}'s profile`}
                  className="img_users rounded mr-3"
                  style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                />
                <div className="user-details d-flex flex-row">
                  <p><strong>Name:</strong> {user.name}</p>
                  <p><strong>Age:</strong> {user.age}</p>
                  <p><strong>Email:</strong> {user.Email}</p>
                  <p><strong>Address:</strong> {user.adress}</p>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>

      <Modal show={showConfirm} onHide={() => setShowConfirm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this user?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirm(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => handleDelete(userToDelete)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Users;
