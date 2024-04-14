import {
  ADD_ORDERS_LIST,
  ORDERS_LOADING,
  GET_ORDERS_LIST,
  SET_TOTAL_RECODE,
  UPDATE_ORDERS,
  UPDATE_ORDERS_MESSAGE,
  GET_ORDERS_INFO,
  GET_ORDERS_INFO_RES,
} from './actionType'

export const getOrdersList = (pagination) => {
  return {
    type: GET_ORDERS_LIST,
    payload: pagination,
  }
}

export const addOrdersList = (Data) => {
  return {
    type: ADD_ORDERS_LIST,
    payload: Data,
  }
}

export const ordersLoading = (Data) => {
  return {
    type: ORDERS_LOADING,
    payload: Data,
  }
}

export const updateOrders = (Data) => {
  return {
    type: UPDATE_ORDERS,
    payload: Data,
  }
}

export const updateOrdersMessage = (Data) => {
  return {
    type: UPDATE_ORDERS_MESSAGE,
    payload: Data,
  }
}

export const setOrdersRecode = (Data) => {
  return {
    type: SET_TOTAL_RECODE,
    payload: Data,
  }
}

export const getOrdersInfo = (Data) => {
  return {
    type: GET_ORDERS_INFO,
    payload: Data,
  }
}

export const getOrdersInfoRes = (Data) => {
  return {
    type: GET_ORDERS_INFO_RES,
    payload: Data,
  }
}
