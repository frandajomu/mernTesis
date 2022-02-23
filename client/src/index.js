import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './css/PersonalBootstrap.min.css';
import WebFont from 'webfontloader';
import { Helmet } from "react-helmet";
import LogoHelmet from './images/LogoHelmet.png';

WebFont.load({
  google: {
    families: ['Outfit:200,300,400,500,600,700', 'sans-serif']
  }
});

const Index = () => {
  return (
    <>
      <Helmet>
        <link rel="shortcut icon" href={LogoHelmet} type="image/x-icon" />
        <title>ADN Fetal en Sangre Materna</title>
      </Helmet>
      <App />
    </>
  );
}

ReactDOM.render(<Index />, document.getElementById('root'));