import axios from 'axios';

const SET_CHOSEN_CONVERSATION = 'SET_CHOSEN_CONVERSATION';

const defaultConversation = {};

const setChosenConversation = conversation => ({type: SET_CHOSEN_CONVERSATION, conversation});

//this thunk takes a conversationId, fetches that conversation, and then sets that conversation as the chosen conversation on req.session
export const fetchChosenConversation = (conversationId) => dispatch =>
  axios.get(`/api/conversations/${conversationId}`)
    .then(res => dispatch(setChosenConversation(res.data)))
    .catch(error => console.log(error));

//this thunk fetches the chosen conversation from req.session if one exists, otherwise it searches for the most recent conversation, sets that as chosen, and then returns that conversation
export const fetchInitialConversation = (userId) => dispatch =>
  axios.get(`/api/conversations/user/${userId}/chosen`)
    .then(res => dispatch(setChosenConversation(res.data)))
    .catch(error => console.log(error));

export default function (state = defaultConversation, action) {
  switch(action.type) {
    case SET_CHOSEN_CONVERSATION:
      return action.conversation
    default:
      return state
  }
}
