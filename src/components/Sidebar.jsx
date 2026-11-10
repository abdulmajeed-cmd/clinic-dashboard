import React from "react";
import { Offcanvas, Nav } from "react-bootstrap";

// Menu items. Each one is a string in an array (Basic JavaScript).
const menuItems = [
  "Dashboard",
  "Patient List",
  "Visit Schedule",
  "Reports",
  "Settings",
];

// Side menu. On desktop it stays fixed on the left.
// On tablet and mobile it slides in from the left when the menu button is pressed.
function Sidebar({ show, handleClose, activeMenu, onSelectMenu }) {
  // Select a menu item, then close the sidebar on small screens
  const handleSelect = (item) => {
    onSelectMenu(item);
    handleClose();
  };

  return (
    <Offcanvas
      show={show}
      onHide={handleClose}
      responsive="lg"
      className="app-sidebar border-end"
    >
      <Offcanvas.Header closeButton className="d-lg-none">
        <Offcanvas.Title>Menu</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Nav variant="pills" className="flex-column gap-2">
          {menuItems.map((item) => (
            <Nav.Link
              key={item}
              active={activeMenu === item}
              className="sidebar-link"
              onClick={() => handleSelect(item)}
            >
              {item}
            </Nav.Link>
          ))}
        </Nav>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default Sidebar;
