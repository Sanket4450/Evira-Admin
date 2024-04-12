import { ADD_USER_LIST, USER_LOADING, DELETE_USER_MESSAGE, SET_TOTAL_RECODE, UPDATE_USER_MESSAGE } from "./actionType"

const initialState = {
    user_list: [],
    total_record: 0,
    loading: true,
    update_user: {
        loading: false,
        success: null,
        error: null
    },
    delete_user: {
        loading: false,
        success: null,
        error: null
    },
    add_user: {
        loading: false,
        success: null,
        error: null
    }
}

const user = (state = initialState, action) => {
    switch (action.type) {
        case ADD_USER_LIST:
            state = {
                ...state,
                user_list: action.payload,
                loading: false
            }
            break

        case USER_LOADING:
            state = {
                ...state,
                loading: action.payload,
            }
            break

        case UPDATE_USER_MESSAGE:
            state = {
                ...state,
                update_user: action.payload,
            }
            break

        case DELETE_USER_MESSAGE:
            state = {
                ...state,
                delete_user: action.payload,
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

export default user