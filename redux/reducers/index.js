import loadingReducer from './loadingReducer';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  loadingReducer: loadingReducer,
});

export default rootReducer;
