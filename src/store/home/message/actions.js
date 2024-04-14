import {
  ADD_MESSAGE_LIST,
  MESSAGE_LOADING,
  DELETE_MESSAGE,
  DELETE_MESSAGE_MESSAGE,
  GET_MESSAGE_LIST,
  SET_TOTAL_RECODE,
} from './actionType'

export const getMessageList = (pagination) => {
  return {
    type: GET_MESSAGE_LIST,
    payload: pagination,
  }
}

export const addMessageList = (Data) => {
  return {
    type: ADD_MESSAGE_LIST,
    payload: Data,
  }
}

export const messageLoading = (Data) => {
  return {
    type: MESSAGE_LOADING,
    payload: Data,
  }
}

export const deleteMessage = (Data) => {
  return {
    type: DELETE_MESSAGE,
    payload: Data,
  }
}

export const deleteMessageMessage = (Data) => {
  return {
    type: DELETE_MESSAGE_MESSAGE,
    payload: Data,
  }
}

export const setMessageRecode = (Data) => {
  return {
    type: SET_TOTAL_RECODE,
    payload: Data,
  }
}
