import {
  getShippingTypesApi,
  addShippingTypeApi,
  updateShippingTypeApi,
  deleteShippingTypeApi,
} from '../../../api'
import {
  ADD_SHIPPING,
  DELETE_SHIPPING,
  GET_SHIPPING_LIST,
  UPDATE_SHIPPING,
} from './actionType'
import { takeEvery, fork, all, call, put } from 'redux-saga/effects'
import {
  addShippingList,
  addShippingMessage,
  shippingLoading,
  deleteShippingMessage,
  updateShippingMessage,
} from './actions'

function* getShipping() {
  yield put(shippingLoading(true))
  try {
    const response = yield call(getShippingTypesApi)
    yield put(addShippingList(response?.results?.shippingTypes))
  } catch (error) {
    yield put(shippingLoading(false))
  }
}

function* addShipping({ payload }) {
  yield put(
    addShippingMessage({
      loading: true,
      success: null,
      error: null,
    })
  )
  try {
    const response = yield call(addShippingTypeApi, payload)
    yield put(
      addShippingMessage({
        loading: false,
        success: response?.results,
        error: null,
      })
    )
  } catch (error) {
    yield put(
      addShippingMessage({
        loading: false,
        success: null,
        error: error.message,
      })
    )
  }
}

function* updateShipping({ payload }) {
  yield put(
    updateShippingMessage({
      loading: true,
      success: null,
      error: null,
    })
  )
  try {
    const { id, ...updateData } = payload

    const response = yield call(updateShippingTypeApi, id, updateData)
    yield put(
      updateShippingMessage({
        loading: false,
        success: response?.results,
        error: null,
      })
    )
  } catch (error) {
    yield put(
      updateShippingMessage({
        loading: false,
        success: null,
        error: error.message,
      })
    )
  }
}

function* deleteShipping({ payload }) {
  yield put(
    deleteShippingMessage({
      loading: true,
      success: null,
      error: null,
    })
  )
  try {
    const { id } = payload

    const response = yield call(deleteShippingTypeApi, id)
    yield put(
      deleteShippingMessage({
        loading: false,
        success: response?.results,
        error: null,
      })
    )
  } catch (error) {
    yield put(
      deleteShippingMessage({
        loading: false,
        success: null,
        error: error.message,
      })
    )
  }
}

export function* watchShipping() {
  yield takeEvery(GET_SHIPPING_LIST, getShipping)
  yield takeEvery(UPDATE_SHIPPING, updateShipping)
  yield takeEvery(DELETE_SHIPPING, deleteShipping)
  yield takeEvery(ADD_SHIPPING, addShipping)
}

function* shippingSaga() {
  yield all([fork(watchShipping)])
}

export default shippingSaga
