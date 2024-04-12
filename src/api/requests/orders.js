import { getApi, putApi } from '../common'
import * as constants from '../constants'
import { headers } from '../../helpers/auth'

export const getOrdersApi = async (
  type,
  pagination = { page: 1, limit: 10 }
) => {
  const { page, limit } = pagination

  const response = await getApi(
    `${constants.GET_ORDERS}?type=${type}&page=${page}&limit=${limit}`,
    { headers }
  )
  return response.results
}

export const getOrderApi = async (orderId) => {
  const response = await getApi(`${constants.GET_ORDER}/${orderId}`, {
    headers,
  })
  return response.results
}

export const updateOrderApi = async (orderId, updateData) => {
  const response = await putApi(
    `${constants.UPDATE_ORDER}/${orderId}`,
    updateData,
    { headers }
  )
  return response.results
}
