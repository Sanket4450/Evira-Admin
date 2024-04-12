import { getApi, postApi, putApi, deleteApi } from '../common'
import * as constants from '../constants'
import { headers } from '../../helpers/auth'

export const getOffersApi = async (productId) => {
  const response = await getApi(`${constants.GET_OFFER}/${productId}`, {
    headers,
  })
  return response.results
}

export const addOfferApi = async (data) => {
  const response = await postApi(constants.ADD_OFFER, data, { headers })
  return response.results
}

export const updateOfferApi = async (offerId, updateData) => {
  const response = await putApi(
    `${constants.UPDATE_OFFER}/${offerId}`,
    updateData,
    { headers }
  )
  return response.results
}

export const deleteOfferApi = async (offerId) => {
  const response = await deleteApi(`${constants.DELETE_OFFER}/${offerId}`, {
    headers,
  })
  return response.results
}