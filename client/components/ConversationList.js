import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { fetchChosenConversation } from "../store";
import { Card, Paper, CardHeader, CardText, Divider, List, ListItem } from "material-ui";

const ConversationList = props => {
  const { conversations, handleClick } = props;

  return (
    <div className="container-watchwords">
    <Card style={styles.cardStyle}>
      <CardHeader
        title=""
      />
      <Divider inset={true} />
      <CardHeader title="View another conversation" />
      <Paper style={{maxHeight: 600, overflow: 'auto'}}>
        <List>

            {conversations &&
              conversations.map(conversation => (
                <ListItem
                  style={styles.list}
                  key={conversation.id}
                  onClick={e => handleClick(e, conversation.id)}
                >
                  {conversation.name}
                </ListItem>
              ))}

        </List>
        </Paper>
    </Card>
    </div>
  );
};

const mapState = state => {
  return {
    conversations: state.allConversations.defaultConversations
  };
};

const mapDispatch = dispatch => {
  return {
    handleClick(event, conversationId) {
      event.preventDefault();
      dispatch(fetchChosenConversation(conversationId));
    }
  };
};

export default withRouter(connect(mapState, mapDispatch)(ConversationList));

const styles = {
  block: {
    maxWidth: 250
  },
  toggle: {
    marginBottom: 16,
    fontSize: 14
  },
  thumbOff: {
    backgroundColor: "#ffcccc"
  },
  trackOff: {
    backgroundColor: "#ff9d9d"
  },
  thumbSwitched: {
    backgroundColor: "red"
  },
  trackSwitched: {
    backgroundColor: "#ff9d9d"
  },
  labelStyle: {
    color: "red"
  },
  topLevelCard: {
    width: 300
  },
  cardStyle: {
    maxWidth: 260
  },
  list: {
    fontSize: 14,
    maxWidth: 260,
    whiteSpace: 'normal',
    '&:hover': {
      backgroundColor: '#F0DDD4'
    }
  }
};
