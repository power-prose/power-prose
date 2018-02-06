import React from "react";
import { withRouter } from "react-router-dom";
import { RaisedButton } from 'material-ui';
import { Link } from "react-router-dom";


const buttonStyle = {
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 20,
    backgroundColor: "#f99",
    "&:hover": {
        backgroundColor: "#000"
    }
};

const LandingPage = props => {
    return (
        <div id="landing-page">
            <div id="top-pane">
                <div id="top-pane-top">
                    <div className="image-container1">
                        <div className="empty-square1" />
                        <img src="https://i.imgur.com/4IoNZqD.jpg" alt="Woman on Phone" id="top-image" />
                    </div>
                    <div id="top-pane-middle" />
                    <div id="app-info">
                        <div id="app-headline">Change your unconscious speech patterns and watch your professional career flourish.</div>
                        <div id="app-description">Our speech can have a huge impact in how we are perceived. Numerous studies have shown that women often use qualifiying words and phrases when they speak which can diminish their authority and perceived competency. Things like apologizing before posing a contrary opinion undermines the strength of perspective. Power Prose aims to help women reduce their use of qualifier words and in doing so increase their confidence and contributions especially in the workplace.</div>
                        <Link to="/signup">
                            <RaisedButton className="get-started" style={buttonStyle}>Get Started</RaisedButton></Link>
                    </div>
                </div>
                <div id="top-pane-bottom">
                    <div>
                        <div className="empty-square2" />
                        <div className="image-container2">
                            <img src="https://i.imgur.com/MOHrTU1.jpg" alt="desk" id="bottom-image" />
                        </div>
                    </div>
                    <div id="top-pane-bottom-right-space" />
                </div>
            </div>
            <div id="bottom-pane">
                <div id="bottom-left">
                    <div id="left-content">
                        <div className="bullet-info">
                            <div>
                                <img src="/SpeechtoText.svg" className="watson-icon" />
                            </div>
                            <div>
                                <div className="icon-desc-title">SPEAK FREELY </div>
                                <div className="icon-desc">Record your conversations and track your use of qualifier "watch words" in your business meetings, phone calls or interview practice.</div>
                            </div>
                        </div>
                        <div className="bullet-info">
                            <div>
                                <img src="/ToneAnalyzer.svg" className="watson-icon" />
                            </div>
                            <div>
                                <div className="icon-desc-title">LEARN ABOUT YOURSELF</div>
                                <div className="icon-desc">Receive feedback about the overall tones of your recorded conversations and which sentences were identified as tentative.</div>
                            </div>
                        </div>

                        <div className="bullet-info">
                            <div>
                                <img src="/bar-chart.svg" className="watson-icon" />
                            </div>
                            <div>
                                <div className="icon-desc-title">REVIEW YOUR DATA</div>
                                <div className="icon-desc">Watch yourself improve over time with beautiful charts and graphs designed to track your progress.</div>
                            </div>
                        </div>

                        <div className="bullet-info">
                            <div>
                                <img src="/tick.svg" className="watson-icon" />
                            </div>
                            <div>
                                <div className="icon-desc-title">SUCCEED</div>
                                <div className="icon-desc">Sound more confident and achieve your workplace goals.</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="bottom-right">
                    <div id="second-pane-title" className="icon-desc-title">Something Something at your fingertips/in your pocket (want to show screenshot of data viz on phone here.</div>
                    <div>
                        <img src="powerprose.png" alt="iphone" id="iphone" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withRouter(LandingPage);

// https://i.imgur.com/KIjBss7.png
