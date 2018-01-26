import React from 'react';
import { connect } from 'react-redux';


const RecordButtons = () => {


    return (
        <div>
            <h1>Record Buttons Here</h1>
            <div className="on-button-container">
            <button className="on-button">START</button>
          </div>
          <div>
            <button className="stop-button">STOP</button>
          </div>
        </div>

    )

}

const mapState = (state) => {
    return {
    }
}


export default connect(mapState)(RecordButtons);
