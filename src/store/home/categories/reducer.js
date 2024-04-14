import {
  ADD_CATEGORIES_LIST,
  ADD_CATEGORIES_MESSAGE,
  CATEGORIES_LOADING,
  DELETE_CATEGORIES_MESSAGE,
  SET_TOTAL_RECODE,
  UPDATE_CATEGORIES_MESSAGE,
} from './actionType'

const initialState = {
  categories_list: [],
  total_record: 0,
  loading: true,
  update_categories: {
    loading: false,
    success: null,
    error: null,
  },
  delete_categories: {
    loading: false,
    success: null,
    error: null,
  },
  add_categories: {
    loading: false,
    success: null,
    error: null,
  },
}

const categories = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CATEGORIES_LIST:
      state = {
        ...state,
        categories_list: action.payload,
        loading: false,
      }
      break

    case CATEGORIES_LOADING:
      state = {
        ...state,
        loading: action.payload,
      }
      break

    case UPDATE_CATEGORIES_MESSAGE:
      state = {
        ...state,
        update_categories: action.payload,
      }
      break

    case DELETE_CATEGORIES_MESSAGE:
      state = {
        ...state,
        delete_categories: action.payload,
      }
      break

    case ADD_CATEGORIES_MESSAGE:
      state = {
        ...state,
        add_categories: action.payload,
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

export default categories
