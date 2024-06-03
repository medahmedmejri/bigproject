import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navb from './Navb.js';
import Container from 'react-bootstrap/Container';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import { Row, Col, Form, Button, Modal } from 'react-bootstrap';
import './film.css';

function Films() {
  const [films, setFilms] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [formValues, setFormValues] = useState({});
  const [showConfirm, setShowConfirm] = useState(false);
  const [filmToDelete, setFilmToDelete] = useState(null);
  const [searchTitle, setSearchTitle] = useState('');

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5555/api/films');
      setFilms(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEditToggle = (index) => {
    setEditingIndex(index);
    setFormValues(films[index]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      const updatedFilm = { ...formValues };
      await axios.put(`http://localhost:5555/api/films/${films[editingIndex].id}`, updatedFilm);
      const updatedFilms = [...films];
      updatedFilms[editingIndex] = updatedFilm;
      setFilms(updatedFilms);
      setEditingIndex(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5555/api/films/${id}`);
      setFilms(films.filter((film) => film.id !== id));
      setShowConfirm(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  const confirmDelete = (index) => {
    setFilmToDelete(films[index]._id);
    setShowConfirm(true);
  };

  const handleSearchTitleChange = (e) => {
    setSearchTitle(e.target.value);
  };

  const filteredFilms = films.filter(film => (
    film.title.toLowerCase().includes(searchTitle.toLowerCase())
  ));

  return (
    <div className="films-page-bg">
      <Navb />
      <div className="search-bar-container">
        <Form className="d-flex mb-3">
          <Form.Control
            type="search"
            placeholder="Search by title"
            className="me-2"
            aria-label="Search"
            value={searchTitle}
            onChange={handleSearchTitleChange}
          />
        </Form>
      </div>
      <Container className="mt-4">
        <Row className="justify-content-center">
          {filteredFilms.map((film, index) => (
            <Col xs={12} sm={6} md={4} key={index} className="mb-4">
              <div className="film-card border p-3 rounded position-relative">
                <CloseIcon
                  onClick={() => confirmDelete(index)}
                  style={{ cursor: 'pointer', color: 'red', position: 'absolute', top: 0, right: 0, zIndex: 1 }}
                  className="icon-style"
                />
                <div className="d-flex align-items-start">
                  <img
                    src={film.image}
                    alt={`${film.title} poster`}
                    className="img_films rounded mr-3"
                    style={{ width: '70px', height: '70px', objectFit: 'cover' }}
                  />
                  <div className="film-details">
                    {editingIndex === index ? (
                      <Form>
                        <Form.Group className="mb-2">
                          <Form.Label>Title</Form.Label>
                          <Form.Control
                            type="text"
                            name="title"
                            value={formValues.title}
                            onChange={handleChange}
                          />
                        </Form.Group>
                        <Form.Group className="mb-2">
                          <Form.Label>Rating</Form.Label>
                          <Form.Control
                            type="text"
                            name="rating"
                            value={formValues.rating}
                            onChange={handleChange}
                          />
                        </Form.Group>
                        <Form.Group className="mb-2">
                          <Form.Label>Directed By</Form.Label>
                          <Form.Control
                            type="text"
                            name="directed_by"
                            value={formValues.directed_by}
                            onChange={handleChange}
                          />
                        </Form.Group>
                        <Form.Group className="mb-2">
                          <Form.Label>Film Type</Form.Label>
                          <Form.Control
                            type="text"
                            name="film_type"
                            value={formValues.film_type}
                            onChange={handleChange}
                          />
                        </Form.Group>
                        <Form.Group className="mb-2">
                          <Form.Label>Actors</Form.Label>
                          <Form.Control
                            type="text"
                            name="actors"
                            value={formValues.actors}
                            onChange={handleChange}
                          />
                        </Form.Group>
                        <Button variant="primary" onClick={handleUpdate}>
                          Update
                        </Button>
                      </Form>
                    ) : (
                      <>
                        <p><strong>Title:</strong> {film.title}</p>
                        <p><strong>Rating:</strong> {film.rating}</p>
                        <p><strong>Directed By:</strong> {film.directed_by}</p>
                        <p><strong>Film Type:</strong> {film.film_type}</p>
                        <p><strong>Actors:</strong> {Array.isArray(film.actors) ? film.actors.join(', ') : 'No actors listed'}</p>
                      </>
                    )}
                  </div>
                </div>
                <EditIcon
                  onClick={() => handleEditToggle(index)}
                  style={{ cursor: 'pointer', color: 'blue', position: 'absolute', bottom: 10, right: 10 }}
                  className="icon-style"
                />
              </div>
            </Col>
          ))}
          {}
          {filteredFilms.length === 0 && (
            <Col xs={12} className="text-center mt-5">
              <p>No films found</p>
            </Col>
          )}
        </Row>
      </Container>

      <Modal show={showConfirm} onHide={() => setShowConfirm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this film?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirm(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => handleDelete(filmToDelete)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Films;
