import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { dateParser } from '../utils'
import {LineChart, Line, Brush, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import Toggle from 'material-ui/Toggle';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';


export class AllConversationsView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayedWatchWords: [],
      displayedTones: ['anger', 'fear', 'joy', 'sadness', 'analytical', 'confident', 'tentative'],
      slideIndex: 0
    }
  }

  componentDidMount () {
    if (this.props.watchWords !== this.state.displayedWatchWords) {
      this.setState({ displayedWatchWords: this.props.watchWords.map(watchWordObj => watchWordObj.wordOrPhrase) })
    }
  }

  // ensures local state is updated with this.props.watchWords when the components receives these props from the store
  componentWillReceiveProps (newProps) {
    if (newProps.watchWords !== this.state.displayedWatchWords) {
      this.setState({ displayedWatchWords: this.props.watchWords.map(watchWordObj => watchWordObj.wordOrPhrase) })
    }
  }

  // updates local state, which the chart uses to render lines
  handleWordToggle = (word) => {
    const { displayedWatchWords } = this.state

    if (displayedWatchWords.indexOf(word) === -1) this.setState({ displayedWatchWords: this.handleToggleHelper(displayedWatchWords, word) })
    else this.setState({ displayedWatchWords: displayedWatchWords.filter(watchWord => watchWord !== word) })
  }

  handleToneToggle = (tone) => {
    const { displayedTones } = this.state

    if (displayedTones.indexOf(tone) === -1) this.setState({ displayedTones: this.handleToggleHelper(displayedTones, tone) })
    else this.setState({ displayedTones: displayedTones.filter(toneOnState => toneOnState !== tone) })
  }

  // a helper function to return the array, not its length, and setState with this new array
  handleToggleHelper = (array, word) => {
    array.push(word);
    return array;
  }

  handleSlideChange = (value, label) => {
    this.setState({
      slideIndex: value
    });
  };

  calcMostUsedWatchWord = () => {
    const { conversations } = this.props;
    let obj = {}

    conversations.forEach(conversation => {
      conversation.watchWords.forEach(watchWordObj => {
        if (watchWordObj.wordOrPhrase !== undefined) {
          if (obj[watchWordObj.wordOrPhrase] === undefined) {
            obj[watchWordObj.wordOrPhrase] = watchWordObj.watchWordOccurrence.countOfTimesUsed
          } else {
            obj[watchWordObj.wordOrPhrase] += watchWordObj.watchWordOccurrence.countOfTimesUsed
          }
        }
      })
    })
    let count = 0;
    let word = ''
    for (var key in obj) {
      if (obj[key] > count) {
        count = obj[key];
        word = key;
      }
    }
    return word;
  }

calcMostFrequentTone = () => {
    const { conversations } = this.props;
    const possibleTones = ['anger', 'fear', 'joy', 'sadness', 'analytical', 'confident', 'tentative'];
    let obj = {}

    conversations.forEach(conversation => {
      let toneObj = conversation.tone;

      possibleTones.forEach(tone => {
        if (toneObj[tone] !== undefined) {
          obj[tone] === undefined ? obj[tone] = +toneObj[tone] : obj[tone] += +toneObj[tone]
        }
      })
    })

    let count = 0;
    let word = '';

    for (var key in obj) {
      if (obj[key] > count) {
        count = obj[key];
        word = key;
      }
    }
    return word;
  }

  calcLatestConvo = () => {
    const { conversations } = this.props;
    let date = ''

    conversations.forEach(conversation => {
      if (conversation.date > date) date = conversation.date
    })

    return dateParser(date);
  }

  // create chart data from a user's conversations
  createWordData = () => {
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

  createToneData = () => {
    const { conversations } = this.props;
    let data = [];
    let toneArr = ['anger', 'fear', 'joy', 'sadness', 'analytical', 'confident', 'tentative'];

    conversations.forEach(conversation => {
      let newObj = {}
      let toneObj = conversation.tone;
      newObj.name = conversation.name;
        toneArr.forEach(tone => {

          if (toneObj[tone] !== undefined) {
            newObj[tone] = toneObj[tone] * 10;
          } else {
            newObj[tone] = 0;
          }
        })
        data.push(newObj)
    })
    return data;
  }

  render () {
    const { user, watchWords, conversations } = this.props;
    const { displayedWatchWords, onMenu, slideIndex, displayedTones } = this.state;

    return (
      <div className="container-inner-horizontal">
        <div className="container-watchwords">
          {this.renderMenu(slideIndex)}
        </div>
        <div className="container-right container-vertical">
          <div className="container-inner-horizontal">
            <Card style={styles.topLevelCard}>
              <CardHeader
                title="Your Most Used WatchWord"
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
            <Card style={styles.topLevelCard}>
              <CardHeader
                title="Your Last Conversation"
              />
              <CardText>
                {this.calcLatestConvo()}
              </CardText>
            </Card>
          </div>
        <div>
          <Tabs
            onChange={this.handleSlideChange}
            value={this.state.slideIndex}
            style={styles.tab}
          >
            <Tab label="WatchWords" value={0} />
            <Tab label="Tone" value={1} />
            <Tab label="watchWords and Tone" value={2} />
          </Tabs>
          <SwipeableViews
            index={this.state.slideIndex}
            onChangeIndex={this.handleChange}
          >
          <div className="container-inner-horizontal container-inside-tabs">
            <LineChart width={1000} height={500} data={this.createWordData()}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
              <XAxis dataKey="name"/>
              <YAxis/>
              <CartesianGrid strokeDasharray="3 3"/>
              <Tooltip/>
              <Legend />
              {
                displayedWatchWords.length && displayedWatchWords.map(watchWord => (
                  <Line key={watchWord.id} type="monotone" dataKey={watchWord} stroke="#8884d8" activeDot={{r: 8}}/>
                ))
              }
              <Brush>
                <LineChart>
                {
                  displayedWatchWords.length && displayedWatchWords.filter(word => word === 'sorry').map(word => (
                    <Line key={word} type="monotone" dataKey={word} stroke="#8884d9" activeDot={{r: 8}}/>
                  ))
                }
                </LineChart>
              </Brush>
            </LineChart>
          </div>
          <div style={styles.slide}>
          <LineChart width={1000} height={500} data={this.createToneData()}
          margin={{top: 5, right: 30, left: 20, bottom: 5}}>
          <XAxis dataKey="name"/>
          <YAxis/>
          <CartesianGrid strokeDasharray="3 3"/>
          <Tooltip/>
          <Legend />
          {
            displayedTones.length && displayedTones.map(tone => (
              <Line key={tone} type="monotone" dataKey={tone} stroke="#8884d9" activeDot={{r: 8}}/>
            ))
          }
          <Brush>
          <LineChart>
          {
            displayedTones.length && displayedTones.filter(tone => tone === 'tentative').map(tone => (
              <Line key={tone} type="monotone" dataKey={tone} stroke="#8884d9" activeDot={{r: 8}}/>
            ))
          }
          </LineChart>
          </Brush>
          </LineChart>
          </div>
          <div style={styles.slide}>
          <LineChart width={1000} height={500} data={this.createWordData()} syncId="anyId"
          margin={{top: 5, right: 30, left:20, bottom: 5}}>
          <XAxis dataKey="name"/>
          <YAxis/>
          <CartesianGrid strokeDasharray="3 3"/>
          <Tooltip/>
          {
            displayedWatchWords.length && displayedWatchWords.map(watchWord => (
              <Line key={watchWord.id} type="monotone" dataKey={watchWord} stroke="#8884d8" activeDot={{r: 8}}/>
            ))
          }
          </LineChart>
          <p>Maybe some other content</p>
          <LineChart width={1000} height={500} data={this.createToneData()} syncId="anyId"
          margin={{top: 5, right: 30, left:20, bottom: 5}}>
          <XAxis dataKey="name"/>
          <YAxis/>
          <CartesianGrid strokeDasharray="3 3"/>
          <Tooltip/>
          {
            displayedTones.length && displayedTones.map(tone => (
              <Line key={tone} type="monotone" dataKey={tone} stroke="#8884d9" activeDot={{r: 8}}/>
            ))
          }
          <Brush>
          <LineChart>
          {
            displayedTones.length && displayedTones.filter(tone => tone === 'tentative').map(tone => (
              <Line key={tone} type="monotone" dataKey={tone} stroke="#8884d9" activeDot={{r: 8}}/>
            ))
          }
          </LineChart>
          </Brush>
          </LineChart>
          </div>
          </SwipeableViews>
          </div>
          </div>
          </div>
    )
  }

  renderMenu = (slideIndex) => {
    const { watchWords } = this.props;
    const tones = ['anger', 'fear', 'joy', 'sadness', 'analytical', 'confident', 'tentative']
    switch (slideIndex) {
      case 0:
        return (
          <Card style={styles.cardStyle}>
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
                    onToggle={() => this.handleWordToggle(watchWord.wordOrPhrase)}
                    style={styles.toggle}
                  />
                ))
              }
            </div>
            </CardText>
          </Card>
        )
      case 1:
       return (
         <Card style={styles.cardStyle}>
           <CardHeader
             title=""
           />
           <Divider inset={true} />
           <CardHeader
             title="Filter Your Tones"
           />
         <CardText>A score greater than 7.5 indicates a high likelihood that this tone was perceived.</CardText>
           <CardText>
           <div style={styles.block}>
             {
               tones.length && tones.map(tone => (
                 <Toggle
                   label={tone}
                   defaultToggled={true}
                   onToggle={() => this.handleToneToggle(tone)}
                   style={styles.toggle}
                  />
              ))
            }
          </div>
          </CardText>
        </Card>
       )
      case 2:
      return (
        <Card style={styles.cardStyle}>
          <CardHeader
            title="Filter Your WatchWords and Tones"
          />
          <Divider inset={true} />
          <Subheader>Watchwords</Subheader>
          <CardText>
          <div style={styles.block}>
            {
              watchWords.length && watchWords.map(watchWord => (
                <Toggle
                  label={watchWord.wordOrPhrase}
                  defaultToggled={true}
                  onToggle={() => this.handleWordToggle(watchWord.wordOrPhrase)}
                  style={styles.toggle}
                />
              ))
            }
          </div>
          </CardText>
          <Divider inset={true} />
          <Subheader>Tones</Subheader>
          <CardText>
          <div style={styles.block}>
            {
              tones.length && tones.map(tone => (
                <Toggle
                  label={tone}
                  defaultToggled={true}
                  onToggle={() => this.handleToneToggle(tone)}
                  style={styles.toggle}
                 />
             ))
           }
          </div>
          </CardText>
        </Card>
      )
        default:
        return (
          <Card style={styles.cardStyle}>
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
        )
        }
      }

}

const mapState = state => {
  return {
    user: state.user,
    conversations: state.allConversations.defaultConversations,
    watchWords: state.watchWords
    // pull in tones from the state on the store -- use them to render the toggle menu
  };
};

const mapDispatch = null;

export default withRouter(connect(mapState, mapDispatch)(AllConversationsView));

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
  },
  tab: {
    maxWidth: 1000
  },
  cardStyle: {
    minWidth: 260
  }
};
