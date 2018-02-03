import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {Card, CardHeader, CardTitle, CardText, Divider, Subheader } from 'material-ui/Card';


const styles = {
  chartCard: {
    height: 275,
    marginRight: 20,
    marginBottom: 20,
    paddingRight: 20
  }
};

const UserSentences = (props) => {
  const { conversation } = props;

  return (
    <div className="container-inner-horizontal">
      <Card style={styles.chartCard}>
        <CardHeader
          title="Your Tentative Sentences"
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
    </div>
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
