import { takeEvery, fork, put, all, call } from "redux-saga/effects"

// Login Redux States
import { FORGET_PASSWORD, RESET_PASSWORD, VERIFY_OTP } from "./actionTypes"
import { userForgetPasswordSuccess, userForgetPasswordError, userVerifyOtpSuccess } from "./actions"
import { forgotPasswordApi, verifyResetOtpApi, resetPasswordApi } from '../../../api'

//If user is send successfully send mail link then dispatch redux action's are directly from here.
function* forgetUser({ payload: { user } }) {
  try {
    const response = yield call(forgotPasswordApi, {
      email: user.email,
    })
    if (response) {
      yield put(
        userForgetPasswordSuccess(
          { ...response, message: "verification code sended to your mailbox, check there first" }
        )
      )
    }
  } catch (error) {
    yield put(userForgetPasswordError(error))
  }
}

function* verifyOtp({ payload: { user } }) {
  try {
    const response = yield call(verifyResetOtpApi, {
      otp: user.otp,
      token: user.token,
    })
    if (response) {
      yield put(
        userVerifyOtpSuccess(
          { verifyOtp: true }
        )
      )
    }
  } catch (error) {
    yield put(userForgetPasswordError(error))
  }
}

function* resetPassword({ payload: { user, history } }) {
  try {
    const response = yield call(resetPasswordApi, {
      password: user.password,
      token: user.token,
    })
    if (response) {
      history('/login');
    }
  } catch (error) {
    yield put(userForgetPasswordError(error))
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
