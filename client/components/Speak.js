import React from "react";
import { withRouter } from "react-router-dom";
import { RecordButtons, WatchWordList } from "./";

const Speak = props => {
  return (
    <div>
      <div className="container-inner-horizontal">
        <WatchWordList />
        <div className="container-right container-vertical ">
          <RecordButtons />
        </div>
      </div>
      <div className="bottom-speak-div" />
    </div>
  );
};

export default withRouter(Speak);
