import { takeEvery, fork, put, all, call } from 'redux-saga/effects'

// Login Redux States
import { FORGET_PASSWORD, RESET_PASSWORD, VERIFY_OTP } from './actionTypes'
import {
  userForgetPasswordSuccess,
  userForgetPasswordError,
  userVerifyOtpSuccess,
} from './actions'
import {
  forgotPasswordApi,
  verifyResetOtpApi,
  resetPasswordApi,
} from '../../../api'

function* forgetUser({ payload: { user } }) {
  try {
    const response = yield call(forgotPasswordApi, {
      email: user.email,
      isAdmin: true,
    })
    if (response) {
      yield put(
        userForgetPasswordSuccess({
          ...response?.results,
          message: response?.message,
        })
      )
    }
  } catch (error) {
    yield put(userForgetPasswordError(error.message))
  }
}

function* verifyOtp({ payload: { user } }) {
  try {
    const response = yield call(verifyResetOtpApi, {
      otp: user.otp,
      token: user.token,
    })
    if (response) {
      yield put(userForgetPasswordError(null))
      yield put(userVerifyOtpSuccess({ verifyOtp: true }))
    }
  } catch (error) {
    yield put(userForgetPasswordError(error.message))
  }
}

function* resetPassword({ payload: { user, history } }) {
  try {
    const response = yield call(resetPasswordApi, {
      password: user.password,
      token: user.token,
    })
    if (response) {
      history('/login')
    }
  } catch (error) {
    yield put(userForgetPasswordError(error.message))
  }
}

export function* watchUserPasswordForget() {
  yield takeEvery(FORGET_PASSWORD, forgetUser)
  yield takeEvery(VERIFY_OTP, verifyOtp)
  yield takeEvery(RESET_PASSWORD, resetPassword)
}

function* forgetPasswordSaga() {
  yield all([fork(watchUserPasswordForget)])
}

export default forgetPasswordSaga
