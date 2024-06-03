import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navb from './Navb';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import './addfilm.css';

function AddFilms() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    rating: '',
    director: '',
    filmType: '',
    actors: '',
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
    const newfilm = {
      title: formData.title,
      rating: formData.rating,
      image: formData.image,
      directed_by: formData.director,
      film_type: formData.filmType,
      actors: formData.actors
    };
    axios.post('http://localhost:5555/api/films', newfilm).then((response) => {
      console.log(response.data, response.status);
      alert('Film added successfully');
      navigate('/Films');
    });
  };

  return (
    <div>
      <Navb />
      <Container className="form-container">
        <Form onSubmit={handleSubmit} className="form-content">
          <Form.Group className="mb-3 form-group">
            <Form.Label className="form-label">Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              placeholder="Enter title"
              value={formData.title}
              onChange={handleChange}
              required
              className="form-control"
            />
          </Form.Group>

          <Form.Group className="mb-3 form-group">
            <Form.Label className="form-label">Rating</Form.Label>
            <Form.Control
              type="text"
              name="rating"
              placeholder="Enter rating"
              value={formData.rating}
              onChange={handleChange}
              required
              className="form-control"
            />
          </Form.Group>

          <Form.Group className="mb-3 form-group">
            <Form.Label className="form-label">Director</Form.Label>
            <Form.Control
              type="text"
              name="director"
              placeholder="Enter director"
              value={formData.director}
              onChange={handleChange}
              required
              className="form-control"
            />
          </Form.Group>

          <Form.Group className="mb-3 form-group">
            <Form.Label className="form-label">Film Type</Form.Label>
            <Form.Control
              type="text"
              name="filmType"
              placeholder="Enter film type"
              value={formData.filmType}
              onChange={handleChange}
              required
              className="form-control"
            />
          </Form.Group>

          <Form.Group className="mb-3 form-group">
            <Form.Label className="form-label">Actors</Form.Label>
            <Form.Control
              type="text"
              name="actors"
              placeholder="Enter actors"
              value={formData.actors}
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
            Add Film
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default AddFilms;
