import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
//import Routes from './routes'

import { UserInterface } from './components'
import { Router } from 'react-router-dom'
import history from './history'

// establishes socket connection
import './socket'

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <UserInterface />
    </Router>
  </Provider>,
  document.getElementById('app')
)
