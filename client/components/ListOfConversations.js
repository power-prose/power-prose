import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchChosenConversation } from '../store';


const ListOfConversations = (props) => {
  const { conversations, handleClick } = props;

  return (
    <div className="container-horizontal">
      {
        conversations && conversations.map(conversation => {
          return (
            <div key={conversation.id}>
              <Link onClick={(e) => handleClick(e, conversation.id)} to={ `/conversations/${conversation.id}`}>{ conversation.name + ', ' + conversation.date }</Link>
            </div>
          )
        })
      }
    </div>
  )
};

const mapState = (state) => {
  return {
    conversations: state.allConversations.defaultConversations
  }
};

const mapDispatch = (dispatch) => {
  return {
    handleClick(event, conversationId) {
      event.preventDefault()
      dispatch(fetchChosenConversation(conversationId))
    }
  }
};

export default withRouter(connect(mapState, mapDispatch)(ListOfConversations));
