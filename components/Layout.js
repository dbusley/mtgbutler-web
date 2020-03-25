import React from 'react';
import Head from 'next/head';

/**
 * Consistent layout through entire site
 */
export default (props) => (

  <div>
    <Head>
      <link rel={'stylesheet'} href={'style/main.css'}/>
      <link rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
        integrity=
          "sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
        crossOrigin="anonymous"/>
      <title>MTG Butler</title>
      <link rel={'icon'} href={'assets/favicon.png'} />
    </Head>
    <div className="jumbotron text-center">
      <img src="assets/linkedin_banner_image_1.png"
        style={{height: '220px'}}/>
    </div>
    <div id="app" className="container-fluid">
      {props.children}
    </div></div>);
