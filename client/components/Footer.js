import React from 'react';
import { withRouter } from 'react-router-dom';
import connect from 'react-redux';


const Footer = (props) => {
  return (
    <h1>I am the Footer component. I am static and probably just a colored bar with no text.</h1>
  )
};

export default withRouter(Footer);
