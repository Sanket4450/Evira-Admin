import {
  ADD_FAQ,
  ADD_FAQ_LIST,
  ADD_FAQ_MESSAGE,
  FAQ_LOADING,
  DELETE_FAQ,
  DELETE_FAQ_MESSAGE,
  GET_FAQ_LIST,
  SET_TOTAL_RECODE,
  UPDATE_FAQ,
  UPDATE_FAQ_MESSAGE,
} from './actionType'

export const getFaqList = (pagination) => {
  return {
    type: GET_FAQ_LIST,
    payload: pagination,
  }
}

export const addFaqList = (Data) => {
  return {
    type: ADD_FAQ_LIST,
    payload: Data,
  }
}

export const faqLoading = (Data) => {
  return {
    type: FAQ_LOADING,
    payload: Data,
  }
}

export const updateFaq = (Data) => {
  return {
    type: UPDATE_FAQ,
    payload: Data,
  }
}

export const addFaq = (Data) => {
  return {
    type: ADD_FAQ,
    payload: Data,
  }
}

export const addFaqMessage = (Data) => {
  return {
    type: ADD_FAQ_MESSAGE,
    payload: Data,
  }
}

export const updateFaqMessage = (Data) => {
  return {
    type: UPDATE_FAQ_MESSAGE,
    payload: Data,
  }
}

export const deleteFaq = (Data) => {
  return {
    type: DELETE_FAQ,
    payload: Data,
  }
}

export const deleteFaqMessage = (Data) => {
  return {
    type: DELETE_FAQ_MESSAGE,
    payload: Data,
  }
}

export const setFaqRecode = (Data) => {
  return {
    type: SET_TOTAL_RECODE,
    payload: Data,
  }
}
