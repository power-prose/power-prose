import React from "react";
import { withRouter } from "react-router-dom";

const Footer = props => {
  return (
    <nav className="navbar sticky-bottom container-horizontal footer  navbar-light bg-light">
      <p>I am the Footer component. I am static and probably just a colored bar with no text.</p>
          </nav>
  );
};

export default withRouter(Footer);
