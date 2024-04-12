import { takeEvery, fork, put, all, call } from "redux-saga/effects"

// Login Redux States
import { EDIT_PROFILE } from "./actionTypes"
import { profileSuccess, profileError } from "./actions"
import { updateProfileApi } from '../../../api'

function* editProfile({ payload: { user } }) {
  try {
    const results = yield call(
        updateProfileApi,
        user
      )
      yield put(profileSuccess(results))
  } catch (error) {
    yield put(profileError(error))
  }
}
export function* watchProfile() {
  yield takeEvery(EDIT_PROFILE, editProfile)
}

function* ProfileSaga() {
  yield all([fork(watchProfile)])
}

export default ProfileSaga
