import { GET_DASHBOARD_REVENUE, SET_DASHBOARD_REVENUE } from "./actionType"

export const getDashboardRevenue = data => {
    return {
        type: GET_DASHBOARD_REVENUE,
        payload: data,
    }
}

export const setDashboardRevenue = data => {
    return {
        type: SET_DASHBOARD_REVENUE,
        payload: data,
    }
}