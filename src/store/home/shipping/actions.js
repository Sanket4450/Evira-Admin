import { ADD_SHIPPING, ADD_SHIPPING_LIST, ADD_SHIPPING_MESSAGE, SHIPPING_LOADING, DELETE_SHIPPING, DELETE_SHIPPING_MESSAGE, GET_SHIPPING_LIST, UPDATE_SHIPPING, UPDATE_SHIPPING_MESSAGE } from "./actionType"

export const getShippingList = pagination => {
    return {
        type: GET_SHIPPING_LIST,
        payload: pagination,
    }
}

export const addShippingList = Data => {
    return {
        type: ADD_SHIPPING_LIST,
        payload: Data,
    }
}

export const shippingLoading = Data => {
    return {
        type: SHIPPING_LOADING,
        payload: Data,
    }
}

export const updateShipping = Data => {
    return {
        type: UPDATE_SHIPPING,
        payload: Data,
    }
}

export const addShipping = Data => {
    return {
        type: ADD_SHIPPING,
        payload: Data,
    }
}

export const addShippingMessage = Data => {
    return {
        type: ADD_SHIPPING_MESSAGE,
        payload: Data,
    }
}

export const updateShippingMessage = Data => {
    return {
        type: UPDATE_SHIPPING_MESSAGE,
        payload: Data,
    }
}

export const deleteShipping = Data => {
    return {
        type: DELETE_SHIPPING,
        payload: Data,
    }
}

export const deleteShippingMessage = Data => {
    return {
        type: DELETE_SHIPPING_MESSAGE,
        payload: Data,
    }
}
