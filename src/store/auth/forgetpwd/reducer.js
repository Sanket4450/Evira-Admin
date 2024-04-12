import {
  FORGET_PASSWORD,
  FORGET_PASSWORD_SUCCESS,
  FORGET_PASSWORD_ERROR,
  VERIFY_OTP_SUCCESS,
} from "./actionTypes"

const initialState = {
  forgetSuccessMsg: null,
  forgetError: null,
  verifyOTPSuccessMsg: null,
}

const forgetPassword = (state = initialState, action) => {
  switch (action.type) {
    case FORGET_PASSWORD:
      state = {
        ...state,
        forgetSuccessMsg: null,
        forgetError: null,
      }
      break
    case FORGET_PASSWORD_SUCCESS:
      state = {
        ...state,
        forgetSuccessMsg: action.payload,
      }
      break
    case VERIFY_OTP_SUCCESS:
      state = {
        ...state,
        verifyOTPSuccessMsg: action.payload,
      }
      break
    case FORGET_PASSWORD_ERROR:
      state = { ...state, forgetError: action.payload }
      break
    default:
      state = { ...state }
      break
  }
  return state
}

export default forgetPassword
