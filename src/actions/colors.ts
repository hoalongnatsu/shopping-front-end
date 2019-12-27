import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { batch } from 'react-redux';
import { message } from 'antd';

/* Interface */
import { ColorsState } from 'interface';

import colors from 'services/colors';
import { SET_ERROR_MESSAGE } from './feedback';

export const GET_COLORS_REQUEST = 'GET_COLORS_REQUEST';
export const GET_COLORS_SUCCESS = 'GET_COLORS_SUCCESS';
export const GET_COLORS_FAILURE = 'GET_COLORS_FAILURE';
export const CREATE_COLOR_REQUEST = 'CREATE_COLOR_REQUEST';
export const CREATE_COLOR_SUCCESS = 'CREATE_COLOR_SUCCESS';
export const CREATE_COLOR_FAILURE = 'CREATE_COLOR_FAILURE';
export const UPDATE_COLOR_REQUEST = 'UPDATE_COLOR_REQUEST';
export const UPDATE_COLOR_SUCCESS = 'UPDATE_COLOR_SUCCESS';
export const UPDATE_COLOR_FAILURE = 'UPDATE_COLOR_FAILURE';
export const DELETE_COLOR_REQUEST = 'DELETE_COLOR_REQUEST';
export const DELETE_COLOR_SUCCESS = 'DELETE_COLOR_SUCCESS';
export const DELETE_COLOR_FAILURE = 'DELETE_COLOR_FAILURE';

export function get_all_colors(): ThunkAction<void, {}, {}, AnyAction> {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch({type: GET_COLORS_REQUEST})

    colors.get_all_colors().then((colors) => {
      dispatch({
        type: GET_COLORS_SUCCESS,
        payload: colors
      })
    }).catch((e) => {
      batch(() => {
        dispatch({type: GET_COLORS_FAILURE})
        dispatch({
          type: SET_ERROR_MESSAGE,
          payload: 'Something went wrong please try again later!'
        })
      })
    })
  }
}

export function create_color(color: ColorsState, history: any): ThunkAction<void, {}, {}, AnyAction> {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch({type: CREATE_COLOR_REQUEST});

    colors.create_color(color).then((color) => {
      dispatch({
        type: CREATE_COLOR_SUCCESS,
        payload: color
      })
      history.push('/colors');
    }).catch(({response}) => {
      if (response.status === 422) {
        batch(() => {
          dispatch({type: CREATE_COLOR_FAILURE})
          dispatch({
            type: SET_ERROR_MESSAGE,
            payload: response.data.errors[0].msg
          })
        })
      } else {
        batch(() => {
          dispatch({type: CREATE_COLOR_FAILURE})
          dispatch({
            type: SET_ERROR_MESSAGE,
            payload: 'Something went wrong please create again later!'
          })
        })
      }
    })
  }
}

export function update_color(id: any, color: ColorsState, history: any): ThunkAction<void, {}, {}, AnyAction> {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch({type: UPDATE_COLOR_REQUEST});

    colors.update_color(id, color).then((color) => {
      dispatch({
        type: UPDATE_COLOR_SUCCESS,
        payload: color
      })
      history.push('/colors');
    }).catch(({response}) => {
      if (response.status === 422) {
        batch(() => {
          dispatch({type: UPDATE_COLOR_FAILURE})
          dispatch({
            type: SET_ERROR_MESSAGE,
            payload: response.data.errors[0].msg
          })
        })
      } else {
        batch(() => {
          dispatch({type: UPDATE_COLOR_FAILURE})
          dispatch({
            type: SET_ERROR_MESSAGE,
            payload: 'Something went wrong please try again later!'
          })
        })
      }
    })
  }
}

export function delete_color(id: string): ThunkAction<void, {}, {}, AnyAction> {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch({type: DELETE_COLOR_REQUEST})

    colors.delete_color(id).then((id) => {
      dispatch({
        type: DELETE_COLOR_SUCCESS,
        payload: id
      })
      message.success('Delete succesfully');
    }).catch((e) => {
      batch(() => {
        dispatch({type: DELETE_COLOR_FAILURE})
        dispatch({
          type: SET_ERROR_MESSAGE,
          payload: 'Something went wrong please create again later!'
        })
      })
    })
  }
}