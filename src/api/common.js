import axios from 'axios'
import { API_BASE_URL } from './constants'

import { refreshTokensApi } from '../api'

import { setItem, removeItem } from '../helpers/localStorage'

const axiosApi = axios.create({
  baseURL: API_BASE_URL,
})

axiosApi.interceptors.response.use(
  (response) => {
    if (response.status === 401) {
      removeItem('tokens')
      window.location.replace('/login')
    } else if (response.status === 406) {
      refreshTokensApi().then((response) => {
          setItem('tokens', JSON.stringify(response?.results?.tokens))
          window.location.reload()
      })
    } else if (response.data?.type !== 'success') {
      throw new Error(response.data?.message)
    } else {
      return response
    }
  },
  (error) => {
    if (error.response) {
      return Promise.reject(new Error(error.response.data?.message))
    } else if (error.request) {
      // The request was made but no response was received
      window.location.replace('/login')
      console.log('No response received:', error.request)
    } else {
      // Something happened in setting up the request that triggered an error
      window.location.replace('/login')
      console.log('Request error:', error.message)
    }

    return Promise.reject(error)
  }
)

export async function getApi(url, config = {}) {
  return axiosApi
    .get(url, { ...config, validateStatus: (status) => status < 500 })
    .then((response) => response.data)
}

export async function postApi(url, data, config = {}) {
  return axiosApi
    .post(
      url,
      { ...data },
      { ...config, validateStatus: (status) => status < 500 }
    )
    .then((response) => response.data)
}

export async function putApi(url, data, config = {}) {
  return axiosApi
    .put(
      url,
      { ...data },
      { ...config, validateStatus: (status) => status < 500 }
    )
    .then((response) => response.data)
}

export async function patchApi(url, data, config = {}) {
  return axiosApi
    .patch(
      url,
      { ...data },
      { ...config, validateStatus: (status) => status < 500 }
    )
    .then((response) => response.data)
}

export async function deleteApi(url, config = {}) {
  return axiosApi
    .delete(url, { ...config, validateStatus: (status) => status < 500 })
    .then((response) => response.data)
}
