import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import Toggle from 'material-ui/Toggle';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import Divider from 'material-ui/Divider';


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
  topLevelCard: {
    width: 300,
    marginRight: 20,
    marginBottom: 20
  },
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  slide: {
    padding: 10,
  }
};

export class AllConversationsData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayedWatchWords: [],
      slideIndex: 0,
    }
  }

  componentDidMount () {
    if (this.props.watchWords !== this.state.displayedWatchWords) {
      this.setState({ displayedWatchWords: this.props.watchWords.map(watchWordObj => watchWordObj.wordOrPhrase) })
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

  handleSlideChange = (value) => {
    this.setState({
      slideIndex: value,
    });
  };

  //
  // calcMostUsedWatchWord () {
  //   const { conversations } = this.props;
  //   let obj = {}
  //
  //   conversations.forEach(conversation => {
  //     conversations.watchWords.forEach(watchWordObj => {
  //       if (obj[watchWordObj.wordOrPhrase] === undefined) {
  //         obj[watchWordObj.wordOrPhrase] = watchWordObj.watchWordOccurrence.countOfTimesUsed
  //       } else {
  //         obj[watchWordObj.wordOrPhrase] += watchWordObj.watchWordOccurrence.countOfTimesUsed
  //       }
  //     })
  //   })
  //   return obj;
  // }

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
    const { user, watchWords } = this.props;
    const { displayedWatchWords } = this.state;
    // {console.log('!!!!!', this.calcMostUsedWatchWord())}

    return (
      <div className="container-horizontal">
        <div className="container-watchwords">
        <Card>
          <CardHeader
            title=""
          />
        <Divider inset={true} />
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
      </div>
      <div className="container-right container-vertical container-allconversations">
        <div className="container-horizontal">
        <Card style={styles.topLevelCard}>
          <CardHeader
            title="Your Most Used WatchWord"
          />
          <CardText>
            One line.
          </CardText>
        </Card>
        <Card style={styles.topLevelCard}>
          <CardHeader
            title="Your Most Frequent Tone"
          />
          <CardText>
            One line.
          </CardText>
        </Card>
        <Card style={styles.topLevelCard}>
          <CardHeader
            title="Your Last Conversation"
          />
          <CardText>
            One line.
          </CardText>
        </Card>
        </div>
        <div>
          <Tabs
                    onChange={this.handleSlideChange}
                    value={this.state.slideIndex}
                  >
                    <Tab label="WatchWords" value={0} />
                    <Tab label="Tone" value={1} />
                    <Tab label="watchWords and Tone" value={2} />
                  </Tabs>
                  <SwipeableViews
                    index={this.state.slideIndex}
                    onChangeIndex={this.handleChange}
                  >
                    <div className="container-horizontal">
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
                    <div style={styles.slide}>
                      slide 2
                    </div>
                    <div style={styles.slide}>
                      slide 3
                    </div>
                  </SwipeableViews>
        </div>
        </div>
      </div>
    )
  }
}


const mapState = state => {
  return {
    user: state.user,
    conversations: state.allConversations.defaultConversations,
    watchWords: state.watchWords
  };
};

const mapDispatch = null;

export default withRouter(connect(mapState, mapDispatch)(AllConversationsData));
