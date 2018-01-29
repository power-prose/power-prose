import React from 'react';
import { withRouter } from 'react-router-dom';
import {AllConversationsData} from './';



const AllConversationsView = (props) => {

  return (
    <div>
    <h1>I am the AllConversationsView component. My job is to render data related to all conversations.</h1>
    <AllConversationsData />
    </div>
  )

};


export default withRouter(AllConversationsView);
