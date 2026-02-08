import { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import SuccessMessage from './SuccessMessage';

export default function BacklinkFormModal({ show, onHide, onSave, backlink, websites }) {
  const [websiteId, setWebsiteId] = useState('');
  const [backlinkUrl, setBacklinkUrl] = useState('');
  const [da, setDa] = useState('');
  const [spamScore, setSpamScore] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const isEdit = !!backlink;

  useEffect(() => {
    if (backlink) {
      setWebsiteId(backlink.website_id);
      setBacklinkUrl(backlink.backlink_url);
      setDa(backlink.da);
      setSpamScore(backlink.spam_score);
    } else {
      setWebsiteId('');
      setBacklinkUrl('');
      setDa('');
      setSpamScore('');
    }
    setError('');
    setSuccess('');
  }, [backlink, show]);

  const validateForm = () => {
    if (!websiteId) {
      setError('Please select a website');
      return false;
    }
    if (!backlinkUrl.trim()) {
      setError('Backlink URL is required');
      return false;
    }
    if (da === '' || da < 0 || da > 100 || !Number.isInteger(Number(da))) {
      setError('DA must be a whole number between 0 and 100');
      return false;
    }
    if (spamScore === '' || spamScore < 0 || spamScore > 100 || !Number.isInteger(Number(spamScore))) {
      setError('Spam Score must be a whole number between 0 and 100');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateForm()) {
      return;
    }

    try {
      await onSave({
        website_id: parseInt(websiteId),
        backlink_url: backlinkUrl.trim(),
        da: parseInt(da),
        spam_score: parseInt(spamScore)
      });
      // Modal will be closed by parent component
      // Success message will be shown by parent component
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred');
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{isEdit ? 'Edit Backlink' : 'Add Backlink'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <div className="alert alert-danger">{error}</div>}
        
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Website</Form.Label>
            <Form.Select
              value={websiteId}
              onChange={(e) => setWebsiteId(e.target.value)}
            >
              <option value="">Select a website</option>
              {websites.map((website) => (
                <option key={website.id} value={website.id}>
                  {website.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Backlink URL</Form.Label>
            <Form.Control
              type="text"
              placeholder="https://example.com/article"
              value={backlinkUrl}
              onChange={(e) => setBacklinkUrl(e.target.value)}
            />
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>DA (Domain Authority)</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="0-100"
                  min="0"
                  max="100"
                  step="1"
                  value={da}
                  onChange={(e) => setDa(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Spam Score</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="0-100"
                  min="0"
                  max="100"
                  step="1"
                  value={spamScore}
                  onChange={(e) => setSpamScore(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          {isEdit ? 'Update' : 'Add'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
