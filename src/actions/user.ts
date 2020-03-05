import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { batch } from 'react-redux';

/* Interface */
import { UserState } from 'interface';

import user from 'services/user';
import { SET_ERROR_MESSAGE } from './feedback';

export const REQUEST_USER = 'REQUEST_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

export function request_user(): AnyAction {
  const user: UserState = JSON.parse(localStorage.getItem('user') as string)

  return {
    type: REQUEST_USER,
    payload: user
  }
}

export function login(values: any, history: any): ThunkAction<void, {}, {}, AnyAction> {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch({type: LOGIN_REQUEST});

    user.login(values).then((user: UserState) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: user
      });
      localStorage.setItem('user', JSON.stringify(user));
      history.push('/');
    }).catch(({response}) => {
      set_error(response, dispatch, 'LOGIN');
    })
  }
}

export function register(values: any, history: any): ThunkAction<void, {}, {}, AnyAction> {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch({type: REGISTER_REQUEST});

    user.register(values).then((user: UserState) => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: user
      });
      localStorage.setItem('user', JSON.stringify(user));
      history.push('/');
    }).catch(({response}) => {
      set_error(response, dispatch, 'REGISTER');
    })
  }
}

export function logout(): AnyAction {
  localStorage.removeItem('user');
  
  return {
    type: LOGOUT_USER
  }
}

function set_error(response: any, dispatch: any, type: any) {
  if (response.status === 422) {
    batch(() => {
      dispatch({type: `${type}_FAILURE`})
      dispatch({
        type: SET_ERROR_MESSAGE,
        payload: response.data.errors[0].msg
      })
    })
  } else if (response.status === 400) {
    batch(() => {
      dispatch({type: `${type}_FAILURE`})
      dispatch({
        type: SET_ERROR_MESSAGE,
        payload: response.data
      })
    })
  } else {
    batch(() => {
      dispatch({type: `${type}_FAILURE`})
      dispatch({
        type: SET_ERROR_MESSAGE,
        payload: 'Something went wrong please try again later!'
      })
    })
  }
}