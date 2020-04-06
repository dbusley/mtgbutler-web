import React, {useEffect, useState} from 'react';
import {Nav, Navbar} from 'react-bootstrap';
import {w3cwebsocket as W3CWebSocket} from 'websocket';
import Link from 'next/link';

let client;
if (typeof window !== 'undefined') {
  client = new W3CWebSocket((window.location.protocol ===
    'http:' ? 'ws://' : 'wss://') +
    window.location.hostname + (window.location.port ? ':3001' : '') +
    '/websocket');
}

const NavBar = () => {
  const [cardTicker, setCardTicker] = useState({});

  useEffect(() => {
    if (client) {
      client.onmessage = (message) => {
        setCardTicker(JSON.parse(message.data));
      };
    }
  }, []);

  return (<Navbar variant={'dark'} bg={'dark'} fixed={'bottom'} expand={'lg'}>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link href="/">Home</Nav.Link>
      </Nav>
      <Nav pullRight>
        {cardTicker.latestPrice &&
        <div className={'ticker-link'}>
          <Link href={'/price?name='+cardTicker.name}>
            {cardTicker.name + ' ' + new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(cardTicker.latestPrice)}</Link></div>}
      </Nav>
    </Navbar.Collapse>
  </Navbar>);
};

export default NavBar;
