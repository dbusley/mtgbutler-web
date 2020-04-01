import React, {useEffect} from 'react';
import Head from 'next/head';
import ReactGA from 'react-ga';
import NavBar from './NavBar';

/**
 * Consistent layout through entire site
 */
const Layout = (props) => {
  useEffect(() => {
    if (!window.GA_INITIALIZED) {
      ReactGA.initialize('UA-161990411-1');
      window.GA_INITIALIZED = true;
    }
    ReactGA.set({page: window.location.pathname});
    ReactGA.pageview(window.location.pathname);
  }, []);

  return (<div>
    <Head>
      <meta charSet="utf-8"/>
      <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <link rel={'stylesheet'} href={'style/main.css'}/>
      <link rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
        integrity=
          "sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
        crossOrigin="anonymous"/>
      <title>MTG Butler</title>
      <link rel={'icon'} href={'assets/favicon.png'}/>
    </Head>
    <NavBar clientId={props.clientId}/>
    <div className="container-fluid">
      <div className="jumbotron jumbotron-fluid text-center">
        <img src={'assets/linkedin_banner_image_1.png'}
          style={{width: '320px'}}/>
      </div>
      <div id="app" style={{marginBottom: '60px'}}>
        {props.children}
      </div>
    </div>
  </div>);
};

export default Layout;
