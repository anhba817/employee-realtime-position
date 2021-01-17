import { combineReducers } from 'redux';
import mapsReducer from './maps';
import uploadingMapReducer from './uploadingMap';
import commonReducer from './common';

const myReducer = combineReducers({
  maps: mapsReducer,
  uploadingMap: uploadingMapReducer,
  common: commonReducer,
});

export default myReducer;
