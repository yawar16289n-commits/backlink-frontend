import { Row, Col, Form, Button, ButtonGroup } from 'react-bootstrap';

export default function SearchFilters({ 
  searchTerm, 
  onSearchChange, 
  selectedWebsite, 
  onWebsiteChange, 
  websites,
  filterMode,
  onFilterModeChange 
}) {
  return (
    <div className="mb-4 p-3 bg-light rounded">
      <Row className="g-3">
        <Col md={4}>
          <Form.Group>
            <Form.Label>Search</Form.Label>
            <Form.Control
              type="text"
              placeholder="Search by ID, website, URL, backlink website, DA, spam score..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group>
            <Form.Label>Filter by Website</Form.Label>
            <Form.Select
              value={selectedWebsite}
              onChange={(e) => onWebsiteChange(e.target.value)}
            >
              <option value="">All Websites</option>
              {websites.map((website) => (
                <option key={website.id} value={website.id}>
                  {website.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group>
            <Form.Label>View Mode</Form.Label>
            <ButtonGroup className="d-flex">
              <Button
                variant={filterMode === 'backlinks' ? 'primary' : 'outline-primary'}
                onClick={() => onFilterModeChange('backlinks')}
                disabled={!selectedWebsite}
              >
                Website Backlinks
              </Button>
              <Button
                variant={filterMode === 'opportunities' ? 'primary' : 'outline-primary'}
                onClick={() => onFilterModeChange('opportunities')}
                disabled={!selectedWebsite}
              >
                Opportunities
              </Button>
            </ButtonGroup>
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
}
