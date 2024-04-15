import { getOrdersApi, getOrderApi, updateOrderApi } from '../../../api'
import { GET_ORDERS_INFO, GET_ORDERS_LIST, UPDATE_ORDERS } from './actionType'
import { takeEvery, fork, all, call, put } from 'redux-saga/effects'
import {
  addOrdersList,
  ordersLoading,
  setOrdersRecode,
  updateOrdersMessage,
  getOrdersInfoRes,
} from './actions'

function* getOrders({ payload }) {
  yield put(ordersLoading(true))
  try {
    const { type, ...pagination } = payload

    const response = yield call(getOrdersApi, type || 'all', pagination)
    yield put(addOrdersList(response?.results?.orders?.results))
    yield put(setOrdersRecode(response?.results?.orders?.count))
  } catch (error) {
    yield put(ordersLoading(false))
  }
}

function* getOrderInfo({ payload }) {
  yield put(
    getOrdersInfoRes({
      loading: true,
      success: null,
      error: null,
    })
  )
  try {
    const response = yield call(getOrderApi, payload)
    yield put(
      getOrdersInfoRes({
        loading: false,
        success: response?.results,
        error: null,
      })
    )
  } catch (error) {
    yield put(
      getOrdersInfoRes({
        loading: false,
        success: null,
        error: error.message,
      })
    )
  }
}

function* updateOrders({ payload }) {
  yield put(
    updateOrdersMessage({
      loading: true,
      success: null,
      error: null,
    })
  )
  try {
    const { id, ...updateData } = payload

    const response = yield call(updateOrderApi, id, updateData)
    yield put(
      updateOrdersMessage({
        loading: false,
        success: response?.results,
        error: null,
      })
    )
  } catch (error) {
    yield put(
      updateOrdersMessage({
        loading: false,
        success: null,
        error: error.message,
      })
    )
  }
}

export function* watchOrders() {
  yield takeEvery(GET_ORDERS_LIST, getOrders)
  yield takeEvery(GET_ORDERS_INFO, getOrderInfo)
  yield takeEvery(UPDATE_ORDERS, updateOrders)
}

function* ordersSaga() {
  yield all([fork(watchOrders)])
}

export default ordersSaga
