import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Col,
  Container, Row
} from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

//i18n
import { withTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { getDashboardRevenue } from '../../store/home/dashboard/actions'
import { createSelector } from 'reselect'
import { useSelector } from 'react-redux'
import MonthlyEarning from '../../components/Dashboard/MonthlyEarning'
import classNames from 'classnames'
import StackedColumnChart from '../../components/Dashboard/StackedColumnChart'
import Spinners from '../../components/Common/Spinner'

const Dashboard = (props) => {
  const dispatch = useDispatch()
  const [monthlyData, setMonthlyData] = useState({})
  const [periodData, setPeriodData] = useState([])
  const [periodType, setPeriodType] = useState('Year')

  const selectDashboardState = (state) => state.dashboard

  const DashboardProperties = createSelector(
    selectDashboardState,
    (dashboard) => ({
      dashboard_revenue: dashboard.dashboard_revenue,
    })
  )

  const { dashboard_revenue } = useSelector(DashboardProperties)

  useEffect(() => {
    dispatch(getDashboardRevenue())
  }, [dispatch])

  useEffect(() => {
    if (dashboard_revenue?.success) {
      let currentRevenue =
        dashboard_revenue?.success?.currentMonth?.Revenue
      let lastRevenue = dashboard_revenue?.success?.lastMonth?.Revenue
      let currentOrders =
        dashboard_revenue?.success?.currentMonth?.Orders
      let lastOrders = dashboard_revenue?.success?.lastMonth?.Orders

      let Earning = {
        count: currentRevenue,
        percentage: lastRevenue ? ((currentRevenue - lastRevenue) * 100) / lastRevenue : 0,
        Symbol: '₹',
      }
      let Orders = {
        count: currentOrders,
        percentage: lastOrders ? ((currentOrders - lastOrders) * 100) / lastOrders : 0,
      }

      setMonthlyData({ Earning, Orders })
      onChangeChartPeriod('year')
    }
  }, [dashboard_revenue?.success])

  const onChangeChartPeriod = (pType) => {
    setPeriodType(pType)
    const pTypeData =
      dashboard_revenue?.success?.chartData?.[`${pType}`]
    const transformedData = pTypeData.map((week) => ({
      name: week.name,
      data: Object.values(week.data),
      label: Object.keys(week.data),
    }))
    setPeriodData(transformedData)
  }

  document.title = 'Dashboard | Skote - Vite React Admin & Dashboard Template'
  return (
    <React.Fragment>
      <Container fluid>
        <div className="page-content">
          <Breadcrumbs
            title={props.t('Dashboards')}
            breadcrumbItem={props.t('Dashboard')}
          />
          {dashboard_revenue?.loading ? (
            <Spinners />
          ) : (
            <Row>
              <Col xl="4">
                <MonthlyEarning
                  title={'Monthly Earning'}
                  data={monthlyData?.Earning}
                  label={'Earning'}
                />
                <MonthlyEarning
                  title={'Monthly Orders'}
                  data={monthlyData?.Orders}
                  label={'Orders'}
                />
              </Col>
              <Col xl="8">
                <Row>
                  <Col md="4">
                    <Card className="mini-stats-wid">
                      <CardBody>
                        <div className="d-flex">
                          <div className="flex-grow-1">
                            <p className="text-muted fw-medium">{'Orders'}</p>
                            <h4 className="mb-0">
                              {dashboard_revenue?.success?.Orders}
                            </h4>
                          </div>
                          <div className="avatar-sm rounded-circle bg-primary align-self-center mini-stat-icon">
                            <span className="avatar-title rounded-circle bg-primary">
                              <i
                                className={
                                  'bx ' + 'bx-copy-alt' + ' font-size-24'
                                }
                              ></i>
                            </span>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col md="4">
                    <Card className="mini-stats-wid">
                      <CardBody>
                        <div className="d-flex">
                          <div className="flex-grow-1">
                            <p className="text-muted fw-medium">{'Revenue'}</p>
                            <h4 className="mb-0">
                              ₹{dashboard_revenue?.success?.Revenue}
                            </h4>
                          </div>
                          <div className="avatar-sm rounded-circle bg-primary align-self-center mini-stat-icon">
                            <span className="avatar-title rounded-circle bg-primary">
                              <i
                                className={
                                  'bx ' + 'bx-archive-in' + ' font-size-24'
                                }
                              ></i>
                            </span>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col md="4">
                    <Card className="mini-stats-wid">
                      <CardBody>
                        <div className="d-flex">
                          <div className="flex-grow-1">
                            <p className="text-muted fw-medium">
                              {'Average Price'}
                            </p>
                            <h4 className="mb-0">
                              ₹
                              {(dashboard_revenue?.success?.Revenue /
                                dashboard_revenue?.success?.Orders).toFixed(2)}
                            </h4>
                          </div>
                          <div className="avatar-sm rounded-circle bg-primary align-self-center mini-stat-icon">
                            <span className="avatar-title rounded-circle bg-primary">
                              <i
                                className={
                                  'bx ' +
                                  'bx-purchase-tag-alt' +
                                  ' font-size-24'
                                }
                              ></i>
                            </span>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>

                <Card>
                  <CardBody>
                    <div className="d-sm-flex flex-wrap">
                      <h4 className="card-title mb-4">Order</h4>
                      <div className="ms-auto">
                        <ul className="nav nav-pills">
                          <li className="nav-item">
                            <div
                              style={{ cursor: 'pointer' }}
                              className={classNames(
                                { active: periodType === 'week' },
                                'nav-link'
                              )}
                              onClick={() => {
                                onChangeChartPeriod('week')
                              }}
                              id="one_month"
                            >
                              Week
                            </div>{' '}
                          </li>
                          <li className="nav-item">
                            <div
                              style={{ cursor: 'pointer' }}
                              className={classNames(
                                { active: periodType === 'month' },
                                'nav-link'
                              )}
                              onClick={() => {
                                onChangeChartPeriod('month')
                              }}
                              id="one_month"
                            >
                              Month
                            </div>
                          </li>
                          <li className="nav-item">
                            <div
                              style={{ cursor: 'pointer' }}
                              className={classNames(
                                { active: periodType === 'year' },
                                'nav-link'
                              )}
                              onClick={() => {
                                onChangeChartPeriod('year')
                              }}
                              id="one_month"
                            >
                              Year
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                    {periodData.length > 0 && <StackedColumnChart
                      periodData={periodData}
                      dataColors='["--bs-primary", "--bs-warning", "--bs-success"]'
                    />}
                  </CardBody>
                </Card>
              </Col>
            </Row>
          )}
        </div>
      </Container>
    </React.Fragment>
  )
}

Dashboard.propTypes = {
  t: PropTypes.any,
  chartsData: PropTypes.any,
  onGetChartsData: PropTypes.func,
};

export default withTranslation()(Dashboard);
