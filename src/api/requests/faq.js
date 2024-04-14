import { getApi, postApi, putApi, deleteApi } from '../common'
import * as constants from '../constants'
import { getHeaders } from '../../helpers/auth'

export const getFaqsApi = async (pagination = { page: 1, limit: 8 }) => {
  const { page, limit } = pagination
  const response = await getApi(
    `${constants.GET_FAQS}?page=${page}&limit=${limit}`,
    { headers: getHeaders() }
  )
  return response.results
}

export const addFaqApi = async (data) => {
  const response = await postApi(constants.ADD_FAQ, data, {
    headers: getHeaders(),
  })
  return response.results
}

export const updateFaqApi = async (faqId, updateData) => {
  const response = await putApi(
    `${constants.UPDATE_FAQ}/${faqId}`,
    updateData,
    { headers: getHeaders() }
  )
  return response.results
}

export const deleteFaqApi = async (faqId) => {
  const response = await deleteApi(`${constants.DELETE_FAQ}/${faqId}`, {
    headers: getHeaders(),
  })
  return response.results
}
