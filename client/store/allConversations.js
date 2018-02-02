import axios from 'axios';
import store, {fetchChosenConversation} from '../store';


const SET_ALL_CONVERSATIONS = "SET_ALL_CONVERSATIONS";
const POST_NEW_CONVERSATION = "POST_NEW_CONVERSATION";
const SET_RECORDED_TEXT = "SET_RECORDED_TEXT"
const SET_CONVO_START_TIME = "SET_CONVO_START_TIME";
const SET_CONVO_END_TIME = " SET_CONVO_END_TIME";
const UPDATE_CONVO = "UPDATE_CONVO"

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
export const updateConversation = (conversation) => ({type: UPDATE_CONVO, conversation})


export const fetchAllConversations = (userId) => dispatch =>
  axios.get(`/api/conversations/user/${userId}`)
    .then(res => dispatch(setAllConversations(res.data)))
    .catch(error => console.log(error));

export function postNewConvo(conversation) {
  return function thunk(dispatch) {
    // conversation.text = store.getState().allConversations.recordedText;
    conversation.lengthTime = (store.getState().allConversations.endTime - store.getState().allConversations.startTime) / 1000;
    console.log("CONVERSATION!!!!!!!", conversation);
    return axios.post(`/api/conversations`, conversation)
        .then(res => res.data)
        .then(newConversation => {
          const action = postNewConversation(newConversation);
          dispatch(action);
          dispatch(fetchChosenConversation(newConversation.id))
          //history.push(`/`);
        })
        .catch(error => console.log(error));
  };
}

export function updateConversationThunk(conversation) {
  return function thunk(dispatch) {
    return axios.put(`/api/conversations/${conversation.id}`, conversation)
        .then(res => {
          console.log("DATA!!!!!", res.data)
          dispatch(updateConversation(res.data))
          dispatch(fetchChosenConversation(res.data.id))
        })
        .catch(error => console.log(error + ` Updating conversation ${conversation.id} was unsuccessful`))
  }
}

export default function (state = initialConversationState, action) {
  switch (action.type) {
    case SET_ALL_CONVERSATIONS:
      return Object.assign({}, state, {defaultConversations: action.conversations})

    case POST_NEW_CONVERSATION: {
      const allConversations = [...state.defaultConversations, action.conversation]
      return Object.assign({}, state, {defaultConversations: allConversations})
    }

    case SET_RECORDED_TEXT:
      return Object.assign({}, state, {recordedText: action.text})

    case SET_CONVO_START_TIME:
      return Object.assign({}, state, {startTime: action.time})

    case SET_CONVO_END_TIME:
      return Object.assign({}, state, {endTime: action.time})

    case UPDATE_CONVO: {
      const updatedConversations = state.defaultConversations.map(conversation =>(action.conversation.id === conversation.id ? action.conversation : conversation))

      return Object.assign({}, state, {defaultConversations: updatedConversations})
    }

    default:
      return state
  }
}
