import axios from 'axios';
import store from '../store';

const SET_ALL_CONVERSATIONS = "SET_ALL_CONVERSATIONS";
const POST_NEW_CONVERSATION = "POST_NEW_CONVERSATION";
const SET_RECORDED_TEXT = "SET_RECORDED_TEXT"
const SET_CONVO_START_TIME = "SET_CONVO_START_TIME";
const SET_CONVO_END_TIME = " SET_CONVO_END_TIME";

const initialConversationState = {
  defaultConversations: [],
  recordedText: '',
  startTime: 0,
  endTime: 0
}

const setAllConversations = conversations => ({type: SET_ALL_CONVERSATIONS, conversations});
const postNewConversation = conversation => ({type: POST_NEW_CONVERSATION, conversation})
export const setRecordedText = (text) => ({type: SET_RECORDED_TEXT, text})
export const setConvoStartTime = (time) => ({type: SET_CONVO_START_TIME, time})
export const setConvoEndTime = (time) => ({type: SET_CONVO_END_TIME, time})


export const fetchAllConversations = (userId) => dispatch =>
  axios.get(`/api/conversations/user/${userId}`)
    .then(res => dispatch(setAllConversations(res.data)))
    .catch(error => console.log(error));

export function postNewConvo(conversation) {
  return function thunk(dispatch) {
    conversation.text = store.getState().allConversations.recordedText;
    conversation.lengthTime = (store.getState().allConversations.endTime - store.getState().allConversations.startTime) / 1000;
    return axios.post(`/api/conversations`, conversation)
        .then(res => res.data)
        .then(newConversation => {
          const action = postNewConversation(newConversation);
          dispatch(action);
          //history.push(`/`);
        })
        .catch(error => console.log(error));
  };
}

export default function (state = initialConversationState, action) {
  switch (action.type) {
    case SET_ALL_CONVERSATIONS:
      return Object.assign({}, state, {defaultConversations: action.conversations})

    case POST_NEW_CONVERSATION: {
      const allConversations = [...state.defaultConversations, action.conversation]
      return Object.assign({}, state, {defaultConversations: allConversations,
      currentConversation: action.conversation})
    }

    case SET_RECORDED_TEXT:
      return Object.assign({}, state, {recordedText: action.text})

    case SET_CONVO_START_TIME:
      return Object.assign({}, state, {startTime: action.time})

    case SET_CONVO_END_TIME:
      return Object.assign({}, state, {endTime: action.time})

    default:
      return state
  }
}
