import React from 'react';
import { withRouter } from 'react-router-dom';
import {AllConversationsData} from './';



const AllConversationsView = (props) => {

  return (
    <div className="container-right container-vertical">
    <AllConversationsData />
    </div>
  )

};


export default withRouter(AllConversationsView);
