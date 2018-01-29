import React from 'react';
import { withRouter } from 'react-router-dom';
import {AllConversationsData} from './';



const AllConversationsView = (props) => {

  return (
    <div className="container-right container-vertical">
    <h1>I am the AllConversationsView component</h1>
    <AllConversationsData />
    </div>
  )

};


export default withRouter(AllConversationsView);
