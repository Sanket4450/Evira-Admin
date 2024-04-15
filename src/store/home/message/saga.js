import {
  getMessagesApi,
  deleteMessageApi
} from '../../../api'
import {
  DELETE_MESSAGE,
  GET_MESSAGE_LIST,
} from './actionType'
import { takeEvery, fork, all, call, put } from 'redux-saga/effects'
import {
  addMessageList,
  messageLoading,
  deleteMessageMessage,
  setMessageRecode,
} from './actions'

function* getMessages({ payload }) {
  yield put(messageLoading(true))
  try {
    const response = yield call(getMessagesApi, payload)
    yield put(addMessageList(response?.results?.messages?.results))
    yield put(setMessageRecode(response?.results?.messages?.count))
  } catch (error) {
    yield put(messageLoading(false))
  }
}

function* deleteMessage({ payload }) {
  yield put(
    deleteMessageMessage({
      loading: true,
      success: null,
      error: null,
    })
  )
  try {
    const { id } = payload

    const response = yield call(deleteMessageApi, id)
    yield put(
      deleteMessageMessage({
        loading: false,
        success: response?.message,
        error: null,
      })
    )
  } catch (error) {
    yield put(
      deleteMessageMessage({
        loading: false,
        success: null,
        error: error.message,
      })
    )
  }
}

export function* watchMessage() {
  yield takeEvery(GET_MESSAGE_LIST, getMessages)
  yield takeEvery(DELETE_MESSAGE, deleteMessage)
}

function* messageSaga() {
  yield all([fork(watchMessage)])
}

export default messageSaga
