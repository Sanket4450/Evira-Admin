import axios from 'axios'
import { call, put, takeEvery } from 'redux-saga/effects'

// Login Redux States
import { LOGIN_USER, LOGOUT_USER } from './actionTypes'
import { apiError, loginSuccess } from './actions'
import { loginAdminApi, logoutAdminApi } from '../../../api'

function* loginUser({ payload: { user, history } }) {
  try {
    const results = yield call(loginAdminApi, {
      email: user.email,
      password: user.password,
    })
    const accessToken = results?.tokens?.accessToken

    if (accessToken) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
    }
    localStorage.setItem('tokens', JSON.stringify(results?.tokens))

    yield put(loginSuccess(results))
    history('/dashboard')
  } catch (error) {
    yield put(apiError(error))
  }
}

function* logoutUser({ payload: { history } }) {
  try {
    localStorage.removeItem('tokens')
    history('/login')
    yield call(logoutAdminApi)
  } catch (error) {
    yield put(apiError(error))
  }
}

function* authSaga() {
  yield takeEvery(LOGIN_USER, loginUser)
  yield takeEvery(LOGOUT_USER, logoutUser)
}

export default authSaga
