import { deleteApi } from '../common'
import * as constants from '../constants'
import { headers } from '../../helpers/auth'

export const getReviewsApi = async (productId, pagination = { page: 1, limit: 10 }) => {
  const { page, limit } = pagination

  const response = await getApi(
    `${constants.GET_REVIEWS}/${productId}?page=${page}&limit=${limit}`,
    { headers }
  )
  return response.results
}

export const deleteReviewApi = async (reviewId) => {
  const response = await deleteApi(
    `${constants.DELETE_REVIEW}/${reviewId}`,
    { headers }
  )
  return response.results
}
