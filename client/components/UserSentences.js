import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {Card, CardHeader, CardTitle, CardText, Divider, Subheader } from 'material-ui/Card';


const styles = {
  sentencesCard: {
    height: 275,
    marginRight: 20,
    marginBottom: 20,
    paddingRight: 20,
    maxHeight: 200,
    maxWidth: 913,
    minWidth: 913,
    overflow: 'auto'
  }
};

const UserSentences = (props) => {
  const { conversation } = props;

  return (

      <Card style={styles.sentencesCard}>
        <CardHeader
          title="Tentative Sentences from This Conversation"
        />
        <CardText>
          {
            conversation.toneSentences && conversation.toneSentences.map(toneSentence => {
              return (
                <div>{toneSentence.sentence}</div>
              )
            })
          }
        </CardText>
      </Card>

  )
};

const mapState = (state) => {
  return {
    conversation: state.chosenConversation
  }
};

const mapProps = null;

export default withRouter(connect(mapState, mapProps)(UserSentences));

// <Card style={styles.chartCard}>
//   <CardHeader
//     title="Your Tentative Sentences"
//   />
//   <Divider inset={true} />
//   <Subheader>These sentences were perceived as tentative in nature by our tone analysis system.</Subheader>
//   <CardText>
//     {
//       conversation.toneSentences && conversation.toneSentences.map(toneSentence => {
//         return (
//           <div>{toneSentence.sentence}</div>
//         )
//       })
//     }
//   </CardText>
// </Card>
