import { getUsersApi, updateUserApi, deleteUserApi } from '../../../api'
import { DELETE_USER, GET_USER_LIST, UPDATE_USER } from './actionType'
import { takeEvery, fork, all, call, put } from 'redux-saga/effects'
import {
  addUserList,
  categoriesLoading,
  deleteUserMessage,
  setUserRecode,
  updateUserMessage,
} from './actions'

function* getUser({ payload }) {
  yield put(categoriesLoading(true))
  try {
    const response = yield call(getUsersApi, payload)
    yield put(addUserList(response?.results?.users?.results))
    yield put(setUserRecode(response?.results?.users?.count))
  } catch (error) {
    yield put(categoriesLoading(false))
  }
}

function* updateUser({ payload }) {
  yield put(
    updateUserMessage({
      loading: true,
      success: null,
      error: null,
    })
  )
  try {
    const { id, ...updateData } = payload

    const response = yield call(updateUserApi, id, updateData)
    yield put(
      updateUserMessage({
        loading: false,
        success: response?.results,
        error: null,
      })
    )
  } catch (error) {
    yield put(
      updateUserMessage({
        loading: false,
        success: null,
        error: error.message,
      })
    )
  }
}

function* deleteUser({ payload }) {
  yield put(
    deleteUserMessage({
      loading: true,
      success: null,
      error: null,
    })
  )
  try {
    const { id } = payload

    const response = yield call(deleteUserApi, id)
    yield put(
      deleteUserMessage({
        loading: false,
        success: response?.results,
        error: null,
      })
    )
  } catch (error) {
    yield put(
      deleteUserMessage({
        loading: false,
        success: null,
        error: error.message,
      })
    )
  }
}

export function* watchUser() {
  yield takeEvery(GET_USER_LIST, getUser)
  yield takeEvery(UPDATE_USER, updateUser)
  yield takeEvery(DELETE_USER, deleteUser)
}

function* userSaga() {
  yield all([fork(watchUser)])
}

export default userSaga
