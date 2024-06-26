import { getApi, putApi, deleteApi } from '../common'
import * as constants from '../constants'
import { getHeaders } from '../../helpers/auth'

export const getUsersApi = async (pagination = { page: 1, limit: 8 }) => {
  const { page, limit } = pagination

  const response = await getApi(
    `${constants.GET_USERS}?page=${page}&limit=${limit}`,
    { headers: getHeaders() }
  )
  return response
}

export const getUserApi = async (userId) => {
  const response = await getApi(`${constants.GET_USER}/${userId}`, {
    headers: getHeaders(),
  })
  return response
}

export const updateUserApi = async (userId, updateData) => {
  const response = await putApi(
    `${constants.UDPATE_USER}/${userId}`,
    updateData,
    { headers: getHeaders() }
  )
  return response
}

export const deleteUserApi = async (userId) => {
  const response = await deleteApi(`${constants.DELETE_USER}/${userId}`, {
    headers: getHeaders(),
  })
  return response
}
