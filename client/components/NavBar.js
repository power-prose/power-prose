import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../store';

const NavBar = (props) => {
    const { handleClick, isLoggedIn } = props;

    return (
        <div>
            <h1>Power Prose</h1>
            {
                isLoggedIn
                    ? <div>
                        {/* The navbar will show these links after you log in */}
                        <Link to="/">Home</Link>
                        <a href="#" onClick={handleClick}>Logout</a>
                    </div>
                    : <div>
                        {/* The navbar will show these links before you log in */}
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Sign Up</Link>
                    </div>
            }

        </div>
    )

}

const mapState = (state) => {
    return {
        isLoggedIn: !!state.user.id
    }
}

const mapDispatch = (dispatch) => {
    return {
      handleClick () {
        dispatch(logout())
      }
    }
  }

  export default withRouter(connect(mapState, mapDispatch)(NavBar))
