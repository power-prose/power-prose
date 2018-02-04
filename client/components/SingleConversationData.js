import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { dateParser, singleConvoWatchWordsForViz, singleConvoToneForViz } from "../utils";
import { Bar, BarChart, CartesianGrid, Legend, LineChart, Line, Scatter, ScatterChart, Tooltip, XAxis, YAxis, ZAxis, RadarChart, PolarGrid, Radar, PolarAngleAxis, PolarRadiusAxis } from "recharts";
import { Card, CardHeader, CardTitle, CardText, Dialog, FlatButton } from 'material-ui';


export class SingleConversationData extends Component {
  constructor(props) {
    super(props);
    this.state = { dialogOpen: false };
  }

  componentDidMount () {
    const { conversations } = this.props;

    if (conversations.defaultConversations.length === 0) {
      console.log('testing is working')
      this.setState({ dialogOpen: true })
    }
  }

  handleDialogOpen = () => {
    this.setState({dialogOpen: true});
  };

  handleDialogClose = () => {
    this.setState({ dialogOpen: false });
  };

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
    const possibleTones = ['anger', 'fear', 'sadness', 'tentative', 'analytical', 'joy', 'confident'];
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

  render() {
    const { conversation } = this.props;
    const tone = conversation.tone;
    const dialogAction = [
      <FlatButton
        label="Okay"
        primary={true}
        onClick={this.handleDialogClose}
      />
    ];

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
              <XAxis dataKey="Word" interval={0} tickLine={false} tick={false} />
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

            <RadarChart margin={{top: 5, right: 5, bottom: 5, left: 5}} outerRadius={90} width={425} height={225} data={tonesData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="tone" />
              <PolarRadiusAxis domain={[-10, 100]} axisLine={false} tick={false} />

              <Radar name="Document" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
            </RadarChart>
          </Card>
        </div>
        <div>
        <Dialog
          title="Record a Conversation"
          actions={dialogAction}
          modal={false}
          open={this.state.dialogOpen}
          onRequestClose={this.handleDialogClose}
        >
          Once you have recorded a conversation, it will apear on this page. You can also use this page to view any past conversation.
        </Dialog>
        </div>
      </div>
    );
  }
}


const mapState = state => {
  return {
    conversation: state.chosenConversation,
    conversations: state.allConversations
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
