import { GET_PRODUCTS } from './actionTypes';
import { GET_ALL_REVIEWS, CREATE_REVIEW } from './actionTypes';

export const productReducer = (state = [], action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products.sort(function (a, b) {
        return a.name - b.name
      });
  }
  return state;
}

export const reviewReducer = (state = [], action) => {
  switch (action.type) {
    case CREATE_REVIEW:
      return [...state, action.review]
    case GET_ALL_REVIEWS:
      return action.reviews
  }
  return state;
}

const authReducer = (state = { user: {} }, action) => {
    switch(action.type){
        case SET_AUTH:
            return { user: action.user }
        case LOGOUT:
            return { user: {}}
        default:
            return state
    }
}