import { postApi, putApi } from '../common'
import * as constants from '../constants'
import { getRefreshToken } from '../../helpers/auth'
import { getHeaders } from '../../helpers/auth'

export const loginAdminApi = async (data) => {
  const response = await postApi(constants.LOGIN, data)
  return response.results
}

export const forgotPasswordApi = async (data) => {
  const response = await postApi(constants.FORGOT_PASSWORD, data)
  return response.results
}

export const verifyResetOtpApi = async (data) => {
  const response = await postApi(constants.VERIFY_RESET_OTP, data)
  return response.results
}

export const resetPasswordApi = async (data) => {
  const response = await putApi(constants.RESET_PASSWORD, data)
  return response.results
}

export const refreshTokensApi = async () => {
  const data = { token: getRefreshToken() || '' }

  const response = await postApi(constants.REFRESH_TOKENS, data)
  return response.results
}

export const logoutAdminApi = async () => {
  const response = await postApi(
    constants.LOGOUT,
    {},
    { headers: getHeaders() }
  )
  return response.results
}
