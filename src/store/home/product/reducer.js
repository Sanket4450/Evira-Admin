import { ADD_PRODUCT_LIST, ADD_PRODUCT_MESSAGE, PRODUCT_LOADING, DELETE_PRODUCT_MESSAGE, SET_TOTAL_RECODE, UPDATE_PRODUCT_MESSAGE, SET_PRODUCT_INFO_BY_ID, SET_PRODUCT_RES_BY_ID, SET_ALL_CATEGORIES_LIST, SET_PRODUCT_REVIEWS_RES, SET_PRODUCT_REVIEWS, DELETE_REVIEWS_RES, ADD_PRODUCT_VARIANTS_RES, UPDATE_PRODUCT_VARIANTS_RES, DELETE_PRODUCT_VARIANTS_RES } from "./actionType"

const initialState = {
    product_list: [],
    total_record: 0,
    loading: true,
    update_product: {
        loading: false,
        success: null,
        error: null
    },
    delete_product: {
        loading: false,
        success: null,
        error: null
    },
    add_product: {
        loading: false,
        success: null,
        error: null
    },
    product_data_by_id: {},
    product_res_by_id: {
        loading: false,
        success: null,
        error: null
    },
    categories_list: [],
    product_review_res: {
        loading: false,
        success: null,
        error: null
    },
    delete_review_res: {
        loading: false,
        success: null,
        error: null,
        refresh: false
    },
    product_review: [],
    add_variant_res: {
        loading: false,
        success: null,
        error: null,
        refresh: false
    },
    update_variant_res: {
        loading: false,
        success: null,
        error: null
    },
    delete_variant_res: {
        loading: false,
        success: null,
        error: null
    },
}

const product = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PRODUCT_LIST:
            state = {
                ...state,
                product_list: action.payload,
                loading: false
            }
            break

        case PRODUCT_LOADING:
            state = {
                ...state,
                loading: action.payload,
            }
            break

        case UPDATE_PRODUCT_MESSAGE:
            state = {
                ...state,
                update_product: action.payload,
            }
            break

        case DELETE_PRODUCT_MESSAGE:
            state = {
                ...state,
                delete_product: action.payload,
            }
            break

        case ADD_PRODUCT_MESSAGE:
            state = {
                ...state,
                add_product: action.payload,
            }
            break

        case SET_TOTAL_RECODE:
            state = {
                ...state,
                total_record: action.payload,
            }
            break

        case SET_PRODUCT_INFO_BY_ID:
            state = {
                ...state,
                product_data_by_id: action.payload,
            }
            break

        case SET_PRODUCT_RES_BY_ID:
            state = {
                ...state,
                product_res_by_id: action.payload,
            }
            break

        case SET_ALL_CATEGORIES_LIST:
            state = {
                ...state,
                categories_list: action.payload,
            }
            break

        case SET_PRODUCT_REVIEWS:
            state = {
                ...state,
                product_review: action.payload,
            }
            break

        case SET_PRODUCT_REVIEWS_RES:
            state = {
                ...state,
                product_review_res: action.payload,
            }
            break
        case DELETE_REVIEWS_RES:
            state = {
                ...state,
                delete_review_res: action.payload,
            }
            break
        case ADD_PRODUCT_VARIANTS_RES:
            state = {
                ...state,
                add_variant_res: action.payload,
            }
            break

        case UPDATE_PRODUCT_VARIANTS_RES:
            state = {
                ...state,
                update_variant_res: action.payload,
            }
            break

        case DELETE_PRODUCT_VARIANTS_RES:
            state = {
                ...state,
                delete_variant_res: action.payload,
            }
            break
    }
    return state
}

export default product