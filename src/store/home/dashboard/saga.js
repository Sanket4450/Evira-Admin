import { getDashboardApi } from '../../../api'
import { GET_DASHBOARD_REVENUE } from './actionType'
import { takeEvery, fork, all, call, put } from 'redux-saga/effects'
import { setDashboardRevenue } from './actions'

function* getDashboard() {
  yield put(
    setDashboardRevenue({
      loading: true,
      success: null,
      error: null,
    })
  )
  try {
    const results = yield call(getDashboardApi)
    yield put(
      setDashboardRevenue({
        loading: false,
        success: results,
        error: null,
      })
    )
  } catch (error) {
    yield put(categoriesLoading(false))
    yield put(
      setDashboardRevenue({
        loading: false,
        success: null,
        error: error.message,
      })
    )
  }
}

export function* watchDashboard() {
  yield takeEvery(GET_DASHBOARD_REVENUE, getDashboard)
}

function* dashboardSaga() {
  yield all([fork(watchDashboard)])
}

export default dashboardSaga
