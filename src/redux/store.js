/* eslint-disable prettier/prettier */
import {createStore} from 'redux';

const initialState = {
  user: null,
  access_token: null,
};

const reducer = (state = initialState, action) => {
  if (action.type === 'SET_LOGIN') {
    return {
      ...state,
      user: action.value.user,
      access_token:action.value.access_token,
    };
  }
  return state;
};

const store = createStore(reducer);

export default store;
