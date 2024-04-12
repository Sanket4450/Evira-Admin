import { getApi, postApi, putApi, deleteApi } from '../common'
import * as constants from '../constants'
import { headers } from '../../helpers/auth'

export const getShippingTypesApi = async () => {
  const response = await getApi(
    constants.GET_SHIPPING_TYPES,
    { headers }
  )
  return response.results
}

export const addShippingTypeApi = async (data) => {
  const response = await postApi(constants.ADD_SHIPPING_TYPE, data, { headers })
  return response.results
}

export const updateShippingTypeApi = async (shippingId, updateData) => {
  const response = await putApi(
    `${constants.UPDATE_SHIPPING_TYPE}/${shippingId}`,
    updateData,
    { headers }
  )
  return response.results
}

export const deleteShippingTypeApi = async (shippingId) => {
  const response = await deleteApi(
    `${constants.DELETE_SHIPPING_TYPE}/${shippingId}`,
    { headers }
  )
  return response.results
}
