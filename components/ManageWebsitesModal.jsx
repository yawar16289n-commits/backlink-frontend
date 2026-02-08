import { useState, useEffect } from 'react';
import { Modal, Button, Table } from 'react-bootstrap';
import WebsiteFormModal from './WebsiteFormModal';
import SuccessMessage from './SuccessMessage';

export default function ManageWebsitesModal({ show, onHide, websites, onRefresh, onSaveWebsite, onDeleteWebsite }) {
  const [showWebsiteForm, setShowWebsiteForm] = useState(false);
  const [selectedWebsite, setSelectedWebsite] = useState(null);
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (!show) {
      setSuccess('');
    }
  }, [show]);

  const handleAddWebsite = () => {
    setSelectedWebsite(null);
    setShowWebsiteForm(true);
  };

  const handleEditWebsite = (website) => {
    setSelectedWebsite(website);
    setShowWebsiteForm(true);
  };

  const handleDeleteWebsite = async (id) => {
    if (window.confirm('Are you sure you want to delete this website?')) {
      try {
        await onDeleteWebsite(id);
        setSuccess('Website deleted successfully!');
        setTimeout(() => setSuccess(''), 3000);
      } catch (err) {
        alert(err.response?.data?.error || 'Failed to delete website');
      }
    }
  };

  const handleSaveWebsite = async (data) => {
    await onSaveWebsite(data, selectedWebsite?.id);
    setShowWebsiteForm(false);
    setSuccess(selectedWebsite ? 'Website updated successfully!' : 'Website added successfully!');
    setTimeout(() => setSuccess(''), 3000);
  };

  return (
    <>
      <Modal show={show} onHide={onHide} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Manage Websites</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SuccessMessage message={success} onClose={() => setSuccess('')} />
          
          <div className="mb-3">
            <Button variant="primary" onClick={handleAddWebsite}>
              Add Website
            </Button>
          </div>

          {websites.length === 0 ? (
            <p className="text-muted">No websites added yet.</p>
          ) : (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Website</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {websites.map((website) => (
                  <tr key={website.id}>
                    <td>{website.id}</td>
                    <td>{website.name}</td>
                    <td>
                      <button
                        className="action-btn edit-btn"
                        onClick={() => handleEditWebsite(website)}
                        title="Edit"
                      >
                        ✏️
                      </button>
                      <button
                        className="action-btn delete-btn"
                        onClick={() => handleDeleteWebsite(website.id)}
                        title="Delete"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <WebsiteFormModal
        show={showWebsiteForm}
        onHide={() => setShowWebsiteForm(false)}
        onSave={handleSaveWebsite}
        website={selectedWebsite}
      />
    </>
  );
}
