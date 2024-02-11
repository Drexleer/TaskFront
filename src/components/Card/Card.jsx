import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTask, updateTask } from '../../redux/Slices/getAllTask';
import { Button, Card, Modal, Form } from 'react-bootstrap';

export default function CardDetail(props) {
  // eslint-disable-next-line react/prop-types
  const { title, description, status, id } = props;
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(description);

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteTask(id));
      window.alert('Task deleted successfully.');
    } catch (error) {
      console.log('Error en handleDelete', error.message);
    }
  };

  const handleUpdate = async () => {
    try {
      await dispatch(
        updateTask(id, { title: editedTitle, description: editedDescription })
      );
      setShowModal(false);
      window.alert('Task updated successfully.');
    } catch (error) {
      console.log('Error en handleUpdate', error.message);
    }
  };

  const handleCompleted = async () => {
    try {
      const newStatus = !status;
      await dispatch(updateTask(id, { status: newStatus }));
      window.alert(`Task marked as ${newStatus ? 'Filled' : 'pending'}.`);
    } catch (error) {
      console.log('Error en handleCompleted', error.message);
    }
  };

  const headerClass = status ? 'bg-success' : 'bg-warning';

  return (
    <>
      <Card style={{ width: '400px', height: '100%' }}>
        <Card.Header className={headerClass}>
          {status ? 'Filled' : 'Pending'}
        </Card.Header>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{description}</Card.Text>
          <Button variant="danger" onClick={() => handleDelete(id)}>
            Delete
          </Button>{' '}
          <Button variant="warning" onClick={() => setShowModal(true)}>
            Edit
          </Button>{' '}
          {!status && (
            <Button variant="success" onClick={handleCompleted}>
              Completed
            </Button>
          )}
        </Card.Body>
      </Card>

      {/* Modal para editar la tarea */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Saved Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
