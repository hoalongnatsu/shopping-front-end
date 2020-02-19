import { combineReducers } from 'redux';

/* Interface */
import { RootState } from 'interface';

import loading from './loading';
import errors from './errors';
import feedback from './feedback';
import colors from './colors';
import categories from './categories';
import brands from './brands';
import products from './products';
import { product_filters } from './filters';
import user from './user';
import trash from './trash';
import {
  top_sale_product,
  hot_products,
  new_products,
  viewed_products
} from './initialize';

export default combineReducers<RootState>({
  loading,
  errors,
  feedback,
  user,
  colors,
  categories,
  brands,
  products,
  product_filters,
  trash,

  // Initialize State
  top_sale_product,
  hot_products,
  new_products,
  viewed_products
})