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

  const product_info = order_info_res?.success?.order?.[0]

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
                Product id:{' '}
                <span className="text-primary">#{product_info?.id}</span>
              </p>
              <p className="mb-4">
                Billing Name:{' '}
                <span className="text-primary">
                  {product_info?.user?.fullName}
                </span>
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
                            src={product_info?.product?.image}
                            alt=""
                            className="avatar-sm"
                          />
                        </div>
                      </th>
                      <td>
                        <div>
                          <h5 className="text-truncate font-size-14">
                            {product_info?.product?.name}
                          </h5>
                          <p className="text-muted mb-0">
                            ₹ {product_info?.product?.price} x{' '}
                            {product_info?.quantity}
                          </p>
                        </div>
                      </td>
                      <td>₹ {product_info?.amount}</td>
                    </tr>
                    <tr>
                      <td colSpan="2">
                        <h6 className="m-0 text-right">Sub Total:</h6>
                      </td>
                      <td>₹ {product_info?.amount}</td>
                    </tr>
                    <tr>
                      <td colSpan="2">
                        <h6 className="m-0 text-right">Shipping:</h6>
                      </td>
                      <td>₹ {product_info?.shippingType?.charge}</td>
                    </tr>
                    <tr>
                      <td colSpan="2">
                        <h6 className="m-0 text-right">Total:</h6>
                      </td>
                      <td>
                        ₹{' '}
                        {product_info?.shippingType?.charge +
                          product_info?.amount}
                      </td>
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
