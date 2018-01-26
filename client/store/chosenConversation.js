import axios from 'axios';

const SET_CHOSEN_CONVERSATION = 'SET_CHOSEN_CONVERSATION';

const defaultConversation = {};

const setChosenConversation = conversation => ({type: SET_CHOSEN_CONVERSATION, conversation});

export const fetchChosenConversation = (conversationId) => dispatch =>
  axios.get(`/api/conversations/${conversationId}`)
    .then(res => dispatch(setChosenConversation(res.data)))
    .catch(error);

export default function (state = defaultConversation, action) {
  switch(action.type) {
    case SET_CHOSEN_CONVERSATION:
      return action.conversation
    default:
      return state
  }
};
