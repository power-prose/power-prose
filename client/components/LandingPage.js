import React from "react";
import { withRouter } from "react-router-dom";
import { RaisedButton } from 'material-ui';
import { Link } from "react-router-dom";


const buttonStyle = {
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 20,
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
                        <div id="app-headline">Change your unconscious speech patterns and watch your professional career flourish.</div>
                        <div id="app-description">Our speech can have a huge impact in how we are perceived. Numerous studies have shown that when they speak, women tend to use qualifier words and phrases which can diminish authority and position. Power Prose aims to help women reduce their use of qualifier words and in doing so increase their clout, confidence and contributions especially in the workplace.</div>
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
                                <div className="icon-desc">Record your conversations and track your use of qualifier "watch words" in your business meetings, phone calls or interview practice.</div>
                            </div>
                        </div>
                        <div className="bullet-info">
                            <div>
                                <img src="/ToneAnalyzer.svg" className="watson-icon" />
                            </div>
                            <div>
                                <div className="icon-desc">Receive feedback about the overall tones of your recorded conversations and see your sentences perceived as tentative.</div>
                            </div>
                        </div>

                        <div className="bullet-info">
                            <div>
                                <img src="/bar-chart.svg" className="watson-icon" />
                            </div>
                            <div>
                                <div className="icon-desc">Watch yourself improve over time with beautiful charts and graphs designed to track your progress.</div>
                            </div>
                        </div>

                        <div className="bullet-info">
                            <div>
                                <img src="/tick.svg" className="watson-icon" />
                            </div>
                            <div>
                                <div className="icon-desc">Sound more confident and achieve your workplace goals.</div>
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
