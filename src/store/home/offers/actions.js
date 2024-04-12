import { ADD_OFFERS, ADD_OFFERS_LIST, ADD_OFFERS_MESSAGE, OFFERS_LOADING, DELETE_OFFERS, DELETE_OFFERS_MESSAGE, GET_OFFERS_LIST, SET_TOTAL_RECODE, UPDATE_OFFERS, UPDATE_OFFERS_MESSAGE } from "./actionType"

export const getOffersList = productId => {
    return {
        type: GET_OFFERS_LIST,
        payload: productId,
    }
}

export const addOffersList = Data => {
    return {
        type: ADD_OFFERS_LIST,
        payload: Data,
    }
}

export const offersLoading = Data => {
    return {
        type: OFFERS_LOADING,
        payload: Data,
    }
}

export const updateOffers = Data => {
    return {
        type: UPDATE_OFFERS,
        payload: Data,
    }
}

export const addOffers = Data => {
    return {
        type: ADD_OFFERS,
        payload: Data,
    }
}

export const addOffersMessage = Data => {
    return {
        type: ADD_OFFERS_MESSAGE,
        payload: Data,
    }
}

export const updateOffersMessage = Data => {
    return {
        type: UPDATE_OFFERS_MESSAGE,
        payload: Data,
    }
}

export const deleteOffers = Data => {
    return {
        type: DELETE_OFFERS,
        payload: Data,
    }
}

export const deleteOffersMessage = Data => {
    return {
        type: DELETE_OFFERS_MESSAGE,
        payload: Data,
    }
}

export const setOffersRecode = Data => {
    return {
        type: SET_TOTAL_RECODE,
        payload: Data,
    }
}