import {
  ADD_MESSAGE_LIST,
  MESSAGE_LOADING,
  DELETE_MESSAGE_MESSAGE,
  SET_TOTAL_RECODE,
} from './actionType'

const initialState = {
  message_list: [],
  total_record: 0,
  loading: true,
  delete_message: {
    loading: false,
    success: null,
    error: null,
  },
}

const message = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MESSAGE_LIST:
      state = {
        ...state,
        message_list: action.payload,
        loading: false,
      }
      break

    case MESSAGE_LOADING:
      state = {
        ...state,
        loading: action.payload,
      }
      break

    case DELETE_MESSAGE_MESSAGE:
      state = {
        ...state,
        delete_message: action.payload,
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

export default message
