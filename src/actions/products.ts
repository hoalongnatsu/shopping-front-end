import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { batch } from 'react-redux';
import { message } from 'antd';

/* Interface */
import { ProductState } from 'interface';

import products from 'services/products';
import { SET_ERROR_MESSAGE } from './feedback';

export const GET_PRODUCTS_REQUEST = 'GET_PRODUCTS_REQUEST';
export const GET_PRODUCTS_SUCCESS = 'GET_PRODUCTS_SUCCESS';
export const GET_PRODUCTS_FAILURE = 'GET_PRODUCTS_FAILURE';
export const GET_PRODUCTS_BY_FILTER_REQUEST = 'GET_PRODUCTS_BY_FILTER_REQUEST';
export const GET_PRODUCTS_BY_FILTER_SUCCESS = 'GET_PRODUCTS_BY_FILTER_SUCCESS';
export const GET_PRODUCTS_BY_FILTER_FAILURE = 'GET_PRODUCTS_BY_FILTER_FAILURE';
export const GET_TOP_SALE_PRODUCT_REQUEST = 'GET_TOP_SALE_PRODUCT_REQUEST';
export const GET_TOP_SALE_PRODUCT_SUCCESS = 'GET_TOP_SALE_PRODUCT_SUCCESS';
export const GET_TOP_SALE_PRODUCT_FAILURE = 'GET_TOP_SALE_PRODUCT_FAILURE';
export const TOGGLE_TOP_SALE_PRODUCT_REQUEST = 'TOGGLE_TOP_SALE_PRODUCT_REQUEST';
export const TOGGLE_TOP_SALE_PRODUCT_SUCCESS = 'TOGGLE_TOP_SALE_PRODUCT_SUCCESS';
export const TOGGLE_TOP_SALE_PRODUCT_FAILURE = 'TOGGLE_TOP_SALE_PRODUCT_FAILURE';
export const GET_HOT_PRODUCTS_REQUEST = 'GET_HOT_PRODUCTS_REQUEST';
export const GET_HOT_PRODUCTS_SUCCESS = 'GET_HOT_PRODUCTS_SUCCESS';
export const GET_HOT_PRODUCTS_FAILURE = 'GET_HOT_PRODUCTS_FAILURE';
export const TOGGLE_HOT_PRODUCT_REQUEST = 'TOGGLE_HOT_PRODUCT_REQUEST';
export const TOGGLE_HOT_PRODUCT_SUCCESS = 'TOGGLE_HOT_PRODUCT_SUCCESS';
export const TOGGLE_HOT_PRODUCT_FAILURE = 'TOGGLE_HOT_PRODUCT_FAILURE';
export const GET_NEW_PRODUCTS_REQUEST = 'GET_NEW_PRODUCTS_REQUEST';
export const GET_NEW_PRODUCTS_SUCCESS = 'GET_NEW_PRODUCTS_SUCCESS';
export const GET_NEW_PRODUCTS_FAILURE = 'GET_NEW_PRODUCTS_FAILURE';
export const GET_VIEWED_PRODUCTS_REQUEST = 'GET_VIEWED_PRODUCTS_REQUEST';
export const GET_VIEWED_PRODUCTS_SUCCESS = 'GET_VIEWED_PRODUCTS_SUCCESS';
export const GET_VIEWED_PRODUCTS_FAILURE = 'GET_VIEWED_PRODUCTS_FAILURE';
export const CREATE_PRODUCT_REQUEST = 'CREATE_PRODUCT_REQUEST';
export const CREATE_PRODUCT_SUCCESS = 'CREATE_PRODUCT_SUCCESS';
export const CREATE_PRODUCT_FAILURE = 'CREATE_PRODUCT_FAILURE';
export const UPDATE_PRODUCT_REQUEST = 'UPDATE_PRODUCT_REQUEST';
export const UPDATE_PRODUCT_SUCCESS = 'UPDATE_PRODUCT_SUCCESS';
export const UPDATE_PRODUCT_FAILURE = 'UPDATE_PRODUCT_FAILURE';
export const DELETE_PRODUCT_REQUEST = 'DELETE_PRODUCT_REQUEST';
export const DELETE_PRODUCT_SUCCESS = 'DELETE_PRODUCT_SUCCESS';
export const DELETE_PRODUCT_FAILURE = 'DELETE_PRODUCT_FAILURE';
export const RESTORE_PRODUCT_REQUEST = 'RESTORE_PRODUCT_REQUEST';
export const RESTORE_PRODUCT_SUCCESS = 'RESTORE_PRODUCT_SUCCESS';
export const RESTORE_PRODUCT_FAILURE = 'RESTORE_PRODUCT_FAILURE';
export const REMOVE_PRODUCT_REQUEST = 'REMOVE_PRODUCT_REQUEST';
export const REMOVE_PRODUCT_SUCCESS = 'REMOVE_PRODUCT_SUCCESS';
export const REMOVE_PRODUCT_FAILURE = 'REMOVE_PRODUCT_FAILURE';

export function get_all_products(): ThunkAction<void, {}, {}, AnyAction> {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch({type: GET_PRODUCTS_REQUEST})

    products.get_all_products().then((products) => {
      dispatch({
        type: GET_PRODUCTS_SUCCESS,
        payload: products
      })
    }).catch((e) => {
      batch(() => {
        dispatch({type: GET_PRODUCTS_FAILURE})
        dispatch({
          type: SET_ERROR_MESSAGE,
          payload: 'Something went wrong please try again later!'
        })
      })
    })
  }
}

export function get_products_by_filter(
  color_id: string,
  size: string,
  price_range: number[],
  category_id: string,
  brand_id: string,
  page: number
): ThunkAction<void, {}, {}, AnyAction> {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch({type: GET_PRODUCTS_BY_FILTER_REQUEST})

    products.get_product_by_filter(color_id, size, price_range, category_id, brand_id, page).then((products) => {
      dispatch({
        type: GET_PRODUCTS_BY_FILTER_SUCCESS,
        payload: products
      })
    }).catch((e) => {
      batch(() => {
        dispatch({type: GET_PRODUCTS_BY_FILTER_FAILURE})
        dispatch({
          type: SET_ERROR_MESSAGE,
          payload: 'Something went wrong please try again later!'
        })
      })
    })
  }
}

export function get_top_sale_product(): ThunkAction<void, {}, {}, AnyAction> {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch({type: GET_TOP_SALE_PRODUCT_REQUEST})

    products.get_top_sale_product().then((product) => {
      dispatch({
        type: GET_TOP_SALE_PRODUCT_SUCCESS,
        payload: product
      })
    }).catch((e) => {
      batch(() => {
        dispatch({type: GET_TOP_SALE_PRODUCT_FAILURE})
        dispatch({
          type: SET_ERROR_MESSAGE,
          payload: 'Something went wrong please try again later!'
        })
      })
    })
  }
}

export function toggle_top_sale_product(id: string, top_sale: boolean): ThunkAction<void, {}, {}, AnyAction> {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch({type: TOGGLE_TOP_SALE_PRODUCT_REQUEST})

    products.toggle_top_sale_product(id, top_sale).then((product) => {
      dispatch({
        type: TOGGLE_TOP_SALE_PRODUCT_SUCCESS,
        payload: product
      })
    }).catch((e) => {
      batch(() => {
        dispatch({type: TOGGLE_TOP_SALE_PRODUCT_FAILURE})
        dispatch({
          type: SET_ERROR_MESSAGE,
          payload: 'Something went wrong please try again later!'
        })
      })
    })
  }
}

export function get_hot_products(): ThunkAction<void, {}, {}, AnyAction> {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch({type: GET_HOT_PRODUCTS_REQUEST})

    products.get_hot_products().then((products) => {
      dispatch({
        type: GET_HOT_PRODUCTS_SUCCESS,
        payload: products
      })
    }).catch((e) => {
      batch(() => {
        dispatch({type: GET_HOT_PRODUCTS_FAILURE})
        dispatch({
          type: SET_ERROR_MESSAGE,
          payload: 'Something went wrong please try again later!'
        })
      })
    })
  }
}

export function toggle_hot_product(id: string, hot: boolean): ThunkAction<void, {}, {}, AnyAction> {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch({type: TOGGLE_HOT_PRODUCT_REQUEST})

    products.toggle_hot_product(id, hot).then((product) => {
      dispatch({
        type: TOGGLE_HOT_PRODUCT_SUCCESS,
        payload: product
      })
    }).catch((e) => {
      batch(() => {
        dispatch({type: TOGGLE_HOT_PRODUCT_FAILURE})
        dispatch({
          type: SET_ERROR_MESSAGE,
          payload: 'Something went wrong please try again later!'
        })
      })
    })
  }
}

export function get_new_products(): ThunkAction<void, {}, {}, AnyAction> {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch({type: GET_NEW_PRODUCTS_REQUEST})

    products.get_new_products().then((products) => {
      dispatch({
        type: GET_NEW_PRODUCTS_SUCCESS,
        payload: products
      })
    }).catch((e) => {
      batch(() => {
        dispatch({type: GET_NEW_PRODUCTS_FAILURE})
        dispatch({
          type: SET_ERROR_MESSAGE,
          payload: 'Something went wrong please try again later!'
        })
      })
    })
  }
}

export function get_viewed_products(): ThunkAction<void, {}, {}, AnyAction> {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch({type: GET_VIEWED_PRODUCTS_REQUEST})

    products.get_viewed_products().then((products) => {
      dispatch({
        type: GET_VIEWED_PRODUCTS_SUCCESS,
        payload: products
      })
    }).catch((e) => {
      batch(() => {
        dispatch({type: GET_VIEWED_PRODUCTS_FAILURE})
        dispatch({
          type: SET_ERROR_MESSAGE,
          payload: 'Something went wrong please try again later!'
        })
      })
    })
  }
}

export function create_product(product: ProductState, history: any): ThunkAction<void, {}, {}, AnyAction> {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch({type: CREATE_PRODUCT_REQUEST});

    products.create_product(product).then((product) => {
      dispatch({
        type: CREATE_PRODUCT_SUCCESS,
        payload: product
      })
      history.push('/admin/products');
    }).catch(({response}) => {
      if (response.status === 422) {
        batch(() => {
          dispatch({type: CREATE_PRODUCT_FAILURE})
          dispatch({
            type: SET_ERROR_MESSAGE,
            payload: response.data.errors[0].msg
          })
        })
      } else {
        batch(() => {
          dispatch({type: CREATE_PRODUCT_FAILURE})
          dispatch({
            type: SET_ERROR_MESSAGE,
            payload: 'Something went wrong please create again later!'
          })
        })
      }
    })
  }
}

export function update_product(id: any, product: ProductState, history: any): ThunkAction<void, {}, {}, AnyAction> {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch({type: UPDATE_PRODUCT_REQUEST});

    products.update_product(id, product).then((product) => {
      dispatch({
        type: UPDATE_PRODUCT_SUCCESS,
        payload: product
      })
      history.push('/admin/products');
    }).catch(({response}) => {
      if (response.status === 422) {
        batch(() => {
          dispatch({type: UPDATE_PRODUCT_FAILURE})
          dispatch({
            type: SET_ERROR_MESSAGE,
            payload: response.data.errors[0].msg
          })
        })
      } else {
        batch(() => {
          dispatch({type: UPDATE_PRODUCT_FAILURE})
          dispatch({
            type: SET_ERROR_MESSAGE,
            payload: 'Something went wrong please try again later!'
          })
        })
      }
    })
  }
}

export function delete_product(id: any): ThunkAction<void, {}, {}, AnyAction> {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch({type: DELETE_PRODUCT_REQUEST});

    products.delete_product(id).then((id) => {
      dispatch({
        type: DELETE_PRODUCT_SUCCESS,
        payload: id
      })
      message.success('Delete succesfully');
    }).catch((e) => {
      batch(() => {
        dispatch({type: DELETE_PRODUCT_FAILURE})
        dispatch({
          type: SET_ERROR_MESSAGE,
          payload: 'Something went wrong please try again later!'
        })
      })
    })
  }
}

export function restore_product(id: string): ThunkAction<void, {}, {}, AnyAction> {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch({type: RESTORE_PRODUCT_REQUEST});

    products.restore_product(id).then((product) => {
      dispatch({
        type: RESTORE_PRODUCT_SUCCESS,
        payload: product
      })
      message.success('Restore succesfully');
    }).catch((e) => {
      batch(() => {
        dispatch({type: RESTORE_PRODUCT_FAILURE})
        dispatch({
          type: SET_ERROR_MESSAGE,
          payload: 'Something went wrong please try again later!'
        })
      })
    })
  }
}

export function remove_product(id: string): ThunkAction<void, {}, {}, AnyAction> {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch({type: REMOVE_PRODUCT_REQUEST});

    products.remove_product(id).then((id) => {
      dispatch({
        type: REMOVE_PRODUCT_SUCCESS,
        payload: id
      })
      message.success('Remove succesfully');
    }).catch((e) => {
      batch(() => {
        dispatch({type: REMOVE_PRODUCT_FAILURE})
        dispatch({
          type: SET_ERROR_MESSAGE,
          payload: 'Something went wrong please try again later!'
        })
      })
    })
  }
}