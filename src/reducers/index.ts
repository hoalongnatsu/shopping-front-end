import { combineReducers } from 'redux';

/* Interface */
import { RootState } from 'interface';

import loading from './loading';
import errors from './errors';
import feedback from './feedback';
import colors from './colors';
import brands from './brands';
import products from './products';
import user from './user';
import trash from './trash';

export default combineReducers<RootState>({
  loading,
  errors,
  feedback,
  user,
  colors,
  brands,
  products,
  trash
})