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
                        <div id="app-headline">Change your unconscious speech patterns and watch your career flourish.</div>
                        <div id="app-description">Our speech can have a significant impact on how we are perceived. Numerous studies have shown that women often use qualifiying words and phrases when they speak, such as apologizing before posing a contrary opinion or couching an idea or proposal with a qualifier such as "I'm no expert." These speech habits can diminish the speaker's authority and perceived competency. Power Prose aims to help women reduce their use of qualifying words and patterns as a way to increase their clout, confidence, and perceived contributions, particularly in the workplace.</div>
                        <Link to="/signup">
                            <RaisedButton className="get-started" style={
                              buttonStyle}>Get Started</RaisedButton></Link>
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
                                <div className="icon-desc">Record your speech in professional interactions such as meetings, phone calls, and presentions and track your use of qualifying "watch words."</div>
                            </div>
                        </div>
                        <div className="bullet-info">
                            <div>
                                <img src="/ToneAnalyzer.svg" className="watson-icon" />
                            </div>
                            <div>
                                <div className="icon-desc-title">LEARN ABOUT YOURSELF</div>
                                <div className="icon-desc">Receive feedback about the tones perceived in your speech, such as anger, confidence, and joy, and see a list of the sentences that were likely perceived as tentative.</div>
                            </div>
                        </div>

                        <div className="bullet-info">
                            <div>
                                <img src="/bar-chart.svg" className="watson-icon" />
                            </div>
                            <div>
                                <div className="icon-desc-title">REVIEW YOUR DATA</div>
                                <div className="icon-desc">View detailed analytics for each of your past conversations or view your all-conversations dashboard to track your progress over time.</div>
                            </div>
                        </div>

                        <div className="bullet-info">
                            <div>
                                <img src="/tick.svg" className="watson-icon" />
                            </div>
                            <div>
                                <div className="icon-desc-title">SUCCEED</div>
                                <div className="icon-desc">Express yourself with increased confidence and achieve your workplace goals.</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="bottom-right">
                    <div id="second-pane-title" className="icon-desc-title">Power Prose will also be available at the App Store in the near future, putting our recording and tracking functionality at your fingertips.</div>
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
