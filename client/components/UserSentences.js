import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';


const UserSentences = (props) => {
  const { conversation } = props;

  return (
    <div>
    {
      conversation.toneSentences && conversation.toneSentences.map(toneSentence => {
        return (
          <div key={toneSentence.id}>{toneSentence.sentence}</div>
        )
      })
    }
    </div>
  )
};

const mapState = (state) => {
  return {
    conversation: state.chosenConversation
  }
};

const mapProps = null;

export default withRouter(connect(mapState, mapProps)(UserSentences))
