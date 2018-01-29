import React from "react";
import { withRouter } from "react-router-dom";
import { RecordButtons } from "./";

const Speak = props => {
  return (
    <div>
      <h1>
        I am the Speak component. My job is to render data
        related to a conversation that the user has chosen. I have access to
        this conversartion through props.
      </h1>
      <RecordButtons />
    </div>
  );
};

export default withRouter(Speak);
