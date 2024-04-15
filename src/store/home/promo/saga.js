import {
  getPromoCodesApi,
  addPromoCodeApi,
  updatePromoCodeApi,
  deletePromoCodeApi,
} from '../../../api'
import {
  ADD_PROMO,
  DELETE_PROMO,
  GET_PROMO_LIST,
  UPDATE_PROMO,
} from './actionType'
import { takeEvery, fork, all, call, put } from 'redux-saga/effects'
import {
  addPromoList,
  addPromoMessage,
  promoLoading,
  deletePromoMessage,
  setPromoRecode,
  updatePromoMessage,
} from './actions'

function* getPromo({ payload }) {
  yield put(promoLoading(true))
  try {
    const response = yield call(getPromoCodesApi, payload)
    yield put(addPromoList(response?.results?.promoCodes?.results))
    yield put(setPromoRecode(response?.results?.promoCodes?.count))
  } catch (error) {
    yield put(promoLoading(false))
  }
}

function* addPromo({ payload }) {
  yield put(
    addPromoMessage({
      loading: true,
      success: null,
      error: null,
    })
  )
  try {
    const response = yield call(addPromoCodeApi, payload)
    yield put(
      addPromoMessage({
        loading: false,
        success: response?.results,
        error: null,
      })
    )
  } catch (error) {
    yield put(
      addPromoMessage({
        loading: false,
        success: null,
        error: error.message,
      })
    )
  }
}

function* updatePromo({ payload }) {
  yield put(
    updatePromoMessage({
      loading: true,
      success: null,
      error: null,
    })
  )
  try {
    const { id, ...updateData } = payload

    const response = yield call(updatePromoCodeApi, id, updateData)
    yield put(
      updatePromoMessage({
        loading: false,
        success: response?.results,
        error: null,
      })
    )
  } catch (error) {
    yield put(
      updatePromoMessage({
        loading: false,
        success: null,
        error: error.message,
      })
    )
  }
}

function* deletePromo({ payload }) {
  yield put(
    deletePromoMessage({
      loading: true,
      success: null,
      error: null,
    })
  )
  try {
    const { id } = payload

    const response = yield call(deletePromoCodeApi, id)
    yield put(
      deletePromoMessage({
        loading: false,
        success: response?.results,
        error: null,
      })
    )
  } catch (error) {
    yield put(
      deletePromoMessage({
        loading: false,
        success: null,
        error: error.message,
      })
    )
  }
}

export function* watchPromo() {
  yield takeEvery(GET_PROMO_LIST, getPromo)
  yield takeEvery(UPDATE_PROMO, updatePromo)
  yield takeEvery(DELETE_PROMO, deletePromo)
  yield takeEvery(ADD_PROMO, addPromo)
}

function* promoSaga() {
  yield all([fork(watchPromo)])
}

export default promoSaga
