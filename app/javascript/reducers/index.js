import { combineReducers } from 'redux';
import mapsReducer from './maps';
import edittingMapReducer from './edittingMap';
import uiReducer from './ui';

const myReducer = combineReducers({
  maps: mapsReducer,
  edittingMap: edittingMapReducer,
  ui: uiReducer,
});

export default myReducer;
