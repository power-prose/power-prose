import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import connect from 'react-redux';


const LoggedOutHome = (props) => {
  return (
  <div>
    <h1>I am the LoggedOutHome component</h1>
    <p>I render a landing page for non-logged in users that is essentially some art and a description of the site. I am conditionally renders by a Root component based on whether the use is logged in.</p>
    <Link to="/signup">
    <button type="button" className="btn btn-light">Get Started</button>
    </Link>
  </div>
  )
}

export default withRouter(LoggedOutHome);
