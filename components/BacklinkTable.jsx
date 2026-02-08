import { Table } from 'react-bootstrap';

export default function BacklinkTable({ backlinks, onEdit, onDelete }) {
  return (
    <div className="table-responsive">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Website</th>
            <th>Backlink URL</th>
            <th>Backlink Website</th>
            <th>DA</th>
            <th>Spam Score</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {backlinks.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center text-muted">
                No backlinks found
              </td>
            </tr>
          ) : (
            backlinks.map((backlink) => (
              <tr key={backlink.id}>
                <td>{backlink.id}</td>
                <td>{backlink.website_name}</td>
                <td>
                  <div style={{ maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {backlink.backlink_url}
                  </div>
                </td>
                <td>{backlink.backlink_website}</td>
                <td>{backlink.da}</td>
                <td>{backlink.spam_score}</td>
                <td>
                  <button
                    className="action-btn edit-btn"
                    onClick={() => onEdit(backlink)}
                    title="Edit"
                  >
                    ✏️
                  </button>
                  <button
                    className="action-btn delete-btn"
                    onClick={() => onDelete(backlink.id)}
                    title="Delete"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
}
