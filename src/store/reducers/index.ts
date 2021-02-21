import { combineReducers } from 'redux'
import timingsReducer from './timingsReducer'

const rootReducer = combineReducers({
  timingsList: timingsReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
