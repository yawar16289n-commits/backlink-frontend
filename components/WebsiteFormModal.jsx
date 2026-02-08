import { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import SuccessMessage from './SuccessMessage';

export default function WebsiteFormModal({ show, onHide, onSave, website }) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const isEdit = !!website;

  useEffect(() => {
    if (website) {
      setName(website.name);
    } else {
      setName('');
    }
    setError('');
    setSuccess('');
  }, [website, show]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!name.trim()) {
      setError('Website name is required');
      return;
    }

    try {
      await onSave({ name: name.trim() });
      setSuccess(isEdit ? 'Website updated successfully!' : 'Website added successfully!');
      setTimeout(() => {
        setSuccess('');
        onHide();
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred');
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{isEdit ? 'Edit Website' : 'Add Website'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <SuccessMessage message={success} onClose={() => setSuccess('')} />
        {error && <div className="alert alert-danger">{error}</div>}
        
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Website Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="example.com"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={!!success}
            />
            <Form.Text className="text-muted">
              Enter the website domain (e.g., example.com)
            </Form.Text>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit} disabled={!!success}>
          {isEdit ? 'Update' : 'Add'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
