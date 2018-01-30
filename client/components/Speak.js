import React from "react";
import { withRouter } from "react-router-dom";
import { RecordButtons } from "./";

const Speak = props => {
  return (
    <div className="container-vertical container-right">
      <RecordButtons />
    </div>
  );
};

export default withRouter(Speak);
