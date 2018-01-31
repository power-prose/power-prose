import React from 'react';
import { withRouter } from 'react-router-dom';
import {AllConversationsData, WatchWords} from './';
import RaisedButton from 'material-ui/RaisedButton';

const AllConversationsView = (props) => {

  return (
    <div className="container-horizontal">
        <WatchWords />
  <RaisedButton label="Default" />        
    <div className="container-right container-vertical">
    <AllConversationsData />
    </div>
    </div>
  )

};


export default withRouter(AllConversationsView);
