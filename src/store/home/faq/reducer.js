import {
  ADD_FAQ_LIST,
  ADD_FAQ_MESSAGE,
  FAQ_LOADING,
  DELETE_FAQ_MESSAGE,
  SET_TOTAL_RECODE,
  UPDATE_FAQ_MESSAGE,
} from './actionType'

const initialState = {
  faq_list: [],
  total_record: 0,
  loading: true,
  update_faq: {
    loading: false,
    success: null,
    error: null,
  },
  delete_faq: {
    loading: false,
    success: null,
    error: null,
  },
  add_faq: {
    loading: false,
    success: null,
    error: null,
  },
}

const faq = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FAQ_LIST:
      state = {
        ...state,
        faq_list: action.payload,
        loading: false,
      }
      break

    case FAQ_LOADING:
      state = {
        ...state,
        loading: action.payload,
      }
      break

    case UPDATE_FAQ_MESSAGE:
      state = {
        ...state,
        update_faq: action.payload,
      }
      break

    case DELETE_FAQ_MESSAGE:
      state = {
        ...state,
        delete_faq: action.payload,
      }
      break

    case ADD_FAQ_MESSAGE:
      state = {
        ...state,
        add_faq: action.payload,
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

export default faq
