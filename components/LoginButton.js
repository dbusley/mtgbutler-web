import React, {useState, useEffect} from 'react';
import GoogleLogin from 'react-google-login';
import fetch from 'node-fetch';

export default (props) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    setUser(sessionStorage.getItem('user'));
  }, []);

  let button;
  if (user !== null) {
    button = 'You are logged in';
  } else {
    button = <GoogleLogin
      onSuccess={async (x) => {
        const req = x;
        const res = await fetch(window.location.protocol + '//' +
          window.location.hostname + (window.location.port === '' ?
            '' : ':' + window.location.port) +
          '/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(req),
        });
        const json = await res.json();
        const user = {
          id: json.extId,
          pw: json.password,
        };
        setUser(user);
        sessionStorage.setItem('user', JSON.stringify(user));
      }}
      onFailure={(x) => console.log(x)}
      clientId={''}
      cookiePolicy={'single_host_origin'} />;
  }
  return button;
};
