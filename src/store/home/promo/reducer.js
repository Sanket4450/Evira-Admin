import { ADD_PROMO_LIST, ADD_PROMO_MESSAGE, PROMO_LOADING, DELETE_PROMO_MESSAGE, SET_TOTAL_RECODE, UPDATE_PROMO_MESSAGE } from "./actionType"

const initialState = {
    promo_list: [],
    total_record: 0,
    loading: true,
    update_promo: {
        loading: false,
        success: null,
        error: null
    },
    delete_promo: {
        loading: false,
        success: null,
        error: null
    },
    add_promo: {
        loading: false,
        success: null,
        error: null
    }
}

const promo = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PROMO_LIST:
            state = {
                ...state,
                promo_list: action.payload,
                loading: false
            }
            break

        case PROMO_LOADING:
            state = {
                ...state,
                loading: action.payload,
            }
            break

        case UPDATE_PROMO_MESSAGE:
            state = {
                ...state,
                update_promo: action.payload,
            }
            break

        case DELETE_PROMO_MESSAGE:
            state = {
                ...state,
                delete_promo: action.payload,
            }
            break

        case ADD_PROMO_MESSAGE:
            state = {
                ...state,
                add_promo: action.payload,
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

export default promo