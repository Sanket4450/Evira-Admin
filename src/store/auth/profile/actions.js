import {
  GET_USER_INFO,
  SET_USER_INFO,
  SET_USER_RES,
  EDIT_PROFILE,
  EDIT_PROFILE_MESSAGE,
} from './actionTypes'

export const getUserInfo = () => {
  return {
    type: GET_USER_INFO,
  }
}

export const setUserInfo = (Data) => {
  return {
    type: SET_USER_INFO,
    payload: Data,
  }
}

export const setUserRes = (Data) => {
  return {
    type: SET_USER_RES,
    payload: Data,
  }
}

export const editProfile = (Data) => {
  return {
    type: EDIT_PROFILE,
    payload: Data,
  }
}

export const editProfileMessage = (Data) => {
  return {
    type: EDIT_PROFILE_MESSAGE,
    payload: Data,
  }
}
