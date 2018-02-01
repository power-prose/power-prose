import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { fetchChosenConversation } from "../store";
import { dateParser } from "../utils";
import { Card, CardHeader, CardText, Menu, MenuItem, Paper } from "material-ui";

const ConversationList = props => {
  const { conversations, handleClick } = props;

  const styles = {
    block: {
      maxWidth: 300
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
    }
  };

  const style = {
    display: "inline-block",
    margin: "16px 3px 16px 0",
    div: {
      width: 300
    }
  };

  return (
    <Card>
      <CardHeader title="Choose a conversation" />
      <CardText>
        <div style={styles.block}>

          {conversations &&
            conversations.map(conversation => (
              <div
                key={conversation.id}
                onClick={e => handleClick(e, conversation.id)}
              >
                {conversation.name}
              </div>
            ))}

        </div>
      </CardText>
    </Card>
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

// <div>
//   <Paper style={style}>
//     <Menu>
//       <MenuItem primaryText="Refresh" />
//       <MenuItem primaryText="Help &amp; feedback" secondaryText="test"/>
//       <MenuItem primaryText="Settings" />
//       <MenuItem primaryText="Sign out" />
//     </Menu>
//   </Paper>
// </div>

//     <div style={style.div}>
//   <Paper style={style}>
//     <Menu>
//       {conversations &&
//         conversations.map(conversation => (
//           <MenuItem
//             key={conversation.id}
//             onClick={e => handleClick(e, conversation.id)}
//             primaryText={conversation.name}
//           />
//         ))}
//     </Menu>
//   </Paper>
// </div>
