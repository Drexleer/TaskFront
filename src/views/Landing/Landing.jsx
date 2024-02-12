import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Login from '../../components/Login/Login';
import Register from '../../components/Register/Register';
import { useNavigate } from 'react-router-dom';
import './Landing.css';

const Landing = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null);

  const navigate = useNavigate();

  const handleCloseModal = () => {
    setShowModal(false);
    setModalType(null);
  };

  const handleShowModal = (type) => {
    setModalType(type);
    setShowModal(true);
  };

  const handleEnter = () => {
    navigate('/home');
  };

  return (
    <div className="landing-container">
      <div className="landing-buttons">
        <button
          className="btn btn-primary"
          onClick={() => handleShowModal('login')}
        >
          Login
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => handleShowModal('register')}
        >
          Register
        </button>
        <button className="btn btn-secondary" onClick={handleEnter}>
          Entrar como invitado
        </button>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {modalType === 'login' ? 'Login' : 'Register'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalType === 'login' && <Login />}
          {modalType === 'register' && <Register />}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Landing;
