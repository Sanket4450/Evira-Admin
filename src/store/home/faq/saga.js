import {
  getFaqsApi,
  addFaqApi,
  updateFaqApi,
  deleteFaqApi
} from '../../../api'
import {
  ADD_FAQ,
  DELETE_FAQ,
  GET_FAQ_LIST,
  UPDATE_FAQ,
} from './actionType'
import { takeEvery, fork, all, call, put } from 'redux-saga/effects'
import {
  addFaqList,
  addFaqMessage,
  faqLoading,
  deleteFaqMessage,
  setFaqRecode,
  updateFaqMessage,
} from './actions'

function* getFaqs({ payload }) {
  yield put(faqLoading(true))
  try {
    const results = yield call(getFaqsApi, payload)
    yield put(addFaqList(results?.faqs?.results))
    yield put(setFaqRecode(results?.faqs?.count))
  } catch (error) {
    yield put(faqLoading(false))
  }
}

function* addFaq({ payload }) {
  yield put(
    addFaqMessage({
      loading: true,
      success: null,
      error: null,
    })
  )
  try {
    const results = yield call(addFaqApi, payload)
    yield put(
      addFaqMessage({
        loading: false,
        success: results,
        error: null,
      })
    )
  } catch (error) {
    yield put(
      addFaqMessage({
        loading: false,
        success: null,
        error: error.message,
      })
    )
  }
}

function* updateFaq({ payload }) {
  yield put(
    updateFaqMessage({
      loading: true,
      success: null,
      error: null,
    })
  )
  try {
    const { id, ...updateData } = payload

    const results = yield call(updateFaqApi, id, updateData)
    yield put(
      updateFaqMessage({
        loading: false,
        success: results,
        error: null,
      })
    )
  } catch (error) {
    yield put(
      updateFaqMessage({
        loading: false,
        success: null,
        error: error.message,
      })
    )
  }
}

function* deleteFaq({ payload }) {
  yield put(
    deleteFaqMessage({
      loading: true,
      success: null,
      error: null,
    })
  )
  try {
    const { id } = payload

    const results = yield call(deleteFaqApi, id)
    yield put(
      deleteFaqMessage({
        loading: false,
        success: results,
        error: null,
      })
    )
  } catch (error) {
    yield put(
      deleteFaqMessage({
        loading: false,
        success: null,
        error: error.message,
      })
    )
  }
}

export function* watchfaq() {
  yield takeEvery(GET_FAQ_LIST, getFaqs)
  yield takeEvery(ADD_FAQ, addFaq)
  yield takeEvery(UPDATE_FAQ, updateFaq)
  yield takeEvery(DELETE_FAQ, deleteFaq)
}

function* faqSaga() {
  yield all([fork(watchfaq)])
}

export default faqSaga
