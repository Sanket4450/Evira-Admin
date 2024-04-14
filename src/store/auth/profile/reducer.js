import {
  SET_USER_INFO,
  SET_USER_RES,
  EDIT_PROFILE_MESSAGE,
} from './actionTypes'

const initialState = {
  user_data: {},
  user_res: {
    loading: false,
    success: null,
    error: null,
  },
  edit_profile: {
    loading: false,
    success: null,
    error: null,
  },
}

const profile = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_INFO:
      state = {
        ...state,
        user_data: action.payload,
      }
      break

    case SET_USER_RES:
      state = {
        ...state,
        user_res: action.payload,
      }
      break

    case EDIT_PROFILE_MESSAGE:
      state = {
        ...state,
        edit_profile: action.payload,
      }
      break

    default:
      state = { ...state }
      break
  }
  return state
}

export default profile
