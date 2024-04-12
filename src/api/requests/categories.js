import { getApi, postApi, putApi, deleteApi } from '../common'
import * as constants from '../constants'
import { headers } from '../../helpers/auth'

export const getCategoriesApi = async (pagination = { page: 1, limit: 8 }) => {
  const { page, limit } = pagination
  const response = await getApi(
    `${constants.GET_CATEGORIES}?page=${page}&limit=${limit}`,
    { headers }
  )
  return response.results
}

export const addCategoryApi = async (data) => {
  const response = await postApi(constants.ADD_CATEGORY, data, { headers })
  return response.results
}

export const updateCategoryApi = async (categoryId, updateData) => {
  const response = await putApi(
    `${constants.UPDATE_CATEGORY}/${categoryId}`,
    updateData,
    { headers }
  )
  return response.results
}

export const deleteCategoryApi = async (categoryId) => {
  const response = await deleteApi(
    `${constants.DELETE_CATEGORY}/${categoryId}`,
    { headers }
  )
  return response.results
}
