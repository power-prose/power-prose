import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import Toggle from 'material-ui/Toggle';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';


const styles = {
  block: {
    maxWidth: 250,
  },
  toggle: {
    marginBottom: 16,
    fontSize: 14
  },
  thumbOff: {
    backgroundColor: '#ffcccc',
  },
  trackOff: {
    backgroundColor: '#ff9d9d',
  },
  thumbSwitched: {
    backgroundColor: 'red',
  },
  trackSwitched: {
    backgroundColor: '#ff9d9d',
  },
  labelStyle: {
    color: 'red',
  },
  paperStyle: {
    height: 100,
    width: 100,
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
  }
};

export class AllConversationsData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayedWatchWords: []
    }
  }

  // ensures local state is updated with this.props.watchWords when the componentsreceives these props from the store
  componentWillReceiveProps (newProps) {
    if (newProps.watchWords !== this.state.displayedWatchWords) {
      this.setState({ displayedWatchWords: this.props.watchWords.map(watchWordObj => watchWordObj.wordOrPhrase) })
    }
  }

  // updates local state, which the chart uses to render lines
  handleToggle = (word) => {
    const { displayedWatchWords } = this.state
    if (displayedWatchWords.indexOf(word) === -1) this.setState({ displayedWatchWords: this.handleToggleHelper(displayedWatchWords, word) })
    else this.setState({ displayedWatchWords: displayedWatchWords.filter(watchWord => watchWord !== word) })
  }

  // a helper function to return the array, not its length, and setState with this new array
  handleToggleHelper = (array, word) => {
    array.push(word);
    return array;
  }

  // create chart data from a user's conversations
  createChartData = () => {
    const { conversations, watchWords } = this.props;
    let data = []

    conversations.forEach(conversation => {
      let obj = {}

      obj.name = conversation.name
      conversations.length && this.props.watchWords.forEach(watchWord => {
        let count = conversation.watchWords.filter(wordObj => wordObj.wordOrPhrase === watchWord.wordOrPhrase)[0]
        obj[watchWord.wordOrPhrase] = count === undefined ? 0 : count.watchWordOccurrence.countOfTimesUsed
      })
      data.push(obj)
    })
    return data;
  }

  render () {
    const { watchWords } = this.props;
    const { displayedWatchWords } = this.state;

    return (
      <div className="container-horizontal">
        <Card>
          <CardHeader
            title="Filter Your WatchWords"
          />
          <CardText>


        <div style={styles.block}>
          {
            watchWords.length && watchWords.map(watchWord => (
              <Toggle
                label={watchWord.wordOrPhrase}
                defaultToggled={true}
                onToggle={() => this.handleToggle(watchWord.wordOrPhrase)}
                style={styles.toggle}
              />
            ))
          }
        </div>
            </CardText>
        </Card>
          <LineChart width={1000} height={500} data={this.createChartData()}
                margin={{top: 5, right: 30, left: 20, bottom: 5}}>
           <XAxis dataKey="name"/>
           <YAxis/>
           <CartesianGrid strokeDasharray="3 3"/>
           <Tooltip/>
           <Legend />
           {
             displayedWatchWords.length && displayedWatchWords.map(watchWord => (
               <Line type="monotone" dataKey={watchWord} stroke="#8884d8" activeDot={{r: 8}}/>
             ))
           }
          </LineChart>
      </div>
    )
  }
}


const mapState = state => {
  return {
    conversations: state.allConversations.defaultConversations,
    watchWords: state.watchWords
  };
};

const mapDispatch = null;

export default withRouter(connect(mapState, mapDispatch)(AllConversationsData));
