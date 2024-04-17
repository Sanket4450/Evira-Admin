import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'
import {
  Card,
  CardBody,
  Col,
  Container,
  NavItem,
  NavLink,
  Row,
} from 'reactstrap'
import classnames from 'classnames'
import { useDispatch } from 'react-redux'
import {
  getOrdersInfo,
  updateOrders,
  updateOrdersMessage,
} from '../../../store/home/orders/actions'
import { useSelector } from 'react-redux'
import { createSelector } from 'reselect'
import Spinners from '../Spinner'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { toast } from 'react-toastify'

const OrdersTrackingModal = (props) => {
  const dispatch = useDispatch()

  const { isOpen, toggle, transaction, refresh } = props

  const [activeTabVertical, setActiveTabVertical] = useState(1)

  const [passedStepsVertical, setPassedStepsVertical] = useState([1])

  const [trackingInfo, setTrackingInfo] = useState([])

  const selectOrdersState = (state) => state.orders

  const OrdersProperties = createSelector(selectOrdersState, (orders) => ({
    order_info_res: orders.order_info_res,
    update_orders: orders.update_orders,
  }))

  const { order_info_res, update_orders } = useSelector(OrdersProperties)

  const product_info = order_info_res?.success?.order

  function toggleTabVertical(tab) {
    if (
      (tab === trackingInfo.length + 1 ||
        tab === trackingInfo.length ||
        tab === trackingInfo.length - 1) &&
      activeTabVertical !== tab
    ) {
      var modifiedSteps = [...passedStepsVertical, tab]

      if (tab >= 1 && tab <= 4) {
        setActiveTabVertical(tab)
        setPassedStepsVertical(modifiedSteps)
      }
    }
  }

  const updateOrderStatus = () => {
    if (activeTabVertical !== trackingInfo.length) {
      let title, description

      switch (activeTabVertical) {
        case 1:
          title = 'Ordered'
          description = 'Order placed successfully'
          break
        case 2:
          title = 'Shipped'
          description = 'Order has been shipped'
          break
        case 3:
          title = 'Out for Delivery'
          description = 'Order is out for delivery'
          break
        case 4:
          title = 'Delivered'
          description = 'Order has been delivered'
          break
        default:
          title = 'Ordered'
          description = 'Order placed successfully'
      }

      const payload = {
        id: transaction?.id,
        status: {
          title,
          description,
          isForwardDirection: activeTabVertical < trackingInfo.length ? false : true,
        },
      }
      dispatch(updateOrders(payload))
    }
  }

  const cancelOrder = () => {
    const payload = {
      id: transaction?.id,
      status: {
        title: 'Canceled',
        description: 'Order has been canceled',
        isForwardDirection: true,
      },
    }
    dispatch(updateOrders(payload))
  }

  useEffect(() => {
    if (update_orders?.success) {
      toast.success(update_orders?.success)
      refresh()
      toggle()
      dispatch(
        updateOrdersMessage({
          loading: false,
          success: null,
          error: null,
        })
      )
    }
  }, [update_orders?.success])

  useEffect(() => {
    setTrackingInfo(product_info?.status)

    const steps = []
    product_info?.status?.map((_, index) => {
      steps.push(index + 1)
    })
    setActiveTabVertical(product_info?.status?.length)
    setPassedStepsVertical(steps)
  }, [product_info, isOpen])

  useEffect(() => {
    if (transaction?.id) {
      dispatch(getOrdersInfo(transaction?.id))
    }
  }, [dispatch, transaction?.id])

  return (
    <Modal
      isOpen={isOpen}
      role="dialog"
      autoFocus={true}
      centered={true}
      className="exampleModal"
      tabIndex="-1"
      toggle={toggle}
      size="lg"
    >
      <div className="modal-content">
        <ModalHeader toggle={toggle}>Order Tracking</ModalHeader>
        <ModalBody>
          {order_info_res?.loading ? (
            <div style={{ height: '300px' }}>
              <Spinners />
            </div>
          ) : (
            <Container fluid={true}>
              <Row>
                <Col lg="12">
                  <Card>
                    <CardBody>
                      <div className="vertical-wizard wizard clearfix vertical">
                        <div
                          className="steps clearfix"
                          style={{ margin: 'auto' }}
                        >
                          <ul>
                            <NavItem
                              className={classnames({
                                current: activeTabVertical === 1,
                              })}
                            >
                              <NavLink
                                className={classnames({
                                  active: activeTabVertical === 1,
                                })}
                                onClick={() => {
                                  toggleTabVertical(1)
                                }}
                                disabled={!passedStepsVertical.includes(1)}
                              >
                                <span className="number">1</span> Ordered
                              </NavLink>
                            </NavItem>
                            <NavItem
                              className={classnames({
                                current: activeTabVertical === 2,
                              })}
                            >
                              <NavLink
                                className={classnames({
                                  active: activeTabVertical === 2,
                                })}
                                onClick={() => {
                                  toggleTabVertical(2)
                                }}
                                disabled={!passedStepsVertical.includes(2)}
                              >
                                <span className="number">2</span>{' '}
                                <span>Shipped</span>
                              </NavLink>
                            </NavItem>
                            <NavItem
                              className={classnames({
                                current: activeTabVertical === 3,
                              })}
                            >
                              <NavLink
                                className={
                                  (classnames({
                                    active: activeTabVertical === 3,
                                  }),
                                  'done')
                                }
                                onClick={() => {
                                  toggleTabVertical(3)
                                }}
                                disabled={!passedStepsVertical.includes(3)}
                              >
                                <span className="number">3</span>Out for
                                Delivery
                              </NavLink>
                            </NavItem>
                            <NavItem
                              className={classnames({
                                current: activeTabVertical === 4,
                              })}
                            >
                              <NavLink
                                className={
                                  (classnames({
                                    active: activeTabVertical === 4,
                                  }),
                                  'done')
                                }
                                onClick={() => {
                                  toggleTabVertical(4)
                                }}
                                disabled={!passedStepsVertical.includes(4)}
                              >
                                <span className="number">4</span> Delivered
                              </NavLink>
                            </NavItem>
                          </ul>
                        </div>

                        <div className="actions clearfix mt-5">
                          <ul
                            style={{
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                          >
                            <li
                              className={
                                activeTabVertical === 1
                                  ? 'previous disabled'
                                  : 'previous'
                              }
                            >
                              <Link
                                to="#"
                                onClick={() => {
                                  toggleTabVertical(activeTabVertical - 1)
                                }}
                              >
                                Previous
                              </Link>
                            </li>

                            <li
                              className={
                                activeTabVertical === 4
                                  ? 'next disabled'
                                  : 'next'
                              }
                            >
                              <Link
                                to="#"
                                onClick={() => {
                                  toggleTabVertical(activeTabVertical + 1)
                                }}
                              >
                                Next
                              </Link>
                            </li>
                            <li
                              className={
                                trackingInfo?.length === activeTabVertical
                                  ? 'disabled'
                                  : ''
                              }
                            >
                              <Link to="#" onClick={updateOrderStatus}>
                                Update
                              </Link>
                            </li>
                            <li
                              className={
                                trackingInfo?.length < 4
                                  ? 'next'
                                  : 'next disabled'
                              }
                            >
                              <Link
                                to="#"
                                onClick={() => {
                                  if (trackingInfo?.length < 4) {
                                    cancelOrder()
                                  }
                                }}
                                className="text-white bg-danger"
                              >
                                Cancel Order
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>
          )}
        </ModalBody>
      </div>
    </Modal>
  )
}

OrdersTrackingModal.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
}

export default OrdersTrackingModal
