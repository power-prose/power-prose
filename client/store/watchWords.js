import axios from 'axios';

const SET_USER_WATCHWORDS = 'SET_USER_WATCHWORDS';

const defaultWatchWords = [];

const setUserWatchWords = watchWords => ({type: SET_USER_WATCHWORDS, watchWords})

export const fetchUserWatchWords = (userId) => dispatch =>
  axios.get('/api/userWatchWords/:userId') // fetch the watch words for the given user
    .then(res => dispatch(setUserWatchWords(res.data)))
    .catch(error => console.log(error));

export default function (state = defaultWatchWords, action) {
  switch (action.type) {
    case SET_USER_WATCHWORDS:
      return action.watchWords
    default:
      return state
  }
}
