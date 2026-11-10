import React from "react";
import { Navbar, Container, Button } from "react-bootstrap";

// Top navigation bar. The menu button only shows on screens smaller than desktop (d-lg-none).
function AppNavbar({ onToggleSidebar }) {
  return (
    <Navbar bg="primary" variant="dark" sticky="top" className="shadow-sm">
      <Container fluid className="px-3">
        <div className="d-flex align-items-center">
          <Button
            variant="outline-light"
            size="sm"
            className="d-lg-none me-3"
            onClick={onToggleSidebar}
          >
            ☰ Menu
          </Button>
          <Navbar.Brand className="mb-0">🏥 Clinic Dashboard</Navbar.Brand>
        </div>
        <span className="text-white-50 small d-none d-md-inline">
          Medical Records
        </span>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
