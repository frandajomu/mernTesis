import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './css/PersonalBootstrap.min.css';
//import 'bootstrap/dist/css/bootstrap.min.css';
import WebFont from 'webfontloader';

WebFont.load({
  google: {
    families: ['Outfit:200,300,400,500,600,700', 'sans-serif']
  }
});

ReactDOM.render(
    <App />,
  document.getElementById('root')
);