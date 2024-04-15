import { getApi, postApi, putApi, deleteApi } from '../common'
import * as constants from '../constants'
import { getHeaders } from '../../helpers/auth'

export const getOffersApi = async (productId) => {
  const response = await getApi(`${constants.GET_OFFER}/${productId}`, {
    headers: getHeaders(),
  })
  return response
}

export const addOfferApi = async (data) => {
  const response = await postApi(constants.ADD_OFFER, data, {
    headers: getHeaders(),
  })
  return response
}

export const updateOfferApi = async (offerId, updateData) => {
  const response = await putApi(
    `${constants.UPDATE_OFFER}/${offerId}`,
    updateData,
    { headers: getHeaders() }
  )
  return response
}

export const deleteOfferApi = async (offerId) => {
  const response = await deleteApi(`${constants.DELETE_OFFER}/${offerId}`, {
    headers: getHeaders(),
  })
  return response
}
