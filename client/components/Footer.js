import React from "react";
import { withRouter, Link } from "react-router-dom";

const Footer = props => {
  return (
    <nav className="navbar sticky-bottom container-horizontal footer  navbar-light bg-light">
    <div className="container-vertical footer-inner">
      <div>Power Prose</div>
      <a className="footer-link" href="/about">About</a>
      </div>
          </nav>
  );
};

export default withRouter(Footer);
