import { getApi, postApi, putApi, deleteApi } from '../common'
import * as constants from '../constants'
import { getHeaders } from '../../helpers/auth'

export const getProductsApi = async (query = { page: 1, limit: 10 }) => {
  const { keyword, category, page, limit, min_price, max_price, rating } = query

  const response = await getApi(
    `${constants.GET_PRODUCTS}?page=${page}&limit=${limit}${
      keyword ? '&keyword=' + keyword : ''
    }${category ? '&category=' + category : ''}${
      min_price ? '&min_price=' + min_price : ''
    }${max_price ? '&max_price=' + max_price : ''}${
      rating ? '&rating=' + rating : ''
    }`,
    { headers: getHeaders() }
  )
  return response
}

export const getProductApi = async (productId) => {
  const response = await getApi(`${constants.GET_PRODUCT}/${productId}`, {
    headers: getHeaders(),
  })
  return response
}

export const addProductApi = async (data) => {
  const response = await postApi(constants.ADD_PRODUCT, data, {
    headers: getHeaders(),
  })
  return response
}

export const updateProductApi = async (productId, updateData) => {
  const response = await putApi(
    `${constants.UPDATE_PRODUCT}/${productId}`,
    updateData,
    { headers: getHeaders() }
  )
  return response
}

export const deleteProductApi = async (productId) => {
  const response = await deleteApi(`${constants.DELETE_PRODUCT}/${productId}`, {
    headers: getHeaders(),
  })
  return response
}

export const addProductVariantApi = async (productId, data) => {
  const response = await postApi(
    `${constants.ADD_PRODUCT_VARIANT}/${productId}`,
    data,
    { headers: getHeaders() }
  )
  return response
}

export const updateProductVariantApi = async (variantId, updateData) => {
  const response = await putApi(
    `${constants.UPDATE_PRODUCT_VARIANT}/${variantId}`,
    updateData,
    { headers: getHeaders() }
  )
  return response
}

export const deleteProductVariantApi = async (variantId) => {
  const response = await deleteApi(
    `${constants.DELETE_PRODUCT_VARIANT}/${variantId}`,
    { headers: getHeaders() }
  )
  return response
}
