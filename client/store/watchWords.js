import axios from 'axios';
import { log } from 'util';

const SET_USER_WATCHWORDS = 'SET_USER_WATCHWORDS';
const SET_ACTIVE_WATCHWORDS = 'SET_ACTIVE_WATCHWORDS';
const DISABLE_USER_WATCHWORD = 'DISABLE_USER_WATCHWORD';
const ADD_USER_WATCHWORD = 'ADD_USER_WATCHWORD';

const defaultWatchWords = {
  allWatchWords: [],
  activeWatchWords: []
};


const setUserWatchWords = watchWords => ({ type: SET_USER_WATCHWORDS, watchWords })
const disableUserWatchWord = watchWordId => {
  return ({ type: DISABLE_USER_WATCHWORD, watchWordId })
}
const setActiveWatchWords = watchWords => ({ type: SET_ACTIVE_WATCHWORDS, watchWords })

const addUserWatchWord = watchWord => ({ type: ADD_USER_WATCHWORD, watchWord })



export const fetchUserWatchWords = (userId) => dispatch =>
  axios.get(`/api/userWatchWords/${userId}`) // fetch the watch words for the given user
    .then(res => dispatch(setUserWatchWords(res.data)))
    .catch(error => console.log(error));

export const fetchActiveWatchWords = (userId) => dispatch =>
  axios.get(`/api/userWatchWords/${userId}/active`)
    .then(res => dispatch(setActiveWatchWords(res.data)))
    .catch(error => console.log(error));

export const updateUserWatchWord = (userWatchWordId) => dispatch =>
  axios.put(`api/userWatchWords/${userWatchWordId}`, {active: false})
    .then(() => {
      dispatch(disableUserWatchWord(userWatchWordId))
    })
    .catch(error => console.log(error));

export const postUserWatchWord = (watchWord) => dispatch =>
  axios.post(`api/userWatchWords`, watchWord)
    .then(res => dispatch(addUserWatchWord(res.data)))
    .catch(error => console.log(error));


export default function (state = defaultWatchWords, action) {
  switch (action.type) {
    case SET_USER_WATCHWORDS:
      return Object.assign({}, state, { allWatchWords: action.watchWords })

    case DISABLE_USER_WATCHWORD: {
      const newArray = [...state.activeWatchWords.filter(watchWord => watchWord.id !== action.watchWordId)]
      return Object.assign({}, state, { activeWatchWords: newArray })

    }
    case ADD_USER_WATCHWORD: {
      return Object.assign({}, state, { allWatchWords: [...state.allWatchWords, action.watchWord], activeWatchWords: [...state.activeWatchWords, action.watchWord] });
    }

    case SET_ACTIVE_WATCHWORDS:
      return Object.assign({}, state, { activeWatchWords: action.watchWords })

    default:
      return state
  }
}
