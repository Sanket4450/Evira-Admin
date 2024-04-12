import { ADD_USER_LIST, USER_LOADING, DELETE_USER, DELETE_USER_MESSAGE, GET_USER_LIST, SET_TOTAL_RECODE, UPDATE_USER, UPDATE_USER_MESSAGE } from "./actionType"

export const getUserList = pagination => {
    return {
        type: GET_USER_LIST,
        payload: pagination,
    }
}

export const addUserList = Data => {
    return {
        type: ADD_USER_LIST,
        payload: Data,
    }
}

export const categoriesLoading = Data => {
    return {
        type: USER_LOADING,
        payload: Data,
    }
}

export const updateUser = Data => {
    return {
        type: UPDATE_USER,
        payload: Data,
    }
}

export const updateUserMessage = Data => {
    return {
        type: UPDATE_USER_MESSAGE,
        payload: Data,
    }
}

export const deleteUser = Data => {
    return {
        type: DELETE_USER,
        payload: Data,
    }
}

export const deleteUserMessage = Data => {
    return {
        type: DELETE_USER_MESSAGE,
        payload: Data,
    }
}

export const setUserRecode = Data => {
    return {
        type: SET_TOTAL_RECODE,
        payload: Data,
    }
}