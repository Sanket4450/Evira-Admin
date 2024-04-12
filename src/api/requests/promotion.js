import { getApi, postApi, putApi, deleteApi } from '../common'
import * as constants from '../constants'
import { headers } from '../../helpers/auth'

export const getPromoCodesApi = async (pagination = { page: 1, limit: 10 }) => {
  const { page, limit } = pagination

  const response = await getApi(
    `${constants.GET_PROMO_CODES}?page=${page}&limit=${limit}`,
    { headers }
  )
  return response.results
}

export const addPromoCodeApi = async (data) => {
  const response = await postApi(constants.ADD_PROMO_CODE, data, { headers })
  return response.results
}

export const updatePromoCodeApi = async (promoId, updateData) => {
  const response = await putApi(
    `${constants.UPDATE_PROMO_CODE}/${promoId}`,
    updateData,
    { headers }
  )
  return response.results
}

export const deletePromoCodeApi = async (promoId) => {
  const response = await deleteApi(
    `${constants.DELETE_PROMO_CODE}/${promoId}`,
    { headers }
  )
  return response.results
}
