import { ADD_OFFERS_LIST, ADD_OFFERS_MESSAGE, OFFERS_LOADING, DELETE_OFFERS_MESSAGE, GET_OFFERS_LIST, SET_TOTAL_RECODE, UPDATE_OFFERS_MESSAGE } from "./actionType"

const initialState = {
    offers_list: [],
    total_record: 0,
    loading: true,
    update_offers: {
        loading: false,
        success: null,
        error: null
    },
    delete_offers: {
        loading: false,
        success: null,
        error: null
    },
    add_offers: {
        loading: false,
        success: null,
        error: null
    }
}

const offers = (state = initialState, action) => {
    switch (action.type) {
        case ADD_OFFERS_LIST:
            state = {
                ...state,
                offers_list: action.payload,
                loading: false
            }
            break

        case OFFERS_LOADING:
            state = {
                ...state,
                loading: action.payload,
            }
            break

        case UPDATE_OFFERS_MESSAGE:
            state = {
                ...state,
                update_offers: action.payload,
            }
            break

        case DELETE_OFFERS_MESSAGE:
            state = {
                ...state,
                delete_offers: action.payload,
            }
            break

        case ADD_OFFERS_MESSAGE:
            state = {
                ...state,
                add_offers: action.payload,
            }
            break

        case SET_TOTAL_RECODE:
            state = {
                ...state,
                total_record: action.payload,
            }
            break
    }
    return state
}

export default offers