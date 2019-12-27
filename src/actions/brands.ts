import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { batch } from 'react-redux';
import { message } from 'antd';

/* Interface */
// import { BrandsState } from 'interface';

import brands from 'services/brands';
import { SET_ERROR_MESSAGE } from './feedback';
import { BrandsState } from 'interface';

export const GET_BRANDS_REQUEST = 'GET_BRANDS_REQUEST';
export const GET_BRANDS_SUCCESS = 'GET_BRANDS_SUCCESS';
export const GET_BRANDS_FAILURE = 'GET_BRANDS_FAILURE';
export const CREATE_BRAND_REQUEST = 'CREATE_BRAND_REQUEST';
export const CREATE_BRAND_SUCCESS = 'CREATE_BRAND_SUCCESS';
export const CREATE_BRAND_FAILURE = 'CREATE_BRAND_FAILURE';
export const UPDATE_BRAND_REQUEST = 'UPDATE_BRAND_REQUEST';
export const UPDATE_BRAND_SUCCESS = 'UPDATE_BRAND_SUCCESS';
export const UPDATE_BRAND_FAILURE = 'UPDATE_BRAND_FAILURE';
export const DELETE_BRAND_REQUEST = 'DELETE_BRAND_REQUEST';
export const DELETE_BRAND_SUCCESS = 'DELETE_BRAND_SUCCESS';
export const DELETE_BRAND_FAILURE = 'DELETE_BRAND_FAILURE';

export function get_all_brands(): ThunkAction<void, {}, {}, AnyAction> {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch({type: GET_BRANDS_REQUEST})

    brands.get_all_brands().then((brands) => {
      dispatch({
        type: GET_BRANDS_SUCCESS,
        payload: brands
      })
    }).catch((e) => {
      batch(() => {
        dispatch({type: GET_BRANDS_FAILURE})
        dispatch({
          type: SET_ERROR_MESSAGE,
          payload: 'Something went wrong please try again later!'
        })
      })
    })
  }
}

export function create_brand(brand: BrandsState, history: any): ThunkAction<void, {}, {}, AnyAction> {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch({type: CREATE_BRAND_REQUEST})

    brands.create_brand(brand).then((brand) => {
      dispatch({
        type: CREATE_BRAND_SUCCESS,
        payload: brand
      })
      history.push('/brands');
    }).catch(({response}) => {
      if (response.status === 422) {
        batch(() => {
          dispatch({type: CREATE_BRAND_FAILURE})
          dispatch({
            type: SET_ERROR_MESSAGE,
            payload: response.data.errors[0].msg
          })
        })
      } else {
        batch(() => {
          dispatch({type: CREATE_BRAND_FAILURE})
          dispatch({
            type: SET_ERROR_MESSAGE,
            payload: 'Something went wrong please try again later!'
          })
        })
      }

    })
  }
}

export function update_brand(id: any, brand: BrandsState, history: any): ThunkAction<void, {}, {}, AnyAction> {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch({type: UPDATE_BRAND_REQUEST});

    brands.update_brand(id, brand).then((brand) => {
      dispatch({
        type: UPDATE_BRAND_SUCCESS,
        payload: brand
      })
      history.push('/brands');
    }).catch(({response}) => {
      if (response.status === 422) {
        batch(() => {
          dispatch({type: UPDATE_BRAND_FAILURE})
          dispatch({
            type: SET_ERROR_MESSAGE,
            payload: response.data.errors[0].msg
          })
        })
      } else {
        batch(() => {
          dispatch({type: UPDATE_BRAND_FAILURE})
          dispatch({
            type: SET_ERROR_MESSAGE,
            payload: 'Something went wrong please try again later!'
          })
        })
      }
    })
  }
}

export function delete_brand(id: string): ThunkAction<void, {}, {}, AnyAction> {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch({type: DELETE_BRAND_REQUEST})

    brands.delete_brand(id).then((id) => {
      dispatch({
        type: DELETE_BRAND_SUCCESS,
        payload: id
      })
      message.success('Delete succesfully');
    }).catch((e) => {
      batch(() => {
        dispatch({type: DELETE_BRAND_FAILURE})
        dispatch({
          type: SET_ERROR_MESSAGE,
          payload: 'Something went wrong please create again later!'
        })
      })
    })
  }
}
