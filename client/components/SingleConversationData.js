import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
// import { VictoryBar, VictoryChart, VictoryAxis } from "victory";
import {
  dateParser,
  singleConvoWatchWordsForViz,
  singleConvoToneForViz
} from "../utils";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Bar,
  BarChart,
  ZAxis,
  Scatter,
  ScatterChart
} from "recharts";

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
    <div className="container-vertical">
      <h5>Name: {conversation.name}</h5>
      <div>Date: {dateToRender}</div>
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

//old:

// <div className="container-vertical">
//       <h5>Name: {conversation.name}</h5>
//       <div>
//         Date: {dateToRender}
//       </div>
//       <div className="container-horizontal">
//         <div className="chart-wrapper">
//           <h6>Watch Words Used</h6>
//           <VictoryChart domainPadding={20}>
//             <VictoryAxis />
//             <VictoryAxis dependentAxis
//             tickFormat={x => `${x} t`}

//             />
//             <VictoryBar
//               data={watchWordsData}
//               x="wordOrPhrase"
//               y="countOfTimesUsed"
//             />
//           </VictoryChart>
//         </div>
//         <div className="chart-wrapper">
//           <h6>Tones Identified</h6>
//           <VictoryChart domainPadding={20}>
//             <VictoryAxis />
//             <VictoryAxis
//               dependentAxis
//               tickFormat={x => `${x}%`}
//             />
//             <VictoryBar
//               data={tonesData}
//               x="tone"
//               y="value"
//             />
//           </VictoryChart>
//         </div>
//       </div>
//     </div>
