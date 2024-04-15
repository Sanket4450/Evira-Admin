import { getApi, deleteApi } from '../common'
import * as constants from '../constants'
import { getHeaders } from '../../helpers/auth'

export const getMessagesApi = async (pagination = { page: 1, limit: 10 }) => {
  const { page, limit } = pagination
  const response = await getApi(
    `${constants.GET_MESSAGES}?page=${page}&limit=${limit}`,
    { headers: getHeaders() }
  )
  return response
}

export const deleteMessageApi = async (messageId) => {
  const response = await deleteApi(`${constants.DELETE_MESSAGE}/${messageId}`, {
    headers: getHeaders(),
  })
  return response
}
