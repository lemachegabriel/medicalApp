import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import styles from "./styles/navbar.module.css"
import { FaBars, FaCaretLeft } from "react-icons/fa";
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';

function Menu() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const redirect = (e) => {
    Router.push(e.target.id)
  }
  

  return (
      <Navbar bg="" expand="lg">
        <Navbar.Brand href="/">
          <h1>logo</h1>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link title="pagina inicial" href="/">Home</Nav.Link>
            <Nav.Link title="pagina inicial" href="/">Home</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
  );
}

export default Menu;
