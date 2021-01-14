import {
  // fork,
  // take,
  call,
  put,
  delay,
  takeLatest,
  takeEvery,
  // select,
} from 'redux-saga/effects';
import {
  getAllMaps,
  getMapsSuccess,
  getMapsFailed,
} from '../actions/map';
import * as mapActions from '../constants/map';

function* getAllMapsSaga() {
  // try {
  //   const user = yield call(authService.getCurrentUser);
  //   if (user) {
  //     yield call(UserServices.verifyToken);
  //     yield put(setCurrentUser(user));
  //   } else {
  //     yield put(removeCurrentUser());
  //   }
  // } catch (error) {
  //   console.log(error);
  //   yield put(removeCurrentUser());
  // }
  yield put(getMapsSuccess([]));
  yield delay(500);
}

function* rootSaga() {
  yield takeLatest(mapActions.GET_MAPS, getAllMapsSaga);
}

export default rootSaga;
