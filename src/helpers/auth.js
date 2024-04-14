import { getItem } from './localStorage'

export const getAccessToken = () =>
  getItem('tokens') ? JSON.parse(getItem('tokens'))?.accessToken : null

export const getRefreshToken = () =>
  getItem('tokens') ? JSON.parse(getItem('tokens'))?.refreshToken : null

export const getHeaders = () => ({
  Authorization: `Bearer ${getAccessToken() || ''}`,
})
