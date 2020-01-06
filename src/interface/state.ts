export interface LoadingState {
  [GET_COLORS: string]: boolean,
  CREATE_COLOR: boolean,
  UPDATE_COLOR: boolean,
  DELETE_COLOR: boolean
}

export interface ErrorsState {
  [GET_COLORS: string]: boolean,
  CREATE_COLOR: boolean,
  UPDATE_COLOR: boolean,
  DELETE_COLOR: boolean
}

export interface FeedbackState {
  error: string
}

export interface ColorsState {
  _id?: string,
  name: string,
  code: string,
}

export interface BrandsState {
  _id?: string,
  name: string,
  logo?: string,
}

export interface UserState {
  [username: string]: string,
  email: string,
  jwt: string,
  admin: string
}

export interface RootState {
  loading: LoadingState,
  errors: ErrorsState,
  feedback: FeedbackState,
  user: UserState,
  colors: ColorsState[],
  brands: BrandsState[]
}