import { combineReducers } from 'redux';
import mapsReducer from './maps';
import uploadingMapReducer from './uploadingMap';

const myReducer = combineReducers({
  maps: mapsReducer,
  uploadingMap: uploadingMapReducer,
});

export default myReducer;
