import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './user'
import watchWords from './watchWords'
import allConversations from './allConversations'
import chosenConversation from './chosenConversation'
import snippets from './snippets'

const reducer = combineReducers({ user, watchWords, allConversations, chosenConversation, snippets })
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './watchWords'
export * from './allConversations'
export * from './chosenConversation'
export * from './snippets'
