import { Alert } from 'react-bootstrap';

export default function SuccessMessage({ message, onClose }) {
  if (!message) return null;

  return (
    <Alert variant="success" onClose={onClose} dismissible className="mb-3">
      {message}
    </Alert>
  );
}
