import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import {
  Badge,
  Button,
  Container,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from 'reactstrap'
//redux
import { useSelector, useDispatch } from 'react-redux'

//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb'

//i18n
import { withTranslation } from 'react-i18next'
import BasicTable from '../../components/Common/BasicTable'
import {
  getOrdersList,
  updateOrders,
  updateOrdersMessage,
} from '../../store/home/orders/actions'
import { createSelector } from 'reselect'

import Spinners from '../../components/Common/Spinner'
import { toast } from 'react-toastify'
import Paginations from '../../components/Common/Pagination'
import moment from 'moment'
import OrdersModal from '../../components/Common/Model/OrdersModal'
import OrdersTrackingModal from '../../components/Common/Model/OrdersTrackingModal'

const Orders = (props) => {
  const [pagination, setPagination] = useState({
    limit: 5,
    page: 1,
    type: null,
  })
  const [singleBtn, setSingleBtn] = useState(false)

  const [modelInfo, setModelInfo] = useState({
    updateOrders: false,
    updateOrdersInfo: {},
    viewOrders: false,
    viewOrdersInfo: {},
    viewOrdersTrack: false,
    viewOrdersTrackInfo: {},
  })

  document.title = 'Orders | Evira - Admin & Dashboard'
  const dispatch = useDispatch()

  const selectOrdersState = (state) => state.orders

  const OrdersProperties = createSelector(selectOrdersState, (orders) => ({
    orders_list: orders.orders_list,
    loading: orders.loading,
    update_orders: orders.update_orders,
    total_record: orders.total_record,
  }))

  const { orders_list, loading, update_orders, total_record } =
    useSelector(OrdersProperties)

  useEffect(() => {
    dispatch(getOrdersList(pagination))
  }, [dispatch, pagination])

  const refresh = () => {
    dispatch(getOrdersList(pagination))
  }

  const column = [
    {
      id: 1,
      label: 'Order ID',
      value: 'Order ID',
      render: (rowData) => {
        return <div className="text-body fw-bold">#{rowData.id}</div>
      },
    },
    {
      id: 2,
      label: 'Product Name',
      value: 'Order ID',
      render: (rowData) => {
        return <div className="text-body">{rowData.name}</div>
      },
    },
    {
      id: 3,
      label: 'Date',
      value: 'date',
      render: (rowData) => {
        return (
          <div className="text-body">
            {moment(rowData.createdAt).format('YYYY-MM-DD')}
          </div>
        )
      },
    },
    {
      id: 4,
      label: 'Amount',
      value: 'amount',
      textAlign: 'center',
      render: (rowData) => {
        return <div className="text-body">{rowData.amount}₹</div>
      },
    },
    {
      id: 5,
      label: 'Payment Method',
      value: 'paymentMethod',
      textAlign: 'center',
      render: (rowData) => {
        return <div className="text-body">{rowData.paymentMethod ?? '-'}</div>
      },
    },
    {
      id: 6,
      label: 'Status',
      value: 'status',
      textAlign: 'center',
      render: (rowData) => {
        let statusColor

        switch (rowData.status[0]?.title) {
          case 'Ordered':
            statusColor = 'warning'
            break

          case 'Canceled':
            statusColor = 'danger'
            break

          case 'Delivered':
            statusColor = 'success'
            break

          default:
            statusColor = 'primary'
        }
        return (
          <Badge className={'font-size-11 badge-soft-' + statusColor}>
            {rowData.status[0]?.title}
          </Badge>
        )
      },
    },
    {
      id: 7,
      label: 'View Details',
      value: 'View Details',
      textAlign: 'center',
      render: (rowData) => {
        return (
          <Button
            type="button"
            color="primary"
            className="btn-sm btn-rounded"
            onClick={() => {
              setModelInfo({
                ...modelInfo,
                viewOrders: true,
                viewOrdersInfo: rowData,
              })
            }}
          >
            View Details
          </Button>
        )
      },
    },
    {
      id: 8,
      label: 'Track Order',
      value: 'Track Order',
      textAlign: 'center',
      render: (rowData) => {
        return (
          <Button
            type="button"
            color="primary"
            className="btn-sm btn-rounded"
            disabled={rowData?.status[0]?.title === 'Canceled'}
            onClick={() => {
              setModelInfo({
                ...modelInfo,
                viewOrdersTrack: true,
                viewOrdersTrackInfo: rowData,
              })
            }}
          >
            Track Details
          </Button>
        )
      },
    },
  ]

  // This useEffect Use after update orders
  useEffect(() => {
    if (modelInfo?.updateOrders) {
      toast.success(update_orders?.success)
      closeUpdateModel()
      refresh()
    }
  }, [update_orders?.success])

  // refresh()

  const closeUpdateModel = () => {
    setModelInfo({
      ...modelInfo,
      updateOrders: !modelInfo?.updateOrders,
    })
    dispatch(
      updateOrdersMessage({
        loading: false,
        success: null,
        error: null,
      })
    )
  }

  const closeViewModel = () => {
    setModelInfo({
      ...modelInfo,
      viewOrders: false,
      viewOrdersInfo: {},
      viewOrdersTrack: false,
      viewOrdersTrackInfo: {},
    })
  }
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title={props.t('Orders')}
            breadcrumbItem={props.t('Orders')}
          />
          {loading ? (
            <>
              <Spinners />
            </>
          ) : (
            <>
              <div className="mb-4">
                <Dropdown
                  isOpen={singleBtn}
                  toggle={() => setSingleBtn(!singleBtn)}
                >
                  <DropdownToggle tag="button" className="btn btn-primary">
                    {pagination?.type ? pagination?.type : 'All'}{' '}
                    <i className="mdi mdi-chevron-down" />
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem
                      onClick={() =>
                        setPagination({
                          ...pagination,
                          type: null,
                          limit: 5,
                          page: 1,
                        })
                      }
                    >
                      All
                    </DropdownItem>
                    <DropdownItem
                      onClick={() =>
                        setPagination({
                          ...pagination,
                          type: 'completed',
                          limit: 5,
                          page: 1,
                        })
                      }
                    >
                      completed
                    </DropdownItem>
                    <DropdownItem
                      onClick={() =>
                        setPagination({
                          ...pagination,
                          type: 'Ongoing',
                          limit: 5,
                          page: 1,
                        })
                      }
                    >
                      Ongoing
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
              <BasicTable
                column={column}
                data={orders_list}
                theadClass="table-light"
              />
              {/* <Paginations data={orders_list} pagination={pagination} setPagination={setPagination} total_page={total_record} /> */}
              <Paginations
                perPageData={pagination?.limit}
                data={total_record}
                currentPage={pagination?.page}
                setCurrentPage={(e) => {
                  setPagination({
                    ...pagination,
                    page: e,
                  })
                }}
                isShowingPageLength={false}
                paginationDiv="col-12"
                paginationClass="pagination pagination-rounded justify-content-center mt-2 mb-5"
              />
            </>
          )}
        </Container>
      </div>
      {/* ------------- View Order Details -------------- */}
      <OrdersModal
        isOpen={modelInfo?.viewOrders}
        toggle={closeViewModel}
        transaction={modelInfo?.viewOrdersInfo}
      />

      {/* ------------- View Order Tracking -------------- */}
      <OrdersTrackingModal
        isOpen={modelInfo?.viewOrdersTrack}
        toggle={closeViewModel}
        transaction={modelInfo?.viewOrdersTrackInfo}
        refresh={refresh}
      />
    </React.Fragment>
  )
}

Orders.propTypes = {
  t: PropTypes.any,
  chartsData: PropTypes.any,
  onGetChartsData: PropTypes.func,
}

export default withTranslation()(Orders)
