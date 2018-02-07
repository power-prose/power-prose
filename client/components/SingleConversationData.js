import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  dateParser,
  singleConvoWatchWordsForViz,
  singleConvoToneForViz
} from "../utils";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  LineChart,
  Line,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
  RadarChart,
  PolarGrid,
  Radar,
  PolarAngleAxis,
  PolarRadiusAxis
} from "recharts";
import {
  Card,
  CardHeader,
  CardTitle,
  CardText,
  Dialog,
  FlatButton
} from "material-ui";

export class SingleConversationData extends Component {
  constructor(props) {
    super(props);
    this.state = { dialogOpen: false };
  }

  handleDialogOpen = () => {
    this.setState({ dialogOpen: true });
  };

  handleDialogClose = () => {
    this.setState({ dialogOpen: false });
  };

  calcMostUsedWatchWord = () => {
    const { conversation } = this.props;
    let count = 0;
    let word = "";

    !!conversation.userWatchWords &&
      conversation.userWatchWords.forEach(userWatchWord => {
        if (userWatchWord.watchWordOccurrence.countOfTimesUsed > count) {
          word = userWatchWord.wordOrPhrase;
          count = userWatchWord.watchWordOccurrence.countOfTimesUsed;
        }
      });
    return word;
  };

  calcMostFrequentTone = () => {
    const { conversation } = this.props;
    const possibleTones = [
      "anger",
      "fear",
      "sadness",
      "tentative",
      "analytical",
      "joy",
      "confident"
    ];
    let index = 0;
    let tone = "";

    !!conversation.tone &&
      possibleTones.forEach(possibleTone => {
        if (conversation.tone[possibleTone] > index) {
          tone = possibleTone;
          index = conversation.tone[possibleTone];
        }
      });
    return tone;
  };

  render() {
    const { conversation } = this.props;
    const tone = conversation.tone;
    const dialogAction = [
      <FlatButton
        label="Okay"
        secondary={true}
        style={{
          marginBottom: "5px",
          color: "#0e254c",
          border: "1px solid #0e254c"
        }}
        backgroundColor="#f0ddd4"
        hoverColor="rgb(204,242,218)"
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
            <CardTitle
              title="You Are Viewing"
              style={{ backgroundColor: "#DBF3E3" }}
              titleStyle={{
                fontFamily: "Amaranth, sans-serif",
                fontWeight: "bold",
                fontSize: 15
              }}
              titleColor="#0E254C"
            />
            <CardText>
              {conversation.name},{" "}
              {conversation.date && dateParser(conversation.date)}
            </CardText>
          </Card>
          <div className="hide-card">
            <Card style={styles.topLevelCard}>
              <CardTitle
                title="Your Most Used Watchword"
                style={{ backgroundColor: "#DBF3E3" }}
                titleStyle={{
                  fontFamily: "Amaranth, sans-serif",
                  fontWeight: "bold",
                  fontSize: 15
                }}
                titleColor="#0E254C"
              />
              <CardText>{this.calcMostUsedWatchWord()}</CardText>
            </Card>
          </div>
          <div className="hide-card">
            <Card style={styles.topLevelCard}>
              <CardTitle
                title="Your Most Frequent Tone"
                style={{ backgroundColor: "#DBF3E3" }}
                titleStyle={{
                  fontFamily: "Amaranth, sans-serif",
                  fontWeight: "bold",
                  fontSize: 15
                }}
                titleColor="#0E254C"
              />
              <CardText>{this.calcMostFrequentTone()}</CardText>
            </Card>
          </div>
        </div>
        <div className="container-inner-horizontal">
          <Card style={styles.chartCard}>
            <CardHeader title="Watch Words in This Conversation" />
            <BarChart
              width={425}
              height={225}
              data={watchWordsData}
              maxBarSize={50}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="Word"
                interval={0}
                tickLine={false}
                tick={false}
              />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar legendType="none" dataKey="Count" fill="#1a294f" />
            </BarChart>
          </Card>
          <Card style={styles.chartCard}>
            <CardHeader title="Tones Perceived in This Conversation" />
            <RadarChart
              margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
              outerRadius={90}
              width={425}
              height={225}
              data={tonesData}
            >
              <PolarGrid />
              <PolarAngleAxis dataKey="tone" />
              <PolarRadiusAxis
                domain={[-10, 100]}
                axisLine={false}
                tick={false}
              />

              <Radar
                name="Document"
                dataKey="value"
                stroke="#c5dacc"
                fill="#DBF3E3"
                fillOpacity={0.7}
              />
            </RadarChart>
          </Card>
        </div>
        <div>
          <Dialog
          titleClassName="dialog-title"
          titleStyle={{
              fontFamily: "Amaranth, sans-serif",
              fontWeight: "bold",
              color: "#0E254C"
            }}
            title="You don't have any conversations yet"
            actions={dialogAction}
            modal={false}
            open={this.state.dialogOpen}
            onRequestClose={this.handleDialogClose}
          >
          <label style={{ marginTop: "15px" }}>
            Once you have recorded a conversation, it will apear on this page.
            You can also use this page to view any past conversation.
            </label>
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

export default withRouter(
  connect(mapState, mapDispatch)(SingleConversationData)
);

const styles = {
  topLevelCard: {
    marginRight: 20,
    marginBottom: 20,
    width: 290
  },
  chartCard: {
    height: 280,
    marginRight: 20,
    marginBottom: 20,
    paddingRight: 20,
    paddingBottom: 20
  }
};
