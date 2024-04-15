import { call, put, takeEvery } from 'redux-saga/effects'

// Login Redux States
import { LOGIN_USER, LOGOUT_USER } from './actionTypes'
import { apiError, loginSuccess } from './actions'
import { loginAdminApi, logoutAdminApi } from '../../../api'
import { setItem, removeItem } from '../../../helpers/localStorage'

function* loginUser({ payload: { user, history } }) {
  try {
    const response = yield call(loginAdminApi, {
      email: user.email,
      password: user.password,
      isAdmin: true,
    })

    if (!response?.results?.tokens) {
      window.location.reload()
    } else {
      setItem('tokens', JSON.stringify(response.results.tokens))
      yield put(loginSuccess(response.results))
      history('/dashboard')
    }
  } catch (error) {
    yield put(apiError(error.message))
  }
}

function* logoutUser({ payload: { history } }) {
  try {
    yield call(logoutAdminApi)
    removeItem('tokens')
    history('/login')
  } catch (error) {
    yield put(apiError(error.message))
  }
}

function* authSaga() {
  yield takeEvery(LOGIN_USER, loginUser)
  yield takeEvery(LOGOUT_USER, logoutUser)
}

export default authSaga
