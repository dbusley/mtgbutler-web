import React from 'react';
import {Nav, Navbar} from 'react-bootstrap';

export default () => {
  return (<Navbar variant={'dark'} bg={'dark'} fixed={'bottom'} expand={'lg'}>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link href="/">Home</Nav.Link>
      </Nav>
      <Nav pullRight>
        Login feature coming soon
      </Nav>
    </Navbar.Collapse>
  </Navbar>);
};
