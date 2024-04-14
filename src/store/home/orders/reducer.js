import { ADD_ORDERS_LIST, ORDERS_LOADING, SET_TOTAL_RECODE, UPDATE_ORDERS_MESSAGE, GET_ORDERS_INFO_RES } from "./actionType"

const initialState = {
    orders_list: [],
    total_record: 0,
    loading: true,
    update_orders: {
        loading: false,
        success: null,
        error: null
    },
    order_info_res: {
        loading: false,
        success: null,
        error: null
    }
}

const orders = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ORDERS_LIST:
            state = {
                ...state,
                orders_list: action.payload,
                loading: false
            }
            break

        case ORDERS_LOADING:
            state = {
                ...state,
                loading: action.payload,
            }
            break

        case UPDATE_ORDERS_MESSAGE:
            state = {
                ...state,
                update_orders: action.payload,
            }
            break

        case SET_TOTAL_RECODE:
            state = {
                ...state,
                total_record: action.payload,
            }
            break
        case GET_ORDERS_INFO_RES:
            state = {
                ...state,
                order_info_res: action.payload,
            }
            break
    }
    return state
}

export default orders