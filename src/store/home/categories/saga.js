import {
  getCategoriesApi,
  addCategoryApi,
  updateCategoryApi,
  deleteCategoryApi,
} from '../../../api'
import {
  ADD_CATEGORIES,
  DELETE_CATEGORIES,
  GET_CATEGORIES_LIST,
  UPDATE_CATEGORIES,
} from './actionType'
import { takeEvery, fork, all, call, put } from 'redux-saga/effects'
import {
  addCategoriesList,
  addCategoriesMessage,
  categoriesLoading,
  deleteCategoriesMessage,
  setCategoriesRecode,
  updateCategoriesMessage,
} from './actions'

function* getCategories({ payload }) {
  yield put(categoriesLoading(true))
  try {
    const response = yield call(getCategoriesApi, payload)
    yield put(addCategoriesList(response?.results?.categories?.results))
    yield put(setCategoriesRecode(response?.results?.categories?.count))
  } catch (error) {
    yield put(categoriesLoading(false))
  }
}

function* addCategories({ payload }) {
  yield put(
    addCategoriesMessage({
      loading: true,
      success: null,
      error: null,
    })
  )
  try {
    const response = yield call(addCategoryApi, payload)
    yield put(
      addCategoriesMessage({
        loading: false,
        success: response?.message,
        error: null,
      })
    )
  } catch (error) {
    yield put(
      addCategoriesMessage({
        loading: false,
        success: null,
        error: error.message,
      })
    )
  }
}

function* updateCategories({ payload }) {
  yield put(
    updateCategoriesMessage({
      loading: true,
      success: null,
      error: null,
    })
  )
  try {
    const { id, ...updateData } = payload

    const response = yield call(updateCategoryApi, id, updateData)
    yield put(
      updateCategoriesMessage({
        loading: false,
        success: response?.message,
        error: null,
      })
    )
  } catch (error) {
    yield put(
      updateCategoriesMessage({
        loading: false,
        success: null,
        error: error.message,
      })
    )
  }
}

function* deleteCategories({ payload }) {
  yield put(
    deleteCategoriesMessage({
      loading: true,
      success: null,
      error: null,
    })
  )
  try {
    const { id } = payload

    const response = yield call(deleteCategoryApi, id)
    yield put(
      deleteCategoriesMessage({
        loading: false,
        success: response?.message,
        error: null,
      })
    )
  } catch (error) {
    yield put(
      deleteCategoriesMessage({
        loading: false,
        success: null,
        error: error.message,
      })
    )
  }
}

export function* watchCategories() {
  yield takeEvery(GET_CATEGORIES_LIST, getCategories)
  yield takeEvery(ADD_CATEGORIES, addCategories)
  yield takeEvery(UPDATE_CATEGORIES, updateCategories)
  yield takeEvery(DELETE_CATEGORIES, deleteCategories)
}

function* categoriesSaga() {
  yield all([fork(watchCategories)])
}

export default categoriesSaga
