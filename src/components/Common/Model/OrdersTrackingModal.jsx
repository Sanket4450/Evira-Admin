import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'
import {
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormGroup,
  Label,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
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

  const [activeTabVartical, setoggleTabVertical] = useState(1)

  const [passedStepsVertical, setPassedStepsVertical] = useState([1])

  const [description, setDescription] = useState('')

  const [trackingInfo, setTrackingInfo] = useState([])

  const selectOrdersState = (state) => state.orders

  const OrdersProperties = createSelector(selectOrdersState, (orders) => ({
    order_info_res: orders.order_info_res,
    update_orders: orders.update_orders,
  }))

  const { order_info_res, update_orders } = useSelector(OrdersProperties)

  const product_info = order_info_res?.success?.order?.[0]

  function toggleTabVertical(tab) {
    if (activeTabVartical !== tab) {
      var modifiedSteps = [...passedStepsVertical, tab]

      if (tab >= 1 && tab <= 5) {
        setoggleTabVertical(tab)
        setPassedStepsVertical(modifiedSteps)
      }
    }
  }

  const nextTab = (tab) => {
    if (trackingInfo?.[activeTabVartical - 1]?.done) {
      if (tab > 1 && tab < 5 && tab > trackingInfo?.length) {
        const newTrackingInfo = trackingInfo
        newTrackingInfo.push({
          date: new Date(),
          description: null,
          done: false,
        })
        setTrackingInfo(newTrackingInfo)
      }
      toggleTabVertical(activeTabVartical + 1)
    } else {
      let title
      let type
      let description
      switch (activeTabVartical) {
        case 1:
          title = 'Ordered'
          type = 'Ongoing'
          description = 'Order placed successfully'
          break
        case 2:
          title = 'Shipped'
          type = 'Ongoing'
          description = 'Order Shipped successfully'
          break
        case 3:
          title = 'Out for Delivery'
          type = 'Ongoing'
          description = 'Out for Delivery'
          break
        case 4:
          title = 'Delivered'
          type = 'completed'
          description = 'Order Delivered successfully'
          break
        default:
          title = 'Ordered'
          type = 'Ongoing'
          description = 'Order placed successfully'
      }

      const payload = {
        id: transaction?.id,
        type: type,
        status: {
          title,
          description,
          date: new Date(),
        },
      }
      dispatch(updateOrders(payload))
      setDescription()
    }
  }

  const cancelOrder = () => {
    const payload = {
      id: transaction?.id,
      type: 'completed',
      status: {
        title: 'Canceled',
        description,
        date: new Date(),
      },
    }
    dispatch(updateOrders(payload))
    setDescription()
  }

  const handleDescriptionChange = (event) => {
    const updatedTrackingInfo = [...trackingInfo] // Create a copy of the trackingInfo array
    updatedTrackingInfo[activeTabVartical - 1].description = event.target.value // Update the description
    setTrackingInfo(updatedTrackingInfo) // Update the state with the modified trackingInfo array
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
    setTrackingInfo(
      product_info?.status.map((item) => {
        return {
          ...item,
          done: true,
        }
      })
    )
    const steps = []
    product_info?.status?.map((item, index) => {
      steps.push(index + 1)
    })
    setoggleTabVertical(product_info?.status?.length)
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
        <ModalHeader toggle={toggle}>Order Details</ModalHeader>
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
                        <div className="steps clearfix">
                          <ul>
                            <NavItem
                              className={classnames({
                                current: activeTabVartical === 1,
                              })}
                            >
                              <NavLink
                                className={classnames({
                                  active: activeTabVartical === 1,
                                })}
                                onClick={() => {
                                  toggleTabVertical(1)
                                }}
                                disabled={
                                  !(passedStepsVertical || []).includes(1)
                                }
                              >
                                <span className="number">1.</span> Ordered
                              </NavLink>
                            </NavItem>
                            <NavItem
                              className={classnames({
                                current: activeTabVartical === 2,
                              })}
                            >
                              <NavLink
                                className={classnames({
                                  active: activeTabVartical === 2,
                                })}
                                onClick={() => {
                                  toggleTabVertical(2)
                                }}
                                disabled={
                                  !(passedStepsVertical || []).includes(2)
                                }
                              >
                                <span className="number">2.</span>{' '}
                                <span>Shipped</span>
                              </NavLink>
                            </NavItem>
                            <NavItem
                              className={classnames({
                                current: activeTabVartical === 3,
                              })}
                            >
                              <NavLink
                                className={
                                  (classnames({
                                    active: activeTabVartical === 3,
                                  }),
                                  'done')
                                }
                                onClick={() => {
                                  toggleTabVertical(3)
                                }}
                                disabled={
                                  !(passedStepsVertical || []).includes(3)
                                }
                              >
                                <span className="number">3.</span>Out for
                                Delivery
                              </NavLink>
                            </NavItem>
                            <NavItem
                              className={classnames({
                                current: activeTabVartical === 4,
                              })}
                            >
                              <NavLink
                                className={
                                  (classnames({
                                    active: activeTabVartical === 4,
                                  }),
                                  'done')
                                }
                                onClick={() => {
                                  toggleTabVertical(4)
                                }}
                                disabled={
                                  !(passedStepsVertical || []).includes(4)
                                }
                              >
                                <span className="number">4.</span> Delivered
                              </NavLink>
                            </NavItem>
                            <NavItem
                              className={classnames({
                                current: activeTabVartical === 5,
                              })}
                            >
                              <NavLink
                                className={
                                  (classnames({
                                    active: activeTabVartical === 5,
                                  }),
                                  'done')
                                }
                                onClick={() => {
                                  toggleTabVertical(5)
                                }}
                                disabled={
                                  !(passedStepsVertical || []).includes(5)
                                }
                              >
                                <span className="number">5.</span> Done
                              </NavLink>
                            </NavItem>
                          </ul>
                        </div>
                        <div className="content clearfix">
                          <TabContent
                            activeTab={activeTabVartical}
                            className="body"
                          >
                            <TabPane tabId={1}>
                              <Form>
                                <Row>
                                  <Col lg="12">
                                    <FormGroup className="mb-3 d-flex flex-column">
                                      <Label htmlFor="basicpill-address-input12">
                                        Date
                                      </Label>
                                      {moment(
                                        trackingInfo?.[activeTabVartical - 1]
                                          ?.date
                                      ).format('MMMM Do YYYY, h:mm:ss a')}
                                    </FormGroup>
                                  </Col>
                                  <Col lg="12">
                                    <FormGroup className="mb-3">
                                      <Label htmlFor="basicpill-address-input12">
                                        Description
                                      </Label>
                                      <textarea
                                        id="basicpill-address-input12"
                                        className="form-control"
                                        rows="4"
                                        placeholder="Enter Description"
                                        // readOnly={trackingInfo?.[activeTabVartical - 1]?.done}
                                        // value={trackingInfo?.[activeTabVartical - 1]?.description}
                                        // onChange={handleDescriptionChange}
                                        value={description}
                                        onChange={(e) => {
                                          setDescription(e.target.value)
                                        }}
                                      />
                                    </FormGroup>
                                  </Col>
                                </Row>
                              </Form>
                            </TabPane>
                            <TabPane tabId={2}>
                              <Form>
                                <Row>
                                  <Col lg="12">
                                    <FormGroup className="mb-3 d-flex flex-column">
                                      <Label htmlFor="basicpill-address-input12">
                                        Date
                                      </Label>
                                      {moment(
                                        trackingInfo?.[activeTabVartical - 1]
                                          ?.date
                                      ).format('MMMM Do YYYY, h:mm:ss a')}
                                    </FormGroup>
                                  </Col>
                                  <Col lg="12">
                                    <FormGroup className="mb-3">
                                      <Label htmlFor="basicpill-address-input12">
                                        Description
                                      </Label>
                                      <textarea
                                        id="basicpill-address-input12"
                                        className="form-control"
                                        rows="4"
                                        placeholder="Enter Description"
                                        // readOnly={trackingInfo?.[activeTabVartical - 1]?.done}
                                        // value={trackingInfo?.[activeTabVartical - 1]?.description}
                                        // onChange={handleDescriptionChange}
                                        value={description}
                                        onChange={(e) => {
                                          setDescription(e.target.value)
                                        }}
                                      />
                                    </FormGroup>
                                  </Col>
                                </Row>
                              </Form>
                            </TabPane>
                            <TabPane tabId={3}>
                              <Form>
                                <Row>
                                  <Col lg="12">
                                    <FormGroup className="mb-3 d-flex flex-column">
                                      <Label htmlFor="basicpill-address-input12">
                                        Date
                                      </Label>
                                      {moment(
                                        trackingInfo?.[activeTabVartical - 1]
                                          ?.date
                                      ).format('MMMM Do YYYY, h:mm:ss a')}
                                    </FormGroup>
                                  </Col>
                                  <Col lg="12">
                                    <FormGroup className="mb-3">
                                      <Label htmlFor="basicpill-address-input12">
                                        Description
                                      </Label>
                                      <textarea
                                        id="basicpill-address-input12"
                                        className="form-control"
                                        rows="4"
                                        placeholder="Enter Description"
                                        // readOnly={trackingInfo?.[activeTabVartical - 1]?.done}
                                        // value={trackingInfo?.[activeTabVartical - 1]?.description}
                                        // onChange={handleDescriptionChange}
                                        value={description}
                                        onChange={(e) => {
                                          setDescription(e.target.value)
                                        }}
                                      />
                                    </FormGroup>
                                  </Col>
                                </Row>
                              </Form>
                            </TabPane>
                            <TabPane tabId={4}>
                              <Form>
                                <Row>
                                  <Col lg="12">
                                    <FormGroup className="mb-3 d-flex flex-column">
                                      <Label htmlFor="basicpill-address-input12">
                                        Date
                                      </Label>
                                      {moment(
                                        trackingInfo?.[activeTabVartical - 1]
                                          ?.date
                                      ).format('MMMM Do YYYY, h:mm:ss a')}
                                    </FormGroup>
                                  </Col>
                                  <Col lg="12">
                                    <FormGroup className="mb-3">
                                      <Label htmlFor="basicpill-address-input12">
                                        Description
                                      </Label>
                                      <textarea
                                        id="basicpill-address-input12"
                                        className="form-control"
                                        rows="4"
                                        placeholder="Enter Description"
                                        // readOnly={trackingInfo?.[activeTabVartical - 1]?.done}
                                        // value={trackingInfo?.[activeTabVartical - 1]?.description}
                                        // onChange={handleDescriptionChange}
                                        value={description}
                                        onChange={(e) => {
                                          setDescription(e.target.value)
                                        }}
                                      />
                                    </FormGroup>
                                  </Col>
                                </Row>
                              </Form>
                            </TabPane>
                            <TabPane tabId={5}>
                              <div className="row justify-content-center">
                                <Col lg="6">
                                  <div className="text-center">
                                    <div className="mb-4">
                                      <i className="mdi mdi-check-circle-outline text-success display-4" />
                                    </div>
                                    <div>
                                      <h5>Confirm Detail</h5>
                                      <p className="text-muted">
                                        If several languages coalesce, the
                                        grammar of the resulting
                                      </p>
                                    </div>
                                  </div>
                                </Col>
                              </div>
                            </TabPane>
                          </TabContent>
                        </div>
                        <div className="actions clearfix">
                          <ul>
                            <li
                              className={
                                activeTabVartical === 1
                                  ? 'previous disabled'
                                  : 'previous'
                              }
                            >
                              <Link
                                to="#"
                                onClick={() => {
                                  toggleTabVertical(activeTabVartical - 1)
                                }}
                              >
                                Previous
                              </Link>
                            </li>

                            <li
                              className={
                                activeTabVartical === 5
                                  ? 'next disabled'
                                  : 'next'
                              }
                            >
                              <Link
                                to="#"
                                onClick={() => {
                                  nextTab(activeTabVartical + 1)
                                }}
                              >
                                Next
                              </Link>
                            </li>
                            <li
                              className={
                                activeTabVartical < 4 && description
                                  ? 'next'
                                  : 'next disabled'
                              }
                            >
                              <Link
                                to="#"
                                onClick={() => {
                                  if (activeTabVartical < 4 && description) {
                                    cancelOrder(activeTabVartical + 1)
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
