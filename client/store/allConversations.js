import axios from 'axios';

const SET_ALL_CONVERSATIONS = "SET_ALL_CONVERSATIONS";

const POST_NEW_CONVERSATION = "POST_NEW_CONVERSATION"

const initialConversationState = {
  defaultConversations: [],
  currentConversation: {
    // tones: [],
    // text: ''
  }
}

const setAllConversations = conversations => ({type: SET_ALL_CONVERSATIONS, conversations});

const postNewConversation = conversation => ({type: POST_NEW_CONVERSATION, conversation})

export const fetchAllConversations = (userId) => dispatch =>
axios.get(`/api/conversations/user/${userId}`)
.then(res => dispatch(setAllConversations(res.data)))
.catch(error);

export function postNewConvo(conversation) {
  return function thunk(dispatch) {
    console.log("IS IT HERE?",conversation )
      return axios.post(`/api/conversations`, conversation)
          .then(res => res.data)
          .then(newConversation => {
              const action = postNewConversation(newConversation);
              dispatch(action);
              //history.push(`/products`);
          })
          .catch(error => console.log(error));
  };
}

// export const postNewConvo = (newConversation) => dispatch =>
// console.log("!!! IT WORKED", newConversation)
// axios.post(`/api/conversations`, newConversation) 
// .then(res => dispatch(postNewConversation(res.data)))
// .catch(error);


export default function (state = initialConversationState, action) {
  switch (action.type) {
    case SET_ALL_CONVERSATIONS:
      return action.conversations

    case POST_NEW_CONVERSATION: {
      const allConversations = [...state.defaultConversations, action.conversation]
      return Object.assign({}, state, {defaultConversations: allConversations,
      currentConversation: action.conversation})
    }
    default:
      return state
  }
}
