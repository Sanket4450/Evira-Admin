import { ADD_PROMO, ADD_PROMO_LIST, ADD_PROMO_MESSAGE, PROMO_LOADING, DELETE_PROMO, DELETE_PROMO_MESSAGE, GET_PROMO_LIST, SET_TOTAL_RECODE, UPDATE_PROMO, UPDATE_PROMO_MESSAGE } from "./actionType"

export const getPromoList = pagination => {
    return {
        type: GET_PROMO_LIST,
        payload: pagination,
    }
}

export const addPromoList = Data => {
    return {
        type: ADD_PROMO_LIST,
        payload: Data,
    }
}

export const promoLoading = Data => {
    return {
        type: PROMO_LOADING,
        payload: Data,
    }
}

export const updatePromo = Data => {
    return {
        type: UPDATE_PROMO,
        payload: Data,
    }
}

export const addPromo = Data => {
    return {
        type: ADD_PROMO,
        payload: Data,
    }
}

export const addPromoMessage = Data => {
    return {
        type: ADD_PROMO_MESSAGE,
        payload: Data,
    }
}

export const updatePromoMessage = Data => {
    return {
        type: UPDATE_PROMO_MESSAGE,
        payload: Data,
    }
}

export const deletePromo = Data => {
    return {
        type: DELETE_PROMO,
        payload: Data,
    }
}

export const deletePromoMessage = Data => {
    return {
        type: DELETE_PROMO_MESSAGE,
        payload: Data,
    }
}

export const setPromoRecode = Data => {
    return {
        type: SET_TOTAL_RECODE,
        payload: Data,
    }
}