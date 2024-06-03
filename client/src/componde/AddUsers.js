import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navb from './Navb';
import { Form, Button, Container } from 'react-bootstrap';
import './adduser.css';

function AddUser() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    Email: '',
    address: '',
    image: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      Email: formData.Email,
      name: formData.name,
      age: formData.age,
      address: formData.address,
      image: formData.image
    };
    axios.post('http://localhost:5555/api/users', newUser)
      .then((response) => {
        console.log(response.data, response.status);
        alert('User added successfully');
        navigate('/Users');
      })
      .catch((error) => {
        console.error('Error adding user:', error);
        alert('Failed to add user. Please try again.');
      });
  };

  return (
    <div className="form-container">
      <Navb />
      <Container className="form-content">
      <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3 form-group">
            <Form.Label className="form-label">Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Enter name"
              value={formData.name}
              onChange={handleChange}
              required
              className="form-control"
            />
          </Form.Group>

          <Form.Group className="mb-3 form-group">
            <Form.Label className="form-label">Age</Form.Label>
            <Form.Control
              type="number"
              name="age"
              placeholder="Enter age"
              value={formData.age}
              onChange={handleChange}
              required
              className="form-control"
            />
          </Form.Group>

          <Form.Group className="mb-3 form-group">
            <Form.Label className="form-label">Email</Form.Label>
            <Form.Control
              type="email"
              name="Email"
              placeholder="Enter email"
              value={formData.Email}
              onChange={handleChange}
              required
              className="form-control"
            />
          </Form.Group>

          <Form.Group className="mb-3 form-group">
            <Form.Label className="form-label">Address</Form.Label>
            <Form.Control
              type="text"
              name="address"
              placeholder="Enter address"
              value={formData.address}
              onChange={handleChange}
              required
              className="form-control"
            />
          </Form.Group>

          <Form.Group className="mb-3 form-group">
            <Form.Label className="form-label">Image URL</Form.Label>
            <Form.Control
              type="text"
              name="image"
              placeholder="Enter image URL"
              value={formData.image}
              onChange={handleChange}
              required
              className="form-control"
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="btn-primary">
            Add User
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default AddUser;
