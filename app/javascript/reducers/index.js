import { combineReducers } from 'redux';
import mapsReducer from './maps';

const myReducer = combineReducers({
  maps: mapsReducer,
});

export default myReducer;
