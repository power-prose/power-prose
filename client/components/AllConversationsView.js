import React from 'react';
import { withRouter } from 'react-router-dom';
import {AllConversationsData, WatchWords} from './';



const AllConversationsView = (props) => {

  return (
    <div className="container-horizontal">
        <WatchWords />
    <div className="container-right container-vertical">
    <AllConversationsData />
    </div>
    </div>
  )

};


export default withRouter(AllConversationsView);
