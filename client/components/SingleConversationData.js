import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { VictoryBar, VictoryChart, VictoryAxis } from "victory";

const SingleConversationData = props => {
  const { conversation } = props;
  const tone = conversation.tone;
  let dateToRender;
  console.log("CONVERSATION!!!", conversation);

  let tonesData = [];
  let watchWordsData;
  if (tone) {
    watchWordsData = conversation.watchWords.map(word => {return {wordOrPhrase: word.wordOrPhrase, countOfTimesUsed: word.watchWordOccurrence.countOfTimesUsed}});
    console.log("object!!!", watchWordsData)

    let conversationTones = tone;
    dateToRender = conversation.date.slice(0,conversation.date.indexOf('T'));
    let notTones = ["conversationId", "createdAt", "id", "updatedAt"];
    for (let key in conversationTones) {
      if (!notTones.includes(key)) {

        tonesData.push({ tone: key, value: conversationTones[key]*100 });
      }
    }
  }


  return (
    <div className="container-vertical">
      <div>Name: {conversation.name}</div>
      <div>
        Date: {dateToRender}
      </div>
      <div className="container-horizontal">
        <div className="chart-wrapper">
          <h6>Watch Words Used</h6>
          <VictoryChart domainPadding={20}>
            <VictoryAxis />
            <VictoryAxis dependentAxis
            tickFormat={x => `${x} t`}

            />
            <VictoryBar
              data={watchWordsData}
              x="wordOrPhrase"
              y="countOfTimesUsed"
            />
          </VictoryChart>
        </div>
        <div className="chart-wrapper">
          <h6>Tones Identified</h6>
          <VictoryChart domainPadding={20}>
            <VictoryAxis />
            <VictoryAxis
              dependentAxis
              tickFormat={x => `${x}%`}
            />
            <VictoryBar
              data={tonesData.filter(tone => tone.value > 0)}
              x="tone"
              y="value"
            />
          </VictoryChart>
        </div>
      </div>
    </div>
  );
};

// something we need to think through here is how to conditionally render snippets -- how will the component know whether this conversation is the user's most recent conversation?
const mapState = state => {
  return {
    conversation: state.chosenConversation
  };
};

const mapDispatch = null;

export default withRouter(
  connect(mapState, mapDispatch)(SingleConversationData)
);
