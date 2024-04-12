import { getApi } from '../common'
import * as constants from '../constants'

export const getDashboardApi = async () => {
  const response = await getApi(constants.GET_DASHBOARD)
  return response.results
}
