import {
  // fork,
  // take,
  call,
  put,
  delay,
  takeLatest,
  takeEvery,
  select,
} from "redux-saga/effects";
import { getMapsSuccess, getMapsFailed } from "../actions/map";
import {
  addAnchorSuccess,
  addAnchorFailed,
  updateAnchorSuccess,
  updateAnchorFailed,
  deleteAnchorSuccess,
  deleteAnchorFailed,
  uploadCurrentMapSuccess,
  uploadCurrentMapFailed,
} from "../actions/edittingMap";
import {
  showLoading,
  hideLoading,
  setActiveMapAddingStep,
} from "../actions/ui";
import * as mapActions from "../constants/map";
import * as edittingMapActions from "../constants/edittingMap";
import * as mapService from "../services/map";
import * as anchorService from "../services/anchor";

function* getAllMapsSaga() {
  try {
    const resp = yield call(mapService.getAllMaps);
    yield put(getMapsSuccess(resp.data));
  } catch (error) {
    yield put(getMapsFailed(error));
  }
  yield delay(500);
}

function* uploadCurrentMapSaga({ payload }) {
  try {
    yield put(showLoading());
    const resp = yield call(
      mapService.uploadMap,
      payload.image.file,
      payload.name,
      payload.ratio,
      payload.width,
      payload.height
    );
    yield put(uploadCurrentMapSuccess(resp.data));
    yield put(setActiveMapAddingStep(1));
  } catch (error) {
    yield put(uploadCurrentMapFailed(error));
  }
  yield delay(250);
  yield put(hideLoading());
}

function* addAnchorSaga({ payload }) {
  try {
    yield put(showLoading());
    const resp = yield call(anchorService.addAnchor, {
      mapId: payload.mapId,
      deviceId: payload.deviceId,
      x: payload.x,
      y: payload.y,
    });
    yield put(addAnchorSuccess(resp.data));
  } catch (error) {
    yield put(addAnchorFailed(error));
  }
  yield delay(250);
  yield put(hideLoading());
}

function* deleteAnchorSaga({ payload }) {
  try {
    yield put(showLoading());
    yield call(anchorService.deleteAnchor, payload.mapId, payload.id);
    console.log(payload);
    yield put(deleteAnchorSuccess(payload.id));
  } catch (error) {
    yield put(deleteAnchorFailed(error));
  }
  yield delay(250);
  yield put(hideLoading());
}

function* rootSaga() {
  yield takeLatest(mapActions.GET_MAPS, getAllMapsSaga);
  yield takeLatest(edittingMapActions.UPLOAD_MAP, uploadCurrentMapSaga);
  yield takeLatest(edittingMapActions.ADD_ANCHOR, addAnchorSaga);
  yield takeEvery(edittingMapActions.DELETE_ANCHOR, deleteAnchorSaga);
}

export default rootSaga;
