import {
  FORGET_PASSWORD,
  FORGET_PASSWORD_SUCCESS,
  FORGET_PASSWORD_ERROR,
  VERIFY_OTP,
  RESET_PASSWORD,
  VERIFY_OTP_SUCCESS,
} from "./actionTypes"

export const userForgetPassword = (user, history) => {
  return {
    type: FORGET_PASSWORD,
    payload: { user, history },
  }
}

export const userVerifyOTP = (user, history) => {
  return {
    type: VERIFY_OTP,
    payload: { user, history },
  }
}

export const userResetPassword = (user, history) => {
  return {
    type: RESET_PASSWORD,
    payload: { user, history },
  }
}

export const userForgetPasswordSuccess = message => {
  return {
    type: FORGET_PASSWORD_SUCCESS,
    payload: message,
  }
}

export const userVerifyOtpSuccess = message => {
  return {
    type: VERIFY_OTP_SUCCESS,
    payload: message,
  }
}

export const userForgetPasswordError = message => {
  return {
    type: FORGET_PASSWORD_ERROR,
    payload: message,
  }
}
