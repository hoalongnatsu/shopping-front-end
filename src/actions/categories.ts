import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { batch } from 'react-redux';
import { message } from 'antd';

/* Interface */
import { CategorySate } from 'interface';

import categories from 'services/categories';
import { SET_ERROR_MESSAGE } from './feedback';

export const GET_CATEGORIES_REQUEST = 'GET_CATEGORIES_REQUEST';
export const GET_CATEGORIES_SUCCESS = 'GET_CATEGORIES_SUCCESS';
export const GET_CATEGORIES_FAILURE = 'GET_CATEGORIES_FAILURE';
export const CREATE_CATEGORY_REQUEST = 'CREATE_CATEGORY_REQUEST';
export const CREATE_CATEGORY_SUCCESS = 'CREATE_CATEGORY_SUCCESS';
export const CREATE_CATEGORY_FAILURE = 'CREATE_CATEGORY_FAILURE';
export const UPDATE_CATEGORY_REQUEST = 'UPDATE_CATEGORY_REQUEST';
export const UPDATE_CATEGORY_SUCCESS = 'UPDATE_CATEGORY_SUCCESS';
export const UPDATE_CATEGORY_FAILURE = 'UPDATE_CATEGORY_FAILURE';
export const DELETE_CATEGORY_REQUEST = 'DELETE_CATEGORY_REQUEST';
export const DELETE_CATEGORY_SUCCESS = 'DELETE_CATEGORY_SUCCESS';
export const DELETE_CATEGORY_FAILURE = 'DELETE_CATEGORY_FAILURE';

export function get_all_categories(): ThunkAction<void, {}, {}, AnyAction> {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch({type: GET_CATEGORIES_REQUEST})

    categories.get_all_categories().then((categories) => {
      dispatch({
        type: GET_CATEGORIES_SUCCESS,
        payload: categories
      })
    }).catch((e) => {
      batch(() => {
        dispatch({type: GET_CATEGORIES_FAILURE})
        dispatch({
          type: SET_ERROR_MESSAGE,
          payload: 'Something went wrong please try again later!'
        })
      })
    })
  }
}

export function create_category(category: CategorySate, history: any): ThunkAction<void, {}, {}, AnyAction> {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch({type: CREATE_CATEGORY_REQUEST});

    categories.create_category(category).then((category) => {
      dispatch({
        type: CREATE_CATEGORY_SUCCESS,
        payload: category
      })
      history.push('/admin/categories');
    }).catch(({response}) => {
      if (response.status === 422) {
        batch(() => {
          dispatch({type: CREATE_CATEGORY_FAILURE})
          dispatch({
            type: SET_ERROR_MESSAGE,
            payload: response.data.errors[0].msg
          })
        })
      } else {
        batch(() => {
          dispatch({type: CREATE_CATEGORY_FAILURE})
          dispatch({
            type: SET_ERROR_MESSAGE,
            payload: 'Something went wrong please create again later!'
          })
        })
      }
    })
  }
}

export function update_category(id: any, category: CategorySate, history: any): ThunkAction<void, {}, {}, AnyAction> {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch({type: UPDATE_CATEGORY_REQUEST});

    categories.update_category(id, category).then((category) => {
      dispatch({
        type: UPDATE_CATEGORY_SUCCESS,
        payload: category
      })
      history.push('/admin/categories');
    }).catch(({response}) => {
      if (response.status === 422) {
        batch(() => {
          dispatch({type: UPDATE_CATEGORY_FAILURE})
          dispatch({
            type: SET_ERROR_MESSAGE,
            payload: response.data.errors[0].msg
          })
        })
      } else {
        batch(() => {
          dispatch({type: UPDATE_CATEGORY_FAILURE})
          dispatch({
            type: SET_ERROR_MESSAGE,
            payload: 'Something went wrong please try again later!'
          })
        })
      }
    })
  }
}

export function delete_category(id: any): ThunkAction<void, {}, {}, AnyAction> {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch({type: DELETE_CATEGORY_REQUEST});

    categories.delete_category(id).then((id) => {
      dispatch({
        type: DELETE_CATEGORY_SUCCESS,
        payload: id
      })
      message.success('Delete succesfully');
    }).catch((e) => {
      batch(() => {
        dispatch({type: DELETE_CATEGORY_FAILURE})
        dispatch({
          type: SET_ERROR_MESSAGE,
          payload: 'Something went wrong please try again later!'
        })
      })
    })
  }
}