import React, {useEffect, useState} from 'react';
import {Nav, Navbar} from 'react-bootstrap';
import {w3cwebsocket as W3CWebSocket} from 'websocket';

const client = new W3CWebSocket('ws://' +
  window.location.hostname + ':3001');

const NavBar = () => {
  const [cardTicker, setCardTicker] = useState({});

  useEffect(() => {
    client.onmessage = (message) => {
      setCardTicker(JSON.parse(message.data));
    };
  }, []);

  return (<Navbar variant={'dark'} bg={'dark'} fixed={'bottom'} expand={'lg'}>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link href="/">Home</Nav.Link>
      </Nav>
      <Nav pullRight>
        {cardTicker.latestPrice &&
        <span> {cardTicker.name} {new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(cardTicker.latestPrice)}</span>}
      </Nav>
    </Navbar.Collapse>
  </Navbar>);
};

export default NavBar;
