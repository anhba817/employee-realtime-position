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
import {
  getMapsSuccess,
  getMapsFailed,
  deleteMapSuccess,
  deleteMapFailed,
  addAnchorSuccess,
  addAnchorFailed,
  updateAnchorSuccess,
  updateAnchorFailed,
  deleteAnchorSuccess,
  deleteAnchorFailed,
  addMapSuccess,
  addMapFailed,
  updateMapSuccess,
  updateMapFailed,
} from "../actions/map";
import {
  getAndSetEditingMapSuccess,
  getAndSetEditingMapFailed,
  setEdittingMap,
  clearEdittingMap,
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

function* deleteMapSaga({ payload }) {
  try {
    yield call(mapService.deleteMap, payload.id);
    yield put(deleteMapSuccess(payload.id));
  } catch (error) {
    yield put(deleteMapFailed(error));
  }
  yield delay(250);
}

function* getAndSetEdittingMapSaga({ payload }) {
  try {
    yield put(showLoading());
    const resp = yield call(mapService.getMap, payload.id);
    yield put(getAndSetEditingMapSuccess(resp.data));
  } catch (error) {
    yield put(getAndSetEditingMapFailed(error));
  }
  yield delay(250);
  yield put(hideLoading());
}

function* addMapSaga({ payload }) {
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
    yield put(addMapSuccess(resp.data));
    yield put(setEdittingMap(resp.data));
    yield put(setActiveMapAddingStep(1));
  } catch (error) {
    yield put(addMapFailed(error));
  }
  yield delay(250);
  yield put(hideLoading());
}

function* updateMapSaga({ payload }) {
  try {
    yield put(showLoading());
    const resp = yield call(mapService.updateMap, payload.id, payload.data);
    yield put(updateMapSuccess(resp.data));
    yield put(setEdittingMap(resp.data));
    yield put(setActiveMapAddingStep(1));
  } catch (error) {
    yield put(updateMapFailed(error));
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

function* updateAnchorSaga({ payload }) {
  try {
    yield put(showLoading());
    const resp = yield call(anchorService.updateAnchor, payload);
    yield put(updateAnchorSuccess(resp.data));
  } catch (error) {
    yield put(updateAnchorFailed(error));
  }
  yield delay(250);
  yield put(hideLoading());
}

function* deleteAnchorSaga({ payload }) {
  try {
    yield put(showLoading());
    yield call(anchorService.deleteAnchor, payload.mapId, payload.id);
    yield put(deleteAnchorSuccess(payload.mapId, payload.id));
  } catch (error) {
    yield put(deleteAnchorFailed(error));
  }
  yield delay(250);
  yield put(hideLoading());
}

function* rootSaga() {
  yield takeLatest(mapActions.GET_MAPS, getAllMapsSaga);
  yield takeLatest(mapActions.DELETE_MAP, deleteMapSaga);
  yield takeLatest(
    edittingMapActions.GET_AND_SET_EDITTING_MAP,
    getAndSetEdittingMapSaga
  );
  yield takeLatest(mapActions.ADD_MAP, addMapSaga);
  yield takeLatest(mapActions.UPDATE_MAP, updateMapSaga);
  yield takeLatest(mapActions.ADD_ANCHOR, addAnchorSaga);
  yield takeLatest(mapActions.UPDATE_ANCHOR, updateAnchorSaga);
  yield takeEvery(mapActions.DELETE_ANCHOR, deleteAnchorSaga);
}

export default rootSaga;
