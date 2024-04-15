import { getApi } from '../common'
import * as constants from '../constants'
import { getHeaders } from '../../helpers/auth'

export const getDashboardApi = async () => {
  const response = await getApi(constants.GET_DASHBOARD, {
    headers: getHeaders(),
  })
  return response
}
