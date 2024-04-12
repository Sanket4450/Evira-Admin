import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Container, Form, Input, Modal, ModalBody, ModalFooter, ModalHeader
} from "reactstrap";
//redux
import { useSelector, useDispatch } from "react-redux";
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

//i18n
import { withTranslation } from "react-i18next";
import BasicTable from "../../components/Common/BasicTable";
import { addPromo, addPromoMessage, deletePromo, deletePromoMessage, getPromoList, updatePromo, updatePromoMessage } from "../../store/home/promo/actions";
import { createSelector } from "reselect";

// Formik validation
import { useFormik } from "formik";
import { promoCodeSchema, promoCodeFullSchema } from '../../schemas'
import Spinners from "../../components/Common/Spinner";
import CustomSpinner from "../../components/Common/CustomSpinner";

import { toast } from 'react-toastify'
import Paginations from '../../components/Common/Pagination'
import DeleteModal from '../../components/Common/Model/DeleteModal'

const Promo = (props) => {
  const [pagination, setPagination] = useState({
    limit: 5,
    page: 1,
  })

  const [modelInfo, setModelInfo] = useState({
    updatePromo: false,
    updatePromoInfo: {},
    deletePromo: false,
    deletePromoInfo: {},
    addPromo: false,
  })
  //meta title
  document.title = 'Promo | Skote - Vite React Admin & Promo Template'
  const dispatch = useDispatch()

  const selectPromoState = (state) => state.promo

  const PromoProperties = createSelector(selectPromoState, (promo) => ({
    promo_list: promo.promo_list,
    loading: promo.loading,
    update_promo: promo.update_promo,
    delete_promo: promo.delete_promo,
    add_promo: promo.add_promo,
    total_record: promo.total_record,
  }))

  const {
    promo_list,
    loading,
    update_promo,
    delete_promo,
    add_promo,
    total_record,
  } = useSelector(PromoProperties)

  useEffect(() => {
    dispatch(getPromoList(pagination))
  }, [dispatch, pagination])

  const refresh = () => {
    dispatch(getPromoList(pagination))
  }

  const column = [
    {
      id: 1,
      label: 'Title',
      value: 'title',
      textAlign: 'center',
    },
    {
      id: 2,
      label: 'Description',
      value: 'description',
      textAlign: 'start',
    },
    {
      id: 3,
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
                  updatePromo: !modelInfo?.updatePromo,
                  updatePromoInfo: rowData,
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
                  deletePromo: !modelInfo?.updatePromo,
                  deletePromoInfo: rowData,
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
    enableReinitialize: true,

    initialValues: {
      title: '',
      description: '',
    },
    validationSchema: promoCodeSchema,
    onSubmit: (values) => {
      let payload = values
      if (values?.title === modelInfo?.updatePromoInfo?.title) {
        delete payload.title
      }
      if (values?.description === modelInfo?.updatePromoInfo?.description) {
        delete payload.description
      }
      dispatch(updatePromo(payload))
    },
  })

  const addPromoValidation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      title: '',
      description: '',
      discountPercentage: '',
      maxUses: '',
      validFrom: '',
      validUntil: '',
    },
    validationSchema: promoCodeFullSchema,
    onSubmit: (values) => {
      dispatch(addPromo(values))
    },
  })

  // This useEffect Use after update promo
  useEffect(() => {
    if (modelInfo?.updatePromo) {
      toast.success(update_promo?.success?.message)
      closeUpdateModel()
      refresh()
    }
  }, [update_promo?.success])

  useEffect(() => {
    if (modelInfo?.addPromo) {
      toast.success(add_promo?.success?.message)
      closeAddModel()
      refresh()
    }
  }, [add_promo?.success])

  useEffect(() => {
    if (modelInfo?.deletePromo) {
      toast.success(delete_promo?.success?.message)
      closeDeleteModel()
      refresh()
    }
  }, [delete_promo?.success])

  useEffect(() => {
    if (modelInfo?.updatePromoInfo) {
      validation.setFieldValue('id', modelInfo?.updatePromoInfo?.id)
      validation.setFieldValue('title', modelInfo?.updatePromoInfo?.title)
      validation.setFieldValue(
        'description',
        modelInfo?.updatePromoInfo?.description
      )
    }
  }, [modelInfo?.updatePromoInfo])

  const closeUpdateModel = () => {
    setModelInfo({
      ...modelInfo,
      updatePromo: !modelInfo?.updatePromo,
    })
    dispatch(
      updatePromoMessage({
        loading: false,
        success: null,
        error: null,
      })
    )
  }

  const closeDeleteModel = () => {
    setModelInfo({
      ...modelInfo,
      deletePromo: !modelInfo?.deletePromo,
    })

    dispatch(
      deletePromoMessage({
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
      addPromo: !modelInfo?.addPromo,
    })

    dispatch(
      addPromoMessage({
        loading: false,
        success: null,
        error: null,
      })
    )
    addPromoValidation.resetForm()
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title={props.t('Promotions')}
            breadcrumbItem={props.t('Promotions')}
          />
          <div className="mb-4 text-end">
            <Button
              color="primary"
              onClick={() => {
                setModelInfo({
                  ...modelInfo,
                  addPromo: !modelInfo?.addPromo,
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
                data={promo_list}
                theadClass="table-light"
              />
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

      {/* --------------Add Model-------------- */}
      <Modal
        isOpen={modelInfo?.addPromo}
        role="dialog"
        autoFocus={true}
        centered
        data-toggle="modal"
        toggle={() => {
          setModelInfo({
            ...modelInfo,
            addPromo: !modelInfo?.addPromo,
          })
        }}
      >
        <div>
          <ModalHeader className="border-bottom-0" toggle={closeAddModel}>
            Add Promotions
          </ModalHeader>
          {add_promo?.error ? (
            <Alert color="danger">{add_promo?.error}</Alert>
          ) : null}
        </div>
        <Form
          className="form-horizontal"
          onSubmit={(e) => {
            e.preventDefault()
            addPromoValidation.handleSubmit()
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
                        placeholder="Enter Name"
                        name="title"
                        onChange={addPromoValidation.handleChange}
                        onBlur={addPromoValidation.handleBlur}
                        value={addPromoValidation.values.title || ''}
                        invalid={
                          addPromoValidation.touched.title &&
                          addPromoValidation.errors.title
                            ? true
                            : false
                        }
                      />
                    </div>
                    <div className="input-group rounded bg-light mt-3">
                      <Input
                        type="number"
                        className="form-control bg-transparent"
                        placeholder="Enter Discount Percentage"
                        name="discountPercentage"
                        max="250"
                        onChange={(e) => {
                          const value = parseInt(e.target.value)
                          if (value <= 100 || !value) {
                            // Validate if the value is less than or equal to 100
                            addPromoValidation.handleChange(e)
                          }
                        }}
                        onBlur={addPromoValidation.handleBlur}
                        value={
                          addPromoValidation.values.discountPercentage || ''
                        }
                        invalid={
                          addPromoValidation.touched.discountPercentage &&
                          addPromoValidation.errors.discountPercentage
                            ? true
                            : false
                        }
                      />
                    </div>
                    <div className="input-group rounded bg-light mt-3">
                      <Input
                        type="number"
                        className="form-control bg-transparent"
                        placeholder="Enter Max User"
                        name="maxUses"
                        onChange={addPromoValidation.handleChange}
                        onBlur={addPromoValidation.handleBlur}
                        value={addPromoValidation.values.maxUses || ''}
                        invalid={
                          addPromoValidation.touched.maxUses &&
                          addPromoValidation.errors.maxUses
                            ? true
                            : false
                        }
                      />
                    </div>
                    <div className="input-group rounded bg-light mt-3">
                      <Input
                        type="date"
                        className="form-control bg-transparent"
                        placeholder="Enter Start Date"
                        name="validFrom"
                        onChange={addPromoValidation.handleChange}
                        onBlur={addPromoValidation.handleBlur}
                        value={addPromoValidation.values.validFrom || ''}
                        invalid={
                          addPromoValidation.touched.validFrom &&
                          addPromoValidation.errors.validFrom
                            ? true
                            : false
                        }
                      />
                      <Input
                        type="date"
                        className="form-control bg-transparent"
                        placeholder="Enter End Date"
                        name="validUntil"
                        onChange={addPromoValidation.handleChange}
                        onBlur={addPromoValidation.handleBlur}
                        value={addPromoValidation.values.validUntil || ''}
                        invalid={
                          addPromoValidation.touched.validUntil &&
                          addPromoValidation.errors.validUntil
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
                        onChange={addPromoValidation.handleChange}
                        onBlur={addPromoValidation.handleBlur}
                        value={addPromoValidation.values.description || ''}
                        invalid={
                          addPromoValidation.touched.description &&
                          addPromoValidation.errors.description
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
                  </div>
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              type="submit"
              color="primary"
              disabled={add_promo?.loading}
              style={{ minWidth: '60px' }}
            >
              {add_promo?.loading ? <CustomSpinner /> : 'Add'}
            </Button>
            <Button type="button" color="secondary" onClick={closeAddModel}>
              Close
            </Button>
          </ModalFooter>
        </Form>
      </Modal>

      {/* --------------Update Model-------------- */}
      <Modal
        isOpen={modelInfo?.updatePromo}
        role="dialog"
        autoFocus={true}
        centered
        data-toggle="modal"
        toggle={() => {
          setModelInfo({
            ...modelInfo,
            updatePromo: !modelInfo?.updatePromo,
          })
        }}
      >
        <div>
          <ModalHeader className="border-bottom-0" toggle={closeUpdateModel}>
            Update Promotions
          </ModalHeader>
          {update_promo?.error ? (
            <Alert color="danger">{update_promo?.error}</Alert>
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
                        placeholder="Enter Name"
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
                  </div>
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              type="submit"
              color="primary"
              disabled={update_promo?.loading}
              style={{ minWidth: '60px' }}
            >
              {update_promo?.loading ? <CustomSpinner /> : 'Update'}
            </Button>
            <Button type="button" color="secondary" onClick={closeUpdateModel}>
              Close
            </Button>
          </ModalFooter>
        </Form>
      </Modal>

      {/* --------------Delete Model-------------- */}
      <DeleteModal
        loading={delete_promo?.loading}
        show={modelInfo?.deletePromo}
        onCloseClick={closeDeleteModel}
        onDeleteClick={() => dispatch(deletePromo(modelInfo?.deletePromoInfo))}
      />
    </React.Fragment>
  )
}

Promo.propTypes = {
  t: PropTypes.any,
  chartsData: PropTypes.any,
  onGetChartsData: PropTypes.func,
};

export default withTranslation()(Promo);
