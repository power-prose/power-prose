import React from 'react';
import { withRouter } from 'react-router-dom';
import {AllConversationsData, AllConversationsSidebar} from './';
import RaisedButton from 'material-ui/RaisedButton';

const AllConversationsView = (props) => {

  return (
    <div className="container-horizontal">
      <div className="container-right container-vertical">
        <AllConversationsData />
      </div>
    </div>
  )
};

export default withRouter(AllConversationsView);
