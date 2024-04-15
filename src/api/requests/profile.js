import { getApi, putApi } from '../common'
import * as constants from '../constants'
import { getHeaders } from '../../helpers/auth'

export const getProfileApi = async () => {
  const response = await getApi(constants.GET_PROFILE, {
    headers: getHeaders(),
  })
  return response
}

export const updateProfileApi = async (updateData) => {
  const response = await putApi(constants.UPDATE_PROFILE, updateData, {
    headers: getHeaders(),
  })
  return response
}
