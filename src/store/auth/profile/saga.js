import { takeEvery, fork, put, all, call } from 'redux-saga/effects'

import { GET_USER_INFO, EDIT_PROFILE } from './actionTypes'
import {
  setUserInfo,
  setUserRes,
  editProfileMessage,
} from './actions'
import { getProfileApi, updateProfileApi } from '../../../api'

function* getUserByID({ payload }) {
  yield put(
    setUserRes({
      loading: true,
      success: null,
      error: null,
    })
  )
  try {
    const response = yield call(getProfileApi, payload)
    yield put(setUserInfo(response?.results?.user))
    yield put(
      setUserRes({
        loading: false,
        success: response?.message,
        error: null,
      })
    )
  } catch (error) {
    yield put(
      setUserRes({
        loading: false,
        success: null,
        error: error.message,
      })
    )
  }
}

function* editProfile({ payload }) {
  yield put(
    editProfileMessage({
      loading: true,
      success: null,
      error: null,
    })
  )
  try {
    const response = yield call(updateProfileApi, payload)
    yield put(
      editProfileMessage({
        loading: false,
        success: response?.message,
        error: null,
      })
    )
  } catch (error) {
    yield put(
      editProfileMessage({
        loading: false,
        success: null,
        error: error.message,
      })
    )
  }
}
export function* watchProfile() {
  yield takeEvery(GET_USER_INFO, getUserByID)
  yield takeEvery(EDIT_PROFILE, editProfile)
}

function* ProfileSaga() {
  yield all([fork(watchProfile)])
}

export default ProfileSaga
