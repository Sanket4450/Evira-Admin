import { SET_DASHBOARD_REVENUE } from './actionType'

const initialState = {
  dashboard_revenue: {},
}

const dashboard = (state = initialState, action) => {
  switch (action.type) {
    case SET_DASHBOARD_REVENUE:
      state = {
        ...state,
        dashboard_revenue: action.payload,
      }
      break
  }
  return state
}

export default dashboard
