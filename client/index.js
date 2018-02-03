import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { UserInterface } from './components'
import { Router } from 'react-router-dom'
import history from './history'

// establishes socket connection
import './socket'

const theme = getMuiTheme({
  palette: {
    primary1Color: '#fff9c4',
    primary2Color: '#fff9c4',
    primary3Color: '#fff9c4',
    accent1Color: '#fff9c4',
    accent2Color: '#fff9c4',
    accent3Color: '#fff9c4',
    textColor: '#fff9c4',
    alternateTextColor: '#fff9c4',
    canvasColor: '#fff9c4',
    borderColor: '#fff9c4',
    disabledColor: '#fff9c4',
    pickerHeaderColor: '#fff9c4',
    clockCircleColor: '#fff9c4',
    shadowColor: '#fff9c4',
  },
});


ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider muiTheme={theme}>
      <Router history={history}>
        <UserInterface />
      </Router>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('app')
)
