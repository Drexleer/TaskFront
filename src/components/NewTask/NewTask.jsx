import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTask } from '../../redux/Slices/createTask';
import './NewTask.css';
import Notification from '../Utils/Notification';
import { fetchAllTask } from '../../redux/Slices/getAllTask';

const NewTask = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [error, setError] = useState('');

  const dispatch = useDispatch();

  const markAsRead = () => {
    setShowNotification(false);
  };

  const anyFieldIsEmpty = !title || !description;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(createTask({ title, description, status }));
      await dispatch(fetchAllTask());
      setTitle('');
      setDescription('');
      setStatus(false);
      setShowNotification(true);
      setError('');
    } catch (error) {
      setError('Error al crear la tarea. Inténtalo de nuevo.');
    }
  };

  return (
    <div className="container">
      <h2>Create New Task</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
            placeholder="Ingrese el título de la tarea"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-control"
            placeholder="Ingrese la descripción de la tarea"
          ></textarea>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={anyFieldIsEmpty}
        >
          Create task
        </button>
      </form>
      {showNotification && <Notification markAsRead={markAsRead} />}
    </div>
  );
};

export default NewTask;
