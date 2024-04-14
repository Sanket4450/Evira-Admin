import { ADD_CATEGORIES, ADD_CATEGORIES_LIST, ADD_CATEGORIES_MESSAGE, CATEGORIES_LOADING, DELETE_CATEGORIES, DELETE_CATEGORIES_MESSAGE, GET_CATEGORIES_LIST, SET_TOTAL_RECODE, UPDATE_CATEGORIES, UPDATE_CATEGORIES_MESSAGE } from "./actionType"

export const getCategoriesList = pagination => {
    return {
        type: GET_CATEGORIES_LIST,
        payload: pagination,
    }
}

export const addCategoriesList = Data => {
    return {
        type: ADD_CATEGORIES_LIST,
        payload: Data,
    }
}

export const categoriesLoading = Data => {
    return {
        type: CATEGORIES_LOADING,
        payload: Data,
    }
}

export const updateCategories = Data => {
    return {
        type: UPDATE_CATEGORIES,
        payload: Data,
    }
}

export const addCategories = Data => {
    return {
        type: ADD_CATEGORIES,
        payload: Data,
    }
}

export const addCategoriesMessage = Data => {
    return {
        type: ADD_CATEGORIES_MESSAGE,
        payload: Data,
    }
}

export const updateCategoriesMessage = Data => {
    return {
        type: UPDATE_CATEGORIES_MESSAGE,
        payload: Data,
    }
}

export const deleteCategories = Data => {
    return {
        type: DELETE_CATEGORIES,
        payload: Data,
    }
}

export const deleteCategoriesMessage = Data => {
    return {
        type: DELETE_CATEGORIES_MESSAGE,
        payload: Data,
    }
}

export const setCategoriesRecode = Data => {
    return {
        type: SET_TOTAL_RECODE,
        payload: Data,
    }
}