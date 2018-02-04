import React from "react";
import { withRouter } from "react-router-dom";
import { RaisedButton } from 'material-ui';
import { Link } from "react-router-dom";


const buttonStyle = {
    marginLeft: 100,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 20
};

const LandingPage = props => {
    return (
        <div id="landing-page">
            <div id="top-pane">
                <h1 id="title">Power Prose</h1>
                <div id="top-container">
                    <div>
                        <div className="empty-square1" />
                        <img src="https://i.imgur.com/4IoNZqD.jpg" alt="Woman on Phone" id="top-image" />
                    </div>
                    <div id="app-info">
                        <h2 id="app-headline">A clear, concise headline....... </h2>
                        <h3 id="app-description">Elaborate on the benefits of using Power Prose why you want to use it what it is for etc.......</h3>
                        <Link to="/signup">
                        <RaisedButton style={buttonStyle}>Get Started</RaisedButton></Link>
                    </div>
                </div>
                <div id="second-image-div">
                    <div className="empty-square2" />
                    <img src="https://i.imgur.com/MOHrTU1.jpg" alt="desk" id="bottom-image" />
                </div>
            </div>
            <div id="bottom-view">
                <div id="bottom-left">
                    <div id="left-content">
                        <div className="bullet-info">
                            <div>
                                <img src="/SpeechtoText.svg" className="watson-icon" />
                            </div>
                            <div>
                                <div className="icon-desc">information about speech to text analysis what it does on the site etc. etc and watch words..........</div>
                            </div>
                        </div>
                        <div className="bullet-info">
                            <div>
                                <img src="/ToneAnalyzer.svg" className="watson-icon" />
                            </div>
                            <div>
                                <div className="icon-desc">information about tone analysis  what it does on the site etc. etc watching for tentative tones</div>
                            </div>
                        </div>

                        <div className="bullet-info">
                            <div>
                                <img src="/bar-chart.svg" className="watson-icon" />
                            </div>
                            <div>
                                <div className="icon-desc">Watch yourself improve over time with our data visualization etc...</div>
                            </div>
                        </div>

                        <div className="bullet-info">
                            <div>
                                <img src="/tick.svg" className="watson-icon" />
                            </div>
                            <div>
                                <div className="icon-desc">Sound more confident and achieve your goals...</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="bottom-right">
                    <div>
                        <img src="https://i.imgur.com/KIjBss7.png" alt="iphone" id="iphone" />

                    </div>
                </div>
            </div>
        </div>
    );
};

export default withRouter(LandingPage);