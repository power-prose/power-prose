import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Card, CardHeader, CardTitle, CardText, Divider, Subheader } from 'material-ui/Card';


const styles = {
  sentencesCard: {
    height: 275,
    marginRight: 20,
    marginBottom: 20,
    maxHeight: 200,
    maxWidth: 913,
    minWidth: 913,
    paddingRight: 0,
    overflow: 'auto',
  }
};

const UserSentences = (props) => {
  const { conversation } = props;

  return (

    <Card style={styles.sentencesCard}>
      <CardTitle
        title="Tentative Sentences from This Conversation"
        style={{ backgroundColor: "#f0ddd4" }}
        titleStyle={{ "fontFamily": "Amaranth, sans-serif", "fontWeight": "bold", "fontSize": 17, paddingRight: 0 }}
        titleColor="#0E254C"
      />
      <CardText>
        {
          conversation.toneSentences && conversation.toneSentences.map(toneSentence => {
            return (
              <div key={toneSentence.id}>{toneSentence.sentence}</div>
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
