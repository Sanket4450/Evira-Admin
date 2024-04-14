import {
  getCategoriesApi,
  getProductsApi,
  getProductApi,
  addProductApi,
  updateProductApi,
  deleteProductApi,
  addProductVariantApi,
  updateProductVariantApi,
  deleteProductVariantApi,
  getReviewsApi,
  deleteReviewApi,
} from '../../../api'
import {
  ADD_PRODUCT,
  ADD_PRODUCT_VARIANTS,
  DELETE_PRODUCT,
  DELETE_PRODUCT_VARIANTS,
  DELETE_REVIEWS,
  GET_ALL_CATEGORIES_LIST,
  GET_PRODUCT_INFO_BY_ID,
  GET_PRODUCT_LIST,
  GET_PRODUCT_REVIEWS,
  UPDATE_PRODUCT,
  UPDATE_PRODUCT_VARIANTS,
} from './actionType'
import { takeEvery, fork, all, call, put } from 'redux-saga/effects'
import {
  addProductList,
  addProductMessage,
  productLoading,
  deleteProductMessage,
  setProductRecode,
  updateProductMessage,
  setProductResByID,
  setProductInfoByID,
  setAllCategoriesList,
  setProductReviews,
  setProductReviewsRes,
  setDeleteReviewsRes,
  addProductVariantsRes,
  updateProductVariantsRes,
  deleteProductVariantsRes,
} from './actions'

function* getAllCategories({ payload }) {
  try {
    const results = yield call(getCategoriesApi, payload)
    yield put(setAllCategoriesList(results?.categories?.results))
  } catch (error) {}
}

function* getProduct({ payload }) {
  yield put(productLoading(true))
  try {
    const updatedPayload = {
      ...(payload.category && { category: payload.category }),
      ...(payload.keyword &&
        payload.keyword.trim() && { keyword: payload.keyword.trim() }),
      ...(payload.max_price && { max_price: payload.max_price }),
      ...(payload.min_price && { min_price: payload.min_price }),
      ...(payload.rating && { rating: payload.rating }),
      ...{ page: payload.page || 1, limit: payload.limit || 10 },
    }
    const results = yield call(getProductsApi, updatedPayload)
    yield put(addProductList(results?.products?.results))
    yield put(setProductRecode(results?.products?.count))
  } catch (error) {
    yield put(productLoading(false))
  }
}

function* getProductByID({ payload }) {
  yield put(
    setProductResByID({
      loading: true,
      success: null,
      error: null,
    })
  )
  try {
    const results = yield call(getProductApi, payload)
    yield put(setProductInfoByID(results?.product))
    yield put(
      setProductResByID({
        loading: false,
        success: results?.product,
        error: null,
      })
    )
  } catch (error) {
    yield put(
      setProductResByID({
        loading: false,
        success: null,
        error: error.message,
      })
    )
  }
}

function* addProduct({ payload }) {
  yield put(
    addProductMessage({
      loading: true,
      success: null,
      error: null,
    })
  )
  try {
    const results = yield call(addProductApi, payload)
    yield put(
      addProductMessage({
        loading: false,
        success: results,
        error: null,
      })
    )
  } catch (error) {
    yield put(
      addProductMessage({
        loading: false,
        success: null,
        error: error.message,
      })
    )
  }
}

function* updateProduct({ payload }) {
  yield put(
    updateProductMessage({
      loading: true,
      success: null,
      error: null,
    })
  )
  try {
    const { id, ...updateData } = payload

    const results = yield call(updateProductApi, id, updateData)
    yield put(
      updateProductMessage({
        loading: false,
        success: results,
        error: null,
      })
    )
  } catch (error) {
    yield put(
      updateProductMessage({
        loading: false,
        success: null,
        error: error.message,
      })
    )
  }
}

function* deleteProduct({ payload }) {
  yield put(
    deleteProductMessage({
      loading: true,
      success: null,
      error: null,
    })
  )
  try {
    const results = yield call(deleteProductApi, payload)
    yield put(
      deleteProductMessage({
        loading: false,
        success: results?.message,
        error: null,
      })
    )
  } catch (error) {
    yield put(
      deleteProductMessage({
        loading: false,
        success: null,
        error: error.message,
      })
    )
  }
}

function* addProductVariant({ payload }) {
  yield put(
    addProductVariantsRes({
      loading: true,
      success: null,
      error: null,
    })
  )
  try {
    const { id, ...updateData } = payload

    const results = yield call(addProductVariantApi, id, updateData)
    yield put(
      addProductVariantsRes({
        loading: false,
        success: results?.message,
        error: null,
      })
    )
  } catch (error) {
    yield put(
      addProductVariantsRes({
        loading: false,
        success: null,
        error: error.message,
      })
    )
  }
}

function* updateProductVariant({ payload }) {
  yield put(
    updateProductVariantsRes({
      loading: true,
      success: null,
      error: null,
    })
  )
  try {
    const { id, ...updateData } = payload

    const results = yield call(updateProductVariantApi, id, updateData)
    yield put(
      updateProductVariantsRes({
        loading: false,
        success: results?.message,
        error: null,
      })
    )
  } catch (error) {
    yield put(
      updateProductVariantsRes({
        loading: false,
        success: null,
        error: error.message,
      })
    )
  }
}

function* deleteProductVariant({ payload }) {
  yield put(
    deleteProductVariantsRes({
      loading: true,
      success: null,
      error: null,
    })
  )
  try {
    const results = yield call(deleteProductVariantApi, payload)
    yield put(
      deleteProductVariantsRes({
        loading: false,
        success: results?.message,
        error: null,
      })
    )
  } catch (error) {
    yield put(
      deleteProductVariantsRes({
        loading: false,
        success: null,
        error: error.message,
      })
    )
  }
}

function* getProductReviews({ payload }) {
  yield put(
    setProductReviewsRes({
      loading: true,
      success: null,
      error: null,
    })
  )
  try {
    const results = yield call(getReviewsApi, payload)
    yield put(setProductReviews(results?.reviews))
    yield put(
      setProductReviewsRes({
        loading: false,
        success: results?.reviews,
      })
    )
  } catch (error) {
    yield put(
      setProductReviewsRes({
        loading: false,
        success: null,
        error: error.message,
      })
    )
  }
}

function* deteleReviews({ payload }) {
  yield put(
    setDeleteReviewsRes({
      loading: true,
      success: null,
      error: null,
      refresh: false,
    })
  )
  try {
    const results = yield call(deleteReviewApi, payload)
    yield put(
      setDeleteReviewsRes({
        loading: false,
        success: results?.message,
        error: null,
        refresh: true,
      })
    )
  } catch (error) {
    yield put(
      setDeleteReviewsRes({
        loading: false,
        success: null,
        error: error.message,
        refresh: false,
      })
    )
  }
}

export function* watchProduct() {
  yield takeEvery(GET_PRODUCT_LIST, getProduct)
  yield takeEvery(UPDATE_PRODUCT, updateProduct)
  yield takeEvery(DELETE_PRODUCT, deleteProduct)
  yield takeEvery(ADD_PRODUCT, addProduct)
  yield takeEvery(GET_PRODUCT_INFO_BY_ID, getProductByID)
  yield takeEvery(GET_ALL_CATEGORIES_LIST, getAllCategories)
  yield takeEvery(ADD_PRODUCT_VARIANTS, addProductVariant)
  yield takeEvery(UPDATE_PRODUCT_VARIANTS, updateProductVariant)
  yield takeEvery(DELETE_PRODUCT_VARIANTS, deleteProductVariant)
  yield takeEvery(GET_PRODUCT_REVIEWS, getProductReviews)
  yield takeEvery(DELETE_REVIEWS, deteleReviews)
}

function* productSaga() {
  yield all([fork(watchProduct)])
}

export default productSaga
