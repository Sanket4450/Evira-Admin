import { getApi, postApi, putApi, deleteApi } from '../common'
import * as constants from '../constants'
import { headers } from '../../helpers/auth'

export const getProductsApi = async (query = { page: 1, limit: 10 }) => {
  const { keyword, category, page, limit, min_price, max_price, rating } = query

  const response = await getApi(
    `${constants.GET_PRODUCTS}?page=${page}&limit=${limit}${keyword ? '&keyword=' + keyword : ''}${
      category ? '&category=' + category : ''
    }${min_price ? '&min_price=' + min_price : ''}${
      max_price ? '&max_price=' + max_price : ''
    }${rating ? '&rating=' + rating : ''}`,
    { headers }
  )
  return response.results
}

export const getProductApi = async (productId) => {
  const response = await getApi(`${constants.GET_PRODUCT}/${productId}`, {
    headers,
  })
  return response.results
}

export const addProductApi = async (data) => {
  const response = await postApi(constants.ADD_PRODUCT, data, { headers })
  return response.results
}

export const updateProductApi = async (productId, updateData) => {
  const response = await putApi(
    `${constants.UPDATE_PRODUCT}/${productId}`,
    updateData,
    { headers }
  )
  return response.results
}

export const deleteProductApi = async (productId) => {
  const response = await deleteApi(`${constants.DELETE_PRODUCT}/${productId}`, {
    headers,
  })
  return response.results
}

export const getProductVariantsApi = async (productId) => {
  const response = await getApi(
    `${constants.GET_PRODUCT_VARIANTS}/${productId}`,
    { headers }
  )
  return response.results
}

export const addProductVariantApi = async (productId, data) => {
  const response = await postApi(
    `${constants.ADD_PRODUCT_VARIANT}/${productId}`,
    data,
    { headers }
  )
  return response.results
}

export const updateProductVariantApi = async (variantId, updateData) => {
  const response = await putApi(
    `${constants.UPDATE_PRODUCT_VARIANT}/${variantId}`,
    updateData,
    { headers }
  )
  return response.results
}

export const deleteProductVariantApi = async (variantId) => {
  const response = await deleteApi(
    `${constants.DELETE_PRODUCT_VARIANT}/${variantId}`,
    { headers }
  )
  return response.results
}