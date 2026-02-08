import { useState, useEffect } from 'react';
import { Container, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ManageWebsitesModal from '../components/ManageWebsitesModal';
import BacklinkFormModal from '../components/BacklinkFormModal';
import SearchFilters from '../components/SearchFilters';
import BacklinkTable from '../components/BacklinkTable';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://backlink-backend-f185.onrender.com/api';

export default function Home() {
  const [websites, setWebsites] = useState([]);
  const [backlinks, setBacklinks] = useState([]);
  const [showManageWebsites, setShowManageWebsites] = useState(false);
  const [showBacklinkForm, setShowBacklinkForm] = useState(false);
  const [selectedBacklink, setSelectedBacklink] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedWebsite, setSelectedWebsite] = useState('');
  const [filterMode, setFilterMode] = useState('backlinks');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchWebsites();
    fetchBacklinks();
  }, []);

  useEffect(() => {
    fetchBacklinks();
  }, [searchTerm, selectedWebsite, filterMode]);

  const fetchWebsites = async () => {
    try {
      const response = await axios.get(`${API_URL}/websites`);
      setWebsites(response.data);
    } catch (err) {
      setError('Failed to fetch websites');
      console.error(err);
    }
  };

  const fetchBacklinks = async () => {
    try {
      const params = {};
      if (searchTerm) params.search = searchTerm;
      if (selectedWebsite) params.website_id = selectedWebsite;
      if (filterMode === 'opportunities' && selectedWebsite) params.no_backlinks = 'true';

      const response = await axios.get(`${API_URL}/backlinks`, { params });
      setBacklinks(response.data);
    } catch (err) {
      setError('Failed to fetch backlinks');
      console.error(err);
    }
  };

  const handleSaveWebsite = async (data, id) => {
    if (id) {
      await axios.put(`${API_URL}/websites/${id}`, data);
    } else {
      await axios.post(`${API_URL}/websites`, data);
    }
    fetchWebsites();
  };

  const handleDeleteWebsite = async (id) => {
    await axios.delete(`${API_URL}/websites/${id}`);
    fetchWebsites();
  };

  const handleAddBacklink = () => {
    setSelectedBacklink(null);
    setShowBacklinkForm(true);
  };

  const handleEditBacklink = (backlink) => {
    setSelectedBacklink(backlink);
    setShowBacklinkForm(true);
  };

  const handleSaveBacklink = async (data) => {
    try {
      if (selectedBacklink) {
        await axios.put(`${API_URL}/backlinks/${selectedBacklink.id}`, data);
        setSuccessMessage('Backlink updated successfully!');
      } else {
        await axios.post(`${API_URL}/backlinks`, data);
        setSuccessMessage('Backlink added successfully!');
      }
      setShowBacklinkForm(false);
      fetchBacklinks();
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      throw err;
    }
  };

  const handleDeleteBacklink = async (id) => {
    if (window.confirm('Are you sure you want to delete this backlink?')) {
      try {
        await axios.delete(`${API_URL}/backlinks/${id}`);
        fetchBacklinks();
      } catch (err) {
        alert(err.response?.data?.error || 'Failed to delete backlink');
      }
    }
  };

  return (
    <>
      <Header onManageWebsites={() => setShowManageWebsites(true)} />
      
      <Container className="main-container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>Backlink Records</h1>
          <Button variant="primary" onClick={handleAddBacklink}>
            Add Backlink
          </Button>
        </div>

        {error && (
          <Alert variant="danger" onClose={() => setError('')} dismissible>
            {error}
          </Alert>
        )}

        {successMessage && (
          <Alert variant="success" onClose={() => setSuccessMessage('')} dismissible>
            {successMessage}
          </Alert>
        )}

        <SearchFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedWebsite={selectedWebsite}
          onWebsiteChange={setSelectedWebsite}
          websites={websites}
          filterMode={filterMode}
          onFilterModeChange={setFilterMode}
        />

        <BacklinkTable
          backlinks={backlinks}
          onEdit={handleEditBacklink}
          onDelete={handleDeleteBacklink}
        />
      </Container>

      <Footer />

      <ManageWebsitesModal
        show={showManageWebsites}
        onHide={() => setShowManageWebsites(false)}
        websites={websites}
        onRefresh={fetchWebsites}
        onSaveWebsite={handleSaveWebsite}
        onDeleteWebsite={handleDeleteWebsite}
      />

      <BacklinkFormModal
        show={showBacklinkForm}
        onHide={() => setShowBacklinkForm(false)}
        onSave={handleSaveBacklink}
        backlink={selectedBacklink}
        websites={websites}
      />
    </>
  );
}
