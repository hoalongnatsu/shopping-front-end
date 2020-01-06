import { combineReducers } from 'redux';

/* Interface */
import { RootState } from 'interface';

import loading from './loading';
import errors from './errors';
import feedback from './feedback';
import colors from './colors';
import brands from './brands';
import user from './user';

export default combineReducers<RootState>({
  loading,
  errors,
  feedback,
  user,
  colors,
  brands,
})