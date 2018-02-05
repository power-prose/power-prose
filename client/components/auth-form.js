import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { auth } from "../store";
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
} from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";

/**
 * COMPONENT
 */

class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(evt) {
    const key = evt.target.name
    const val = evt.target.value
    this.setState({[key]: val})
  }

  render() {
    const { name, displayName, handleSubmit, error } = this.props;

    let disableButton;
    if (!this.state.email.length || !this.state.password.length) disableButton = true;
    else disableButton = false
    const greeting = displayName === 'Login' ? 'Welcome back' : 'Hi there'

    return (
      <div id="auth-wrapper">
      <Card

      className="login-card">
        <CardTitle titleColor="#0e254c" titleStyle={{"fontFamily": "Amaranth, sans-serif", "fontWeight": "bold", "textAlign": "center"}} title={greeting} />
        <CardText>
          <div>
            <TextField
            inputStyle={{color: "#0E254C"}}
            underlineFocusStyle={{ borderColor: "#C98E34"}}
            floatingLabelFocusStyle={{color: "#C98E34"}}
            fullWidth={true}
            name="email"
            floatingLabelText="Email"
            value={this.state.email}
            onChange={this.handleChange}
            />
          </div>
          <div>
            <TextField
            inputStyle={{color: "#0E254C"}}
            underlineFocusStyle={{ borderColor: "#C98E34"}}
            floatingLabelFocusStyle={{color: "#C98E34"}}
            fullWidth={true}
            name="password"
            type="password"
            floatingLabelText="Password"
            value={this.state.password}
            onChange={this.handleChange}            />
          </div>
          {error && error.response && <div> {error.response.data} </div>}
        </CardText>
        <CardActions>
        <div>
          <FlatButton
            style={{"marginBottom": "10px", "color": "#0e254c", "border": "1px solid #0e254c"}}
            fullWidth={true}
            backgroundColor="#f0ddd4"
            hoverColor= "rgb(204,242,218)"//"rgb(204,242,218)"
            label={displayName}
            secondary={true}
            onClick={evt => handleSubmit(evt, name, this.state.email, this.state.password)}
          />
          </div>
          <div style={{"textAlign": "center", "fontSize": "0.75em"}}>
          <a className="gAuth-link" href="/auth/google">{`${displayName} with Google`}</a>
          </div>
        </CardActions>

      </Card>
      </div>
    );
  }
}


/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: "login",
    displayName: "Login",
    error: state.user.error
  };
};

const mapSignup = state => {
  return {
    name: "signup",
    displayName: "Sign Up",
    error: state.user.error
  };
};

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt, formName, email, password) {
      evt.preventDefault();
      if (email.length && password.length) dispatch(auth(email, password, formName));
    }
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
};

// <div>
//       <form onSubmit={handleSubmit} name={name}>
//         <div>
//           <label htmlFor="email"><small>Email</small></label>
//           <input name="email" type="text" />
//         </div>
//         <div>
//           <label htmlFor="password"><small>Password</small></label>
//           <input name="password" type="password" />
//         </div>
//         <div>
//           <button type="submit">{displayName}</button>
//         </div>
        // {error && error.response && <div> {error.response.data} </div>}
//       </form>
//       <a href="/auth/google">{displayName} with Google</a>
//     </div>
