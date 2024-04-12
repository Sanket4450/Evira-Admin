import { ADD_PRODUCT, ADD_PRODUCT_LIST, ADD_PRODUCT_MESSAGE, PRODUCT_LOADING, DELETE_PRODUCT, DELETE_PRODUCT_MESSAGE, GET_PRODUCT_LIST, SET_TOTAL_RECODE, UPDATE_PRODUCT, UPDATE_PRODUCT_MESSAGE, GET_PRODUCT_INFO_BY_ID, SET_PRODUCT_INFO_BY_ID, SET_PRODUCT_RES_BY_ID, GET_ALL_CATEGORIES_LIST, SET_ALL_CATEGORIES_LIST, GET_PRODUCT_REVIEWS, SET_PRODUCT_REVIEWS, SET_PRODUCT_REVIEWS_RES, DELETE_REVIEWS_RES, DELETE_REVIEWS, ADD_PRODUCT_VARIANTS, ADD_PRODUCT_VARIANTS_RES, UPDATE_PRODUCT_VARIANTS_RES, UPDATE_PRODUCT_VARIANTS, DELETE_PRODUCT_VARIANTS, DELETE_PRODUCT_VARIANTS_RES } from "./actionType"

export const getProductList = pagination => {
    return {
        type: GET_PRODUCT_LIST,
        payload: pagination,
    }
}

export const addProductList = Data => {
    return {
        type: ADD_PRODUCT_LIST,
        payload: Data,
    }
}

export const productLoading = Data => {
    return {
        type: PRODUCT_LOADING,
        payload: Data,
    }
}

export const updateProduct = Data => {
    return {
        type: UPDATE_PRODUCT,
        payload: Data,
    }
}

export const addProduct = Data => {
    return {
        type: ADD_PRODUCT,
        payload: Data,
    }
}

export const addProductMessage = Data => {
    return {
        type: ADD_PRODUCT_MESSAGE,
        payload: Data,
    }
}

export const updateProductMessage = Data => {
    return {
        type: UPDATE_PRODUCT_MESSAGE,
        payload: Data,
    }
}

export const deleteProduct = Data => {
    return {
        type: DELETE_PRODUCT,
        payload: Data,
    }
}

export const deleteProductMessage = Data => {
    return {
        type: DELETE_PRODUCT_MESSAGE,
        payload: Data,
    }
}

export const setProductRecode = Data => {
    return {
        type: SET_TOTAL_RECODE,
        payload: Data,
    }
}

export const getProductInfoByID = Data => {
    return {
        type: GET_PRODUCT_INFO_BY_ID,
        payload: Data,
    }
}

export const getProductReviews = Data => {
    return {
        type: GET_PRODUCT_REVIEWS,
        payload: Data,
    }
}

export const setProductReviews = Data => {
    return {
        type: SET_PRODUCT_REVIEWS,
        payload: Data,
    }
}

export const setProductReviewsRes = Data => {
    return {
        type: SET_PRODUCT_REVIEWS_RES,
        payload: Data,
    }
}


export const setProductInfoByID = Data => {
    return {
        type: SET_PRODUCT_INFO_BY_ID,
        payload: Data,
    }
}

export const setProductResByID = Data => {
    return {
        type: SET_PRODUCT_RES_BY_ID,
        payload: Data,
    }
}

export const getAllCategoriesList = Data => {
    return {
        type: GET_ALL_CATEGORIES_LIST,
        payload: Data,
    }
}

export const setAllCategoriesList = Data => {
    return {
        type: SET_ALL_CATEGORIES_LIST,
        payload: Data,
    }
}

export const deleteReviews = Data => {
    return {
        type: DELETE_REVIEWS,
        payload: Data,
    }
}

export const setDeleteReviewsRes = Data => {
    return {
        type: DELETE_REVIEWS_RES,
        payload: Data,
    }
}

export const addProductVariants = Data => {
    return {
        type: ADD_PRODUCT_VARIANTS,
        payload: Data,
    }
}

export const addProductVariantsRes = Data => {
    return {
        type: ADD_PRODUCT_VARIANTS_RES,
        payload: Data,
    }
}

export const updateProductVariants = Data => {
    return {
        type: UPDATE_PRODUCT_VARIANTS,
        payload: Data,
    }
}

export const updateProductVariantsRes = Data => {
    return {
        type: UPDATE_PRODUCT_VARIANTS_RES,
        payload: Data,
    }
}

export const deleteProductVariants = Data => {
    return {
        type: DELETE_PRODUCT_VARIANTS,
        payload: Data,
    }
}

export const deleteProductVariantsRes = Data => {
    return {
        type: DELETE_PRODUCT_VARIANTS_RES,
        payload: Data,
    }
}