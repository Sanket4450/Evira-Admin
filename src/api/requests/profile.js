import { getApi, putApi } from '../common'
import * as constants from '../constants'
import { headers } from '../../helpers/auth'

export const getProfileApi = async () => {
  const response = await getApi(constants.GET_PROFILE, { headers })
  return response.results
}

export const updateProfileApi = async (updateData) => {
  const response = await putApi(
    constants.UPDATE_PROFILE,
    updateData,
    { headers }
  )
  return response.results
}
