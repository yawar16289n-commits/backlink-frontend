import { Container, Navbar, Button } from 'react-bootstrap';

export default function Header({ onManageWebsites }) {
  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">Backlink Record App</Navbar.Brand>
        <Button variant="outline-light" onClick={onManageWebsites}>
          Manage Websites
        </Button>
      </Container>
    </Navbar>
  );
}
