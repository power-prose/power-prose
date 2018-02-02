import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { dateParser, singleConvoWatchWordsForViz, singleConvoToneForViz } from "../utils";
import { Bar, BarChart, CartesianGrid, Legend, LineChart, Line, Scatter, ScatterChart, Tooltip, XAxis, YAxis, ZAxis } from "recharts";
import {Card, CardHeader, CardTitle, CardText} from 'material-ui/Card';


const SingleConversationData = props => {
  const { conversation } = props;
  const tone = conversation.tone;

  console.log("CONVERSATION!!!", conversation);
  let dateToRender;
  let tonesData = [];
  let watchWordsData;
  if (tone) {
    dateToRender = dateParser(conversation.date);
    watchWordsData = singleConvoWatchWordsForViz(conversation.watchWords);
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
            something
          </CardText>
        </Card>
        <Card style={styles.topLevelCard}>
          <CardHeader
            title="Your Most Frequent Tone"
          />
          <CardText>
            something
          </CardText>
        </Card>
      </div>

      <div className="container-vertical">
        <div className="chart-wrapper">
          <h6>Watch Words Used</h6>
          <BarChart width={800} height={400} data={watchWordsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Word" interval={0} tickLine={false} tick={false}/>
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar legendType="none" dataKey="Count" fill="#1a294f" />
          </BarChart>
        </div>
        <div className="chart-wrapper">
          <h6>Tones Identified</h6>
          <ScatterChart
            width={700}
            height={400}
            margin={{ top: 20, right: 20, bottom: 10, left: 10 }}
          >
            <XAxis dataKey="tone" name="tone" hide={true}/>
            <YAxis dataKey="index" hide={true}/>
            <ZAxis dataKey="value" range={[20, 5000]} scale="linear" name="value"  />
            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
            <Legend />
            <Scatter legendType="none" name="Tones" data={tonesData} fill="#8884d8" />
          </ScatterChart>
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

const styles = {
  topLevelCard: {
    width: 300,
    marginRight: 20,
    marginBottom: 20
  }
};
