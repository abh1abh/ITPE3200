import React from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";

const NavMenu = () => {
  return (
    <Navbar expand="lg">
      <Navbar.Brand href="/">MyShop</Navbar.Brand>
      <Nav.Link href="/" className="mx-3">
        Home
      </Nav.Link>
      <Nav.Link href="/items" className="mx-3">
        Items
      </Nav.Link>
      <Nav className="me-auto">
        <NavDropdown title="Dropdown" id="basic-nav-dropdown" className="mx-3">
          <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Navbar>
  );
};

export default NavMenu;
