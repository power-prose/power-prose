import axios from 'axios';
import { log } from 'util';

const SET_USER_WATCHWORDS = 'SET_USER_WATCHWORDS';
const DELETE_USER_WATCHWORD = 'DELETE_USER_WATCHWORD';
const ADD_USER_WATCHWORD = 'ADD_USER_WATCHWORD';

const defaultWatchWords = [];

const setUserWatchWords = watchWords => ({type: SET_USER_WATCHWORDS, watchWords})
const deleteUserWatchWord = watchWordId => ({type: DELETE_USER_WATCHWORD, watchWordId}) 
const addUserWatchWord = watchWord => ({type: DELETE_USER_WATCHWORD, watchWord})

export const fetchUserWatchWords = (userId) => dispatch =>
  axios.get(`/api/userWatchWords/${userId}`) // fetch the watch words for the given user
    .then(res => dispatch(setUserWatchWords(res.data)))
    .catch(error => console.log(error));

export const deleteUserWatchWord = (userId, userWatchWordId) => dispatch =>
  axios.delete(`api/userWatchWords/${userId}/${userWatchWordId}`)
    .then((res) => dispatch(deleteUserWatchWord(userWatchWordId)))  
    .catch(error => console.log(error));

export const addUserWatchWord = (userId, watchWord) => dispatch => 
  axios.post(`api/userWatchWords/${userId}`, watchWord)
    .then((res) => dispatch(addUserWatchWord(res.data)))  
    .catch(error => console.log(error));
    
  
export default function (state = defaultWatchWords, action) {
  switch (action.type) {
    case SET_USER_WATCHWORDS:
      return action.watchWords
    case DELETE_USER_WATCHWORD:
      return [...state.watchWords.filter(watchWord => watchWord.id !== action.watchWordId)]
    case ADD_USER_WATCHWORD:
      return [...state.watchWords, action.watchWord]    
    default:
      return state
  }
}
