import axios from 'axios';

const SET_SNIPPETS = 'SET_SNIPPETS';

const defaultSnippets = [];

const setSnippets = snippets => ({type: SET_SNIPPETS, snippets})

export const fetchSnippets = () => dispatch =>
  axios.get('api/snippets')
    .then(res => dispatch(setSnippets(res.data)))
    .catch(error);

export default function (state = defaultSnippets, action) {
  switch(action.type) {
    case SET_SNIPPETS:
      return action.snippets
    default:
      return state
  }
};
