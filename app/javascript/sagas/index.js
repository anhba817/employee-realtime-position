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
import {
  setUploadingMapNameSuccess,
  setUploadingMapRatioSuccess,
  updateNewAnchorSuccess,
} from '../actions/uploadingMap';

import * as mapActions from '../constants/map';
import * as uploadingMapActions from '../constants/uploadingMap';

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

function* setUploadingMapNameSaga({ payload }) {
  yield put(setUploadingMapNameSuccess(payload.name));
  yield delay(500);
}

function* setUploadingMapRatioSaga({ payload }) {
  yield put(setUploadingMapRatioSuccess(payload.ratio));
  yield delay(500);
}

function* updateNewAnchorSaga({ payload }) {
  yield put(updateNewAnchorSuccess(payload));
  yield delay(500);
}

function* rootSaga() {
  yield takeLatest(mapActions.GET_MAPS, getAllMapsSaga);
  yield takeLatest(uploadingMapActions.SET_UPLOADING_MAP_NAME, setUploadingMapNameSaga);
  yield takeLatest(uploadingMapActions.SET_UPLOADING_MAP_RATIO, setUploadingMapRatioSaga);
  yield takeLatest(uploadingMapActions.UPDATE_NEW_ANCHOR, updateNewAnchorSaga);
}

export default rootSaga;
