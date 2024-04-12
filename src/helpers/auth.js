import { getItem } from './localStorage'

export const accessToken = getItem('tokens')
  ? JSON.parse(getItem('tokens')).accessToken
  : null

export const refreshToken = getItem('tokens')
  ? JSON.parse(getItem('tokens')).refreshToken
  : null

export const getLoggedInUser = getItem('user') ? JSON.parse(user) : null

export const isUserAuthenticated = getLoggedInUser !== null

export const headers = { Authorization: `Bearer ${accessToken}` }
