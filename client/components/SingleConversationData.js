import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { dateParser, singleConvoWatchWordsForViz, singleConvoToneForViz } from "../utils";
import { Bar, BarChart, CartesianGrid, Legend, LineChart, Line, Scatter, ScatterChart, Tooltip, XAxis, YAxis, ZAxis } from "recharts";
import { Card, CardHeader, CardTitle, CardText } from 'material-ui/Card';


export class SingleConversationData extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  calcMostUsedWatchWord = () => {
    const { conversation } = this.props;
    let count = 0;
    let word = '';

    !!conversation.userWatchWords && conversation.userWatchWords.forEach(userWatchWord => {
      if (userWatchWord.watchWordOccurrence.countOfTimesUsed > count) {
        word = userWatchWord.wordOrPhrase;
        count = userWatchWord.watchWordOccurrence.countOfTimesUsed;
      }
    })
    return word;
  }

  calcMostFrequentTone = () => {
    const { conversation } = this.props;
    const possibleTones = ['anger', 'fear', 'joy', 'sadness', 'analytical', 'confident', 'tentative'];
    let index = 0;
    let tone = '';

    !!conversation.tone && possibleTones.forEach(possibleTone => {
      if (conversation.tone[possibleTone] > index) {
        tone = possibleTone;
        index = conversation.tone[possibleTone];
      }
    })
    return tone;
  }

  render () {
    const { conversation } = this.props;
    const tone = conversation.tone;

    let dateToRender;
    let tonesData = [];
    let watchWordsData;
    if (tone) {
      dateToRender = dateParser(conversation.date);
      watchWordsData = singleConvoWatchWordsForViz(conversation.userWatchWords);
      tonesData = singleConvoToneForViz(tone);
    }

    return (
      <div>
        <div className="container-inner-horizontal">
          <Card style={styles.topLevelCard}>
            <CardHeader
              title="You Are Viewing"
            />
            <CardText>
              {conversation.name}, {conversation.date && dateParser(conversation.date)}
            </CardText>
          </Card>
          <Card style={styles.topLevelCard}>
            <CardHeader
              title="Your Most Used Watchword"
            />
            <CardText>
              {this.calcMostUsedWatchWord()}
            </CardText>
          </Card>
          <Card style={styles.topLevelCard}>
            <CardHeader
              title="Your Most Frequent Tone"
            />
            <CardText>
              {this.calcMostFrequentTone()}
            </CardText>
          </Card>
        </div>
        <div className="container-inner-horizontal">
          <Card style={styles.chartCard}>
            <CardHeader
              title="Watch Words in This Conversation"
            />
            <BarChart width={425} height={225} data={watchWordsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Word" interval={0} tickLine={false} tick={false}/>
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar legendType="none" dataKey="Count" fill="#1a294f" />
            </BarChart>
          </Card>
          <Card style={styles.chartCard}>
            <CardHeader
              title="Tones Perceived in This Conversation"
            />
            <ScatterChart width={425} height={200}
              margin={{ top: 20, right: 20, bottom: 20, left: 10 }}
            >
              <XAxis dataKey="tone" name="tone" hide={true}/>
              <YAxis dataKey="index" hide={true}/>
              <ZAxis dataKey="value" range={[20, 5000]} scale="linear" name="value"  />
              <Tooltip cursor={{ strokeDasharray: "3 3" }} />
              <Legend />
              <Scatter legendType="none" name="Tones" data={tonesData} fill="#8884d8" />
            </ScatterChart>
          </Card>
        </div>
      </div>
    );
  }
};

// something we need to think through here is how to conditionally render snippets -- how will the component know whether this conversation is the user's most recent conversation?
const mapState = state => {
  return {
    conversation: state.chosenConversation
  };
};

const mapDispatch = null;

export default withRouter(connect(mapState, mapDispatch)(SingleConversationData));

const styles = {
  topLevelCard: {
    width: 300,
    marginRight: 20,
    marginBottom: 20
  },
  chartCard: {
    height: 280,
    marginRight: 20,
    marginBottom: 20,
    paddingRight: 20,
    paddingBottom: 20
  }
};
