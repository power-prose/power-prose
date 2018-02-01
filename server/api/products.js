import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'
const GET_PRODUCT_BY_NAME = 'GET_PRODUCT_BY_NAME'
 /**
 * INITIAL STATE
 */
const defaultProducts = []
 /**
 * ACTION CREATORS
 */
export const getAllProducts = (products) => ({type: GET_ALL_PRODUCTS, products})

 /**
 * THUNK CREATORS
 */
export const fetchAllProducts = () =>
  dispatch => axios.get('/api/products')
    .then(res => dispatch(getAllProducts(res.data)))
    .catch(err => console.log(err))

 /**
 * REDUCER
 */
export default function (state = defaultProducts, action) {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return action.products
    default:
      return state
  }
}
