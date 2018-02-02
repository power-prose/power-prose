import React from "react";
import { withRouter } from "react-router-dom";
import { RecordButtons, WatchWords } from "./";

const Speak = props => {
  return (
    <div className="container-vertical container-right">
      <RecordButtons />
      <WatchWords />
    </div>
  );
};

export default withRouter(Speak);
