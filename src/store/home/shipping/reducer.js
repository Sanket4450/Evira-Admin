import {
  ADD_SHIPPING_LIST,
  ADD_SHIPPING_MESSAGE,
  SHIPPING_LOADING,
  DELETE_SHIPPING_MESSAGE,
  UPDATE_SHIPPING_MESSAGE,
} from './actionType'

const initialState = {
  shipping_list: [],
  total_record: 0,
  loading: true,
  update_shipping: {
    loading: false,
    success: null,
    error: null,
  },
  delete_shipping: {
    loading: false,
    success: null,
    error: null,
  },
  add_shipping: {
    loading: false,
    success: null,
    error: null,
  },
}

const shipping = (state = initialState, action) => {
  switch (action.type) {
    case ADD_SHIPPING_LIST:
      state = {
        ...state,
        shipping_list: action.payload,
        loading: false,
      }
      break

    case SHIPPING_LOADING:
      state = {
        ...state,
        loading: action.payload,
      }
      break

    case UPDATE_SHIPPING_MESSAGE:
      state = {
        ...state,
        update_shipping: action.payload,
      }
      break

    case DELETE_SHIPPING_MESSAGE:
      state = {
        ...state,
        delete_shipping: action.payload,
      }
      break

    case ADD_SHIPPING_MESSAGE:
      state = {
        ...state,
        add_shipping: action.payload,
      }
      break
  }
  return state
}

export default shipping
