import {
  getOffersApi,
  addOfferApi,
  updateOfferApi,
  deleteOfferApi,
} from '../../../api'
import {
  ADD_OFFERS,
  DELETE_OFFERS,
  GET_OFFERS_LIST,
  UPDATE_OFFERS,
} from './actionType'
import { takeEvery, fork, all, call, put } from 'redux-saga/effects'
import {
  addOffersList,
  addOffersMessage,
  offersLoading,
  deleteOffersMessage,
  updateOffersMessage,
} from './actions'

function* getOffers({ payload }) {
  yield put(offersLoading(true))
  try {
    const response = yield call(getOffersApi, payload)
    yield put(addOffersList(response?.results?.offers))
  } catch (error) {
    yield put(offersLoading(false))
  }
}

function* addOffers({ payload }) {
  yield put(
    addOffersMessage({
      loading: true,
      success: null,
      error: null,
    })
  )
  try {
    const response = yield call(addOfferApi, payload)
    yield put(
      addOffersMessage({
        loading: false,
        success: response?.results,
        error: null,
      })
    )
  } catch (error) {
    yield put(
      addOffersMessage({
        loading: false,
        success: null,
        error: error.message,
      })
    )
  }
}

function* updateOffers({ payload }) {
  yield put(
    updateOffersMessage({
      loading: true,
      success: null,
      error: null,
    })
  )
  try {
    const { id, ...updateData } = payload

    const response = yield call(updateOfferApi, id, updateData)
    yield put(
      updateOffersMessage({
        loading: false,
        success: response?.results,
        error: null,
      })
    )
  } catch (error) {
    yield put(
      updateOffersMessage({
        loading: false,
        success: null,
        error: error.message,
      })
    )
  }
}

function* deleteOffers({ payload }) {
  yield put(
    deleteOffersMessage({
      loading: true,
      success: null,
      error: null,
    })
  )
  try {
    const response = yield call(deleteOfferApi, payload)
    yield put(
      deleteOffersMessage({
        loading: false,
        success: response?.results,
        error: null,
      })
    )
  } catch (error) {
    yield put(
      deleteOffersMessage({
        loading: false,
        success: null,
        error: error.message,
      })
    )
  }
}

export function* watchOffers() {
  yield takeEvery(GET_OFFERS_LIST, getOffers)
  yield takeEvery(UPDATE_OFFERS, updateOffers)
  yield takeEvery(DELETE_OFFERS, deleteOffers)
  yield takeEvery(ADD_OFFERS, addOffers)
}

function* offersSaga() {
  yield all([fork(watchOffers)])
}

export default offersSaga
