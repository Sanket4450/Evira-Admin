import { call, put, takeEvery } from 'redux-saga/effects'

// Login Redux States
import { LOGIN_USER, LOGOUT_USER } from './actionTypes'
import { apiError, loginSuccess } from './actions'
import { loginAdminApi, logoutAdminApi } from '../../../api'
import { setItem, removeItem } from '../../../helpers/localStorage'

function* loginUser({ payload: { user, history } }) {
  try {
    const results = yield call(loginAdminApi, {
      email: user.email,
      password: user.password,
    })

    if (!results?.tokens) {
      window.location.reload()
    } else {
      setItem('tokens', JSON.stringify(results?.tokens))
      yield put(loginSuccess(results))
      history('/dashboard')
    }
  } catch (error) {
    yield put(apiError(error))
  }
}

function* logoutUser({ payload: { history } }) {
  try {
    yield call(logoutAdminApi)
    removeItem('tokens')
    history('/login')
  } catch (error) {
    yield put(apiError(error))
  }
}

function* authSaga() {
  yield takeEvery(LOGIN_USER, loginUser)
  yield takeEvery(LOGOUT_USER, logoutUser)
}

export default authSaga
