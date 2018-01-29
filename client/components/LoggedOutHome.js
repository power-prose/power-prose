import React from 'react';
import { withRouter } from 'react-router-dom';
import connect from 'react-redux';


const LoggedOutHome = (props) => {
  return (
    <h1>I am the LoggedOutHome component. I render a landing page for non-logged in users that is essentially some art and a description of the site. I am conditionally renders by a Root component based on whether the use is logged in.</h1>
  )
}

export default withRouter(LoggedOutHome);
