import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Container,
  Form,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'reactstrap'
//redux
import { useSelector, useDispatch } from 'react-redux'

//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb'

//i18n
import { withTranslation } from 'react-i18next'
import BasicTable from '../../components/Common/BasicTable'
import {
  addShipping,
  addShippingMessage,
  deleteShipping,
  deleteShippingMessage,
  getShippingList,
  updateShipping,
  updateShippingMessage,
} from '../../store/home/shipping/actions'
import { createSelector } from 'reselect'

// Formik validation
import { useFormik } from 'formik'
import { shippingTypeSchema } from '../../schemas'
import Spinners from '../../components/Common/Spinner'
import CustomSpinner from '../../components/Common/CustomSpinner'

import { toast } from 'react-toastify'
import DeleteModal from '../../components/Common/Model/DeleteModal'

const Shipping = (props) => {
  const [modelInfo, setModelInfo] = useState({
    updateShipping: false,
    updateShippingInfo: {},
    deleteShipping: false,
    deleteShippingInfo: {},
    addShipping: false,
  })
  //meta title
  document.title = 'Shipping | Evira - Admin & Dashboard'
  const dispatch = useDispatch()

  const selectShippingState = (state) => state.shipping

  const ShippingProperties = createSelector(
    selectShippingState,
    (shipping) => ({
      shipping_list: shipping.shipping_list,
      loading: shipping.loading,
      update_shipping: shipping.update_shipping,
      delete_shipping: shipping.delete_shipping,
      add_shipping: shipping.add_shipping,
    })
  )

  const {
    shipping_list,
    loading,
    update_shipping,
    delete_shipping,
    add_shipping,
  } = useSelector(ShippingProperties)

  useEffect(() => {
    dispatch(getShippingList())
  }, [dispatch])

  const refresh = () => {
    dispatch(getShippingList())
  }

  const column = [
    {
      id: 1,
      label: 'title',
      value: 'title',
      textAlign: 'center',
    },
    {
      id: 2,
      label: 'description',
      value: 'description',
      textAlign: 'start',
    },
    {
      id: 3,
      label: 'charge',
      value: 'charge',
      textAlign: 'center',
    },
    {
      id: 4,
      label: 'Action',
      value: 'Action',
      textAlign: 'center',
      render: (rowData) => {
        return (
          <div className="d-flex align-items-center justify-content-center">
            <div
              onClick={() => {
                setModelInfo({
                  ...modelInfo,
                  updateShipping: !modelInfo?.updateShipping,
                  updateShippingInfo: rowData,
                })
              }}
              style={{ cursor: 'pointer', width: '50px' }}
            >
              <i className="mdi mdi-pencil font-size-20 text-success" />
            </div>
            <div
              onClick={() => {
                setModelInfo({
                  ...modelInfo,
                  deleteShipping: !modelInfo?.updateShipping,
                  deleteShippingInfo: rowData,
                })
              }}
              style={{ cursor: 'pointer', width: '50px' }}
            >
              <i className="mdi mdi-delete font-size-20 text-danger" />
            </div>
          </div>
        )
      },
    },
  ]

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      id: '',
      title: '',
      description: '',
      charge: '',
    },
    validationSchema: shippingTypeSchema,
    onSubmit: (values) => {
      let payload = values
      if (values?.title === modelInfo?.updateShippingInfo?.title) {
        delete payload.title
      }
      if (values?.description === modelInfo?.updateShippingInfo?.description) {
        delete payload.description
      }
      if (values?.charge === modelInfo?.updateShippingInfo?.charge) {
        delete payload.charge
      }
      dispatch(updateShipping(values))
    },
  })

  const addShippingValidation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      title: '',
      description: '',
      charge: '',
    },
    validationSchema: shippingTypeSchema,
    onSubmit: (values) => {
      dispatch(addShipping(values))
    },
  })

  // This useEffect Use after update shipping
  useEffect(() => {
    if (modelInfo?.updateShipping) {
      toast.success(update_shipping?.success)
      closeUpdateModel()
      refresh()
    }
  }, [update_shipping?.success])

  useEffect(() => {
    if (modelInfo?.addShipping) {
      toast.success(add_shipping?.success)
      closeAddModel()
      refresh()
    }
  }, [add_shipping?.success])

  useEffect(() => {
    if (modelInfo?.deleteShipping) {
      toast.success(delete_shipping?.success)
      closeDeleteModel()
      refresh()
    }
  }, [delete_shipping?.success])

  useEffect(() => {
    if (modelInfo?.updateShippingInfo) {
      validation.setFieldValue('id', modelInfo?.updateShippingInfo?.id)
      validation.setFieldValue('title', modelInfo?.updateShippingInfo?.title)
      validation.setFieldValue(
        'description',
        modelInfo?.updateShippingInfo?.description
      )
      validation.setFieldValue('charge', modelInfo?.updateShippingInfo?.charge)
    }
  }, [modelInfo?.updateShippingInfo])

  const closeUpdateModel = () => {
    setModelInfo({
      ...modelInfo,
      updateShipping: !modelInfo?.updateShipping,
    })
    dispatch(
      updateShippingMessage({
        loading: false,
        success: null,
        error: null,
      })
    )
  }

  const closeDeleteModel = () => {
    setModelInfo({
      ...modelInfo,
      deleteShipping: !modelInfo?.deleteShipping,
    })

    dispatch(
      deleteShippingMessage({
        loading: false,
        success: null,
        error: null,
      })
    )
    validation.resetForm()
  }

  const closeAddModel = () => {
    setModelInfo({
      ...modelInfo,
      addShipping: !modelInfo?.addShipping,
    })

    dispatch(
      addShippingMessage({
        loading: false,
        success: null,
        error: null,
      })
    )
    addShippingValidation.resetForm()
    validation.resetForm()
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title={props.t('Shipping')}
            breadcrumbItem={props.t('Shipping')}
          />
          <div className="mb-4 text-end">
            <Button
              color="primary"
              onClick={() => {
                setModelInfo({
                  ...modelInfo,
                  addShipping: !modelInfo?.addShipping,
                })
              }}
            >
              Add New
            </Button>
          </div>
          {loading ? (
            <>
              <Spinners />
            </>
          ) : (
            <>
              <BasicTable
                column={column}
                data={shipping_list}
                theadClass="table-light"
              />
            </>
          )}
        </Container>
      </div>

      {/* --------------Add Model-------------- */}
      <Modal
        isOpen={modelInfo?.addShipping}
        role="dialog"
        autoFocus={true}
        centered
        data-toggle="modal"
        toggle={() => {
          setModelInfo({
            ...modelInfo,
            addShipping: !modelInfo?.addShipping,
          })
        }}
      >
        <div>
          <ModalHeader className="border-bottom-0" toggle={closeAddModel}>
            Add Shipping
          </ModalHeader>
          {add_shipping?.error ? (
            <Alert color="danger">{add_shipping?.error}</Alert>
          ) : null}
        </div>
        <Form
          className="form-horizontal"
          onSubmit={(e) => {
            e.preventDefault()
            addShippingValidation.handleSubmit()
            return false
          }}
        >
          <ModalBody>
            <div className="modal-body">
              <div className="text-center mb-4">
                <div className="row justify-content-center">
                  <div className="col-xl-10">
                    <div className="input-group rounded bg-light">
                      <Input
                        type="text"
                        className="form-control bg-transparent"
                        placeholder="Enter Title"
                        name="title"
                        onChange={addShippingValidation.handleChange}
                        onBlur={addShippingValidation.handleBlur}
                        value={addShippingValidation.values.title || ''}
                        invalid={
                          addShippingValidation.touched.title &&
                          addShippingValidation.errors.title
                            ? true
                            : false
                        }
                      />
                    </div>
                    <div className="input-group rounded bg-light mt-3">
                      <Input
                        type="textarea"
                        className="form-control bg-transparent "
                        placeholder="Enter Description"
                        name="description"
                        onChange={addShippingValidation.handleChange}
                        onBlur={addShippingValidation.handleBlur}
                        value={addShippingValidation.values.description || ''}
                        invalid={
                          addShippingValidation.touched.description &&
                          addShippingValidation.errors.description
                            ? true
                            : false
                        }
                      />
                      {/* {validation.touched.description && validation.errors.description ? (
                        <FormFeedback type="invalid">
                          {validation.errors.description}
                        </FormFeedback>
                      ) : null} */}
                    </div>
                    <div className="input-group rounded bg-light mt-3">
                      <Input
                        type="number"
                        className="form-control bg-transparent "
                        placeholder="Enter Charge"
                        name="charge"
                        onChange={addShippingValidation.handleChange}
                        onBlur={addShippingValidation.handleBlur}
                        value={addShippingValidation.values.charge || ''}
                        invalid={
                          addShippingValidation.touched.charge &&
                          addShippingValidation.errors.charge
                            ? true
                            : false
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              type="submit"
              color="primary"
              disabled={add_shipping?.loading}
              style={{ minWidth: '60px' }}
            >
              {add_shipping?.loading ? <CustomSpinner /> : 'Add'}
            </Button>
            <Button type="button" color="secondary" onClick={closeAddModel}>
              Close
            </Button>
          </ModalFooter>
        </Form>
      </Modal>

      {/* --------------Update Model-------------- */}
      <Modal
        isOpen={modelInfo?.updateShipping}
        role="dialog"
        autoFocus={true}
        centered
        data-toggle="modal"
        toggle={() => {
          setModelInfo({
            ...modelInfo,
            updateShipping: !modelInfo?.updateShipping,
          })
        }}
      >
        <div>
          <ModalHeader className="border-bottom-0" toggle={closeUpdateModel}>
            Update Shipping
          </ModalHeader>
          {update_shipping?.error ? (
            <Alert color="danger">{update_shipping?.error}</Alert>
          ) : null}
        </div>
        <Form
          className="form-horizontal"
          onSubmit={(e) => {
            e.preventDefault()
            validation.handleSubmit()
            return false
          }}
        >
          <ModalBody>
            <div className="modal-body">
              <div className="text-center mb-4">
                <div className="row justify-content-center">
                  <div className="col-xl-10">
                    <div className="input-group rounded bg-light">
                      <Input
                        type="text"
                        className="form-control bg-transparent"
                        placeholder="Enter Title"
                        name="title"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.title || ''}
                        invalid={
                          validation.touched.title && validation.errors.title
                            ? true
                            : false
                        }
                      />
                    </div>
                    <div className="input-group rounded bg-light mt-3">
                      <Input
                        type="textarea"
                        className="form-control bg-transparent "
                        placeholder="Enter Description"
                        name="description"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.description || ''}
                        invalid={
                          validation.touched.description &&
                          validation.errors.description
                            ? true
                            : false
                        }
                      />
                    </div>
                    <div className="input-group rounded bg-light mt-3">
                      <Input
                        type="number"
                        className="form-control bg-transparent "
                        placeholder="Enter Charge"
                        name="charge"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.charge || ''}
                        invalid={
                          validation.touched.charge && validation.errors.charge
                            ? true
                            : false
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              type="submit"
              color="primary"
              disabled={update_shipping?.loading}
              style={{ minWidth: '60px' }}
            >
              {update_shipping?.loading ? <CustomSpinner /> : 'Update'}
            </Button>
            <Button type="button" color="secondary" onClick={closeUpdateModel}>
              Close
            </Button>
          </ModalFooter>
        </Form>
      </Modal>

      {/* --------------Delete Model-------------- */}
      <DeleteModal
        loading={delete_shipping?.loading}
        show={modelInfo?.deleteShipping}
        onCloseClick={closeDeleteModel}
        onDeleteClick={() =>
          dispatch(deleteShipping(modelInfo?.deleteShippingInfo))
        }
      />
    </React.Fragment>
  )
}

Shipping.propTypes = {
  t: PropTypes.any,
  chartsData: PropTypes.any,
  onGetChartsData: PropTypes.func,
};

export default withTranslation()(Shipping);
