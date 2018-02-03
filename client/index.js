import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import getMuiTheme from 'material-ui/styles/getMuiTheme'; //for setting custom theme
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { UserInterface } from './components'
import { Router } from 'react-router-dom'
import history from './history'

// establishes socket connection
import './socket'

// colors for setting custom theme

// const theme = getMuiTheme({
//   palette: {
//     primary1Color: '#f0ddd4',
//     primary2Color: '#ffffff',
//     primary3Color: '#bdaba3',
//     accent1Color: '#0e254c',
//     accent2Color: '#3e4d78',
//     accent3Color: '#000024',
//     textColor: '#000000',
//     alternateTextColor: '#ffffff',
//     canvasColor: '#f0ddd4',
//     borderColor: '#bdaba3',
//     disabledColor: '#C8C8C8',
//     pickerHeaderColor: '#0e254c',
//     clockCircleColor: '#0e254c',
//     shadowColor: '#C8C8C8',
//   },
// });


ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider >
      <Router history={history}>
        <UserInterface />
      </Router>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('app')
)
