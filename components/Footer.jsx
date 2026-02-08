import { Container } from 'react-bootstrap';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-primary text-white text-center py-3 mt-4">
      <Container>
        <p className="mb-0">&copy; {currentYear} Backlink Record App. All rights reserved.</p>
      </Container>
    </footer>
  );
}
