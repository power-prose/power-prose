import React from 'react';
import { withRouter } from 'react-router-dom';
import connect from 'react-redux';


const Footer = (props) => {
  return (
    <p>I am the Footer component. I am static and probably just a colored bar with no text.</p>
  )
};

export default withRouter(Footer);
