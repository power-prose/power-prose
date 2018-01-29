import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setChosenConversation } from '../store';


const ListOfConversations = (props) => {
  const { conversations, handleClick } = props;

  return (
    <div>
      <h1>I am the ListofConversations component. My job is to render a list of all conversations associated with the currentUser. I have access to all those conversations through props.</h1>
      {
        conversations && conversations.map(conversation => {
          return (
            <div key={conversation.id}>
              <Link onClick={handleClick} to={ `/conversations/${conversation.id}`}>{ conversation.name + ', ' + conversation.date }</Link>
            </div>
          )
        })
      }
    </div>
  )
};

const mapState = (state) => {
  return {
    conversations: state.allConversations
  }
};

const mapDispatch = (dispatch) => {
  return {
    handleClick(event, conversation) {
      event.preventDefault()
      dispatch(setChosenConversation(conversation))
    }
  }
};

export default withRouter(connect(mapState, mapDispatch)(ListOfConversations));
