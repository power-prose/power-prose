import axios from 'axios';

const SET_ALL_CONVERSATIONS = "SET_ALL_CONVERSATIONS";

const defaultConversations = [];

const setAllConversations = conversations => ({type: SET_ALL_CONVERSATIONS, conversations});

export const fetchAllConversations = (userId) => dispatch =>
axios.get(`/api/conversations/user/${userId}`)
.then(res => dispatch(setAllConversations(res.data)))
.catch(error => console.log(error));

export default function (state = defaultConversations, action) {
  switch(action.type) {
    case SET_ALL_CONVERSATIONS:
      return action.conversations
    default:
      return state
  }
}
