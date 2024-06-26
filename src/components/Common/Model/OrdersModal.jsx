import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Table,
} from 'reactstrap'
import { useDispatch } from 'react-redux'
import { getOrdersInfo } from '../../../store/home/orders/actions'
import { useSelector } from 'react-redux'
import { createSelector } from 'reselect'
import Spinners from '../Spinner'

const OrdersModal = (props) => {
  const { isOpen, toggle, transaction } = props

  const dispatch = useDispatch()
  const selectOrdersState = (state) => state.orders

  const OrdersProperties = createSelector(selectOrdersState, (orders) => ({
    order_info_res: orders.order_info_res,
  }))

  const { order_info_res } = useSelector(OrdersProperties)

  useEffect(() => {
    if (transaction?.id) {
      dispatch(getOrdersInfo(transaction?.id))
    }
  }, [dispatch, transaction?.id])

  const orderInfo = order_info_res?.success?.order

  return (
    <Modal
      isOpen={isOpen}
      role="dialog"
      autoFocus={true}
      centered={true}
      className="exampleModal"
      tabIndex="-1"
      toggle={toggle}
    >
      <div className="modal-content">
        <ModalHeader toggle={toggle}>Order Details</ModalHeader>
        <ModalBody>
          {order_info_res?.loading ? (
            <div style={{ height: '300px' }}>
              <Spinners />
            </div>
          ) : (
            <>
              <p className="mb-2">
                Order id: <span className="text-primary">#{orderInfo?.id}</span>
              </p>
              <p className="mb-2">
                Type:{' '}
                <span
                  className={`${
                    orderInfo?.type === 'completed'
                      ? 'text-success'
                      : 'text-warning'
                  }`}
                >
                  {orderInfo?.type}
                </span>
              </p>
              <p className="mb-4">
                Billing Name:{' '}
                <span className="text-secondary">{orderInfo?.billingName}</span>
              </p>

              <div className="table-responsive">
                <Table className="table align-middle table-nowrap">
                  <thead>
                    <tr>
                      <th scope="col">Product</th>
                      <th scope="col">Product Name</th>
                      <th scope="col">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">
                        <div>
                          <img
                            src={orderInfo?.product?.image}
                            alt=""
                            className="avatar-sm"
                          />
                        </div>
                      </th>
                      <td>
                        <div>
                          <h5 className="text-truncate font-size-14">
                            {orderInfo?.product?.name}
                          </h5>
                          <p className="text-muted mb-0">
                            ₹ {orderInfo?.variant?.price} x{' '}
                            {orderInfo?.quantity}
                          </p>
                        </div>
                      </td>
                      <td>
                        ₹ {orderInfo?.variant?.price * orderInfo?.quantity}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="2">
                        <h6 className="m-0 text-right">Sub Total:</h6>
                      </td>
                      <td>
                        ₹ {orderInfo?.variant?.price * orderInfo?.quantity}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="2">
                        <h6 className="m-0 text-right">Discount:</h6>
                      </td>
                      <td>
                        - ₹{' '}
                        {parseInt(
                          (orderInfo?.variant?.price *
                            orderInfo?.quantity *
                            orderInfo?.discountPercentage) /
                            100
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="2">
                        <h6 className="m-0 text-right">Shipping:</h6>
                      </td>
                      <td>+ ₹ {orderInfo?.shippingCharge}</td>
                    </tr>
                    <tr>
                      <td colSpan="2">
                        <h6 className="m-0 text-right">Total:</h6>
                      </td>
                      <td>₹ {orderInfo?.shippingCharge + orderInfo?.amount}</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </>
          )}
        </ModalBody>
        <ModalFooter>
          <Button type="button" color="secondary" onClick={toggle}>
            Close
          </Button>
        </ModalFooter>
      </div>
    </Modal>
  )
}

OrdersModal.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
}

export default OrdersModal
