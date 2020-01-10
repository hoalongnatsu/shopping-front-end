import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { batch } from 'react-redux';
// import { message } from 'antd';

import colors from 'services/colors';
import brands from 'services/brands';
import { SET_ERROR_MESSAGE } from './feedback';

export const GET_TRASH_COLORS_REQUEST = 'GET_TRASH_COLORS_REQUEST';
export const GET_TRASH_COLORS_SUCCESS = 'GET_TRASH_COLORS_SUCCESS';
export const GET_TRASH_COLORS_FAILURE = 'GET_TRASH_COLORS_FAILURE';
export const GET_TRASH_BRANDS_REQUEST = 'GET_TRASH_BRANDS_REQUEST';
export const GET_TRASH_BRANDS_SUCCESS = 'GET_TRASH_BRANDS_SUCCESS';
export const GET_TRASH_BRANDS_FAILURE = 'GET_TRASH_BRANDS_FAILURE';

export function get_trash_colors(): ThunkAction<void, {}, {}, AnyAction> {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch({type: GET_TRASH_COLORS_REQUEST})

    colors.get_trash_colors().then((colors) => {
      dispatch({
        type: GET_TRASH_COLORS_SUCCESS,
        payload: colors
      })
    }).catch((e) => {
      batch(() => {
        dispatch({type: GET_TRASH_COLORS_FAILURE})
        dispatch({
          type: SET_ERROR_MESSAGE,
          payload: 'Something went wrong please try again later!'
        })
      })
    })
  }
}

export function get_trash_brands(): ThunkAction<void, {}, {}, AnyAction> {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch({type: GET_TRASH_BRANDS_REQUEST})

    brands.get_trash_brands().then((brands) => {
      dispatch({
        type: GET_TRASH_BRANDS_SUCCESS,
        payload: brands
      })
    }).catch((e) => {
      batch(() => {
        dispatch({type: GET_TRASH_BRANDS_FAILURE})
        dispatch({
          type: SET_ERROR_MESSAGE,
          payload: 'Something went wrong please try again later!'
        })
      })
    })
  }
}
