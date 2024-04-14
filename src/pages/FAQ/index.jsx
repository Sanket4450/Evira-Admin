import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardTitle,
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
  addFaq,
  addFaqMessage,
  deleteFaq,
  deleteFaqMessage,
  getFaqList,
  updateFaq,
  updateFaqMessage,
} from '../../store/home/faq/actions'
import { createSelector } from 'reselect'

// Formik validation
import { useFormik } from 'formik'
import { faqSchema } from '../../schemas'
import Spinners from '../../components/Common/Spinner'
import CustomSpinner from '../../components/Common/CustomSpinner'

import { toast } from 'react-toastify'
import Paginations from '../../components/Common/Pagination'
import DeleteModal from '../../components/Common/Model/DeleteModal'

const FAQ = (props) => {
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 5,
  })

  const [modelInfo, setModelInfo] = useState({
    updateFaq: false,
    updateFaqInfo: {},
    deleteFaq: false,
    deleteFaqInfo: {},
    addFaq: false,
  })

  document.title = 'FAQs | Skote - Vite React Admin & Categories Template'
  const dispatch = useDispatch()

  const selectFaqState = (state) => state.faq

  const FaqProperties = createSelector(selectFaqState, (faq) => ({
    faq_list: faq.faq_list,
    loading: faq.loading,
    update_faq: faq.update_faq,
    delete_faq: faq.delete_faq,
    add_faq: faq.add_faq,
    total_record: faq.total_record,
  }))

  const { faq_list, loading, update_faq, delete_faq, add_faq, total_record } =
    useSelector(FaqProperties)

  useEffect(() => {
    dispatch(getFaqList(pagination))
  }, [dispatch, pagination])

  const refresh = () => {
    dispatch(getFaqList(pagination))
  }

  const column = [
    {
      id: 1,
      label: 'Title',
      value: 'title',
      textAlign: 'start',
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
                  updateFaq: !modelInfo?.updateFaq,
                  updateFaqInfo: rowData,
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
                  deleteFaq: !modelInfo?.updateFaq,
                  deleteFaqInfo: rowData,
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
      id: '',
      title: '',
      description: '',
    },
    validationSchema: faqSchema,
    onSubmit: (values) => {
      let payload = values

      if (values?.title === modelInfo?.updateFaqInfo?.title) {
        delete payload.title
      }

      if (
        !values?.description ||
        values.description === modelInfo?.updateFaqInfo?.description
      ) {
        delete payload.description
      }

      dispatch(updateFaq(values))
    },
  })

  const addFaqValidation = useFormik({
    enableReinitialize: true,

    initialValues: {
      title: '',
      description: '',
    },
    validationSchema: faqSchema,
    onSubmit: (values) => {
      let payload = values

      if (!values?.description) {
        delete payload.description
      }

      dispatch(addFaq(payload))
    },
  })

  // This useEffect Use after update faq
  useEffect(() => {
    if (modelInfo?.updateFaq) {
      toast.success(update_faq?.success?.message)
      closeUpdateModel()
      refresh()
    }
  }, [update_faq?.success])

  useEffect(() => {
    if (modelInfo?.addFaq) {
      toast.success(add_faq?.success?.message)
      closeAddModel()
      refresh()
    }
  }, [add_faq?.success])

  useEffect(() => {
    if (modelInfo?.deleteFaq) {
      toast.success(delete_faq?.success?.message)
      closeDeleteModel()
      refresh()
    }
  }, [delete_faq?.success])

  useEffect(() => {
    if (modelInfo?.updateFaqInfo) {
      validation.setFieldValue('id', modelInfo?.updateFaqInfo?.id)
      validation.setFieldValue('title', modelInfo?.updateFaqInfo?.title)
      validation.setFieldValue(
        'description',
        modelInfo?.updateFaqInfo?.description
      )
    }
  }, [modelInfo?.updateFaqInfo])

  const closeUpdateModel = () => {
    setModelInfo({
      ...modelInfo,
      updateFaq: !modelInfo?.updateFaq,
    })
    dispatch(
      updateFaqMessage({
        loading: false,
        success: null,
        error: null,
      })
    )
  }

  const closeDeleteModel = () => {
    setModelInfo({
      ...modelInfo,
      deleteFaq: !modelInfo?.deleteFaq,
    })

    dispatch(
      deleteFaqMessage({
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
      addFaq: !modelInfo?.addFaq,
    })

    dispatch(
      addFaqMessage({
        loading: false,
        success: null,
        error: null,
      })
    )
    addFaqValidation.resetForm()
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title={props.t('FAQ')}
            breadcrumbItem={props.t('FAQ')}
          />
          <div className="mb-4 text-end">
            <Button
              color="primary"
              onClick={() => {
                setModelInfo({
                  ...modelInfo,
                  addFaq: !modelInfo?.addFaq,
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
                data={faq_list}
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

      <Modal
        isOpen={modelInfo?.addFaq}
        role="dialog"
        autoFocus={true}
        centered
        data-toggle="modal"
        toggle={() => {
          setModelInfo({
            ...modelInfo,
            addFaq: !modelInfo?.addFaq,
          })
        }}
      >
        <div>
          <ModalHeader className="border-bottom-0" toggle={closeAddModel}>
            Add FAQ
          </ModalHeader>
          {add_faq?.error ? (
            <Alert color="danger">{add_faq?.error}</Alert>
          ) : null}
        </div>
        <Form
          className="form-horizontal"
          onSubmit={(e) => {
            e.preventDefault()
            addFaqValidation.handleSubmit()
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
                        onChange={addFaqValidation.handleChange}
                        onBlur={addFaqValidation.handleBlur}
                        value={addFaqValidation.values.title || ''}
                        invalid={
                          addFaqValidation.touched.title &&
                          addFaqValidation.errors.title
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
                        onChange={addFaqValidation.handleChange}
                        onBlur={addFaqValidation.handleBlur}
                        value={addFaqValidation.values.description || ''}
                        invalid={
                          addFaqValidation.touched.description &&
                          addFaqValidation.errors.description
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
              disabled={add_faq?.loading}
              style={{ minWidth: '60px' }}
            >
              {add_faq?.loading ? <CustomSpinner /> : 'Add'}
            </Button>
            <Button type="button" color="secondary" onClick={closeAddModel}>
              Close
            </Button>
          </ModalFooter>
        </Form>
      </Modal>

      {/* --------------Update Model-------------- */}
      <Modal
        isOpen={modelInfo?.updateFaq}
        role="dialog"
        autoFocus={true}
        centered
        data-toggle="modal"
        toggle={() => {
          setModelInfo({
            ...modelInfo,
            updateFaq: !modelInfo?.updateFaq,
          })
        }}
      >
        <div>
          <ModalHeader className="border-bottom-0" toggle={closeUpdateModel}>
            Update FAQ
          </ModalHeader>
          {update_faq?.error ? (
            <Alert color="danger">{update_faq?.error}</Alert>
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
                  </div>
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              type="submit"
              color="primary"
              disabled={update_faq?.loading}
              style={{ minWidth: '60px' }}
            >
              {update_faq?.loading ? <CustomSpinner /> : 'Update'}
            </Button>
            <Button type="button" color="secondary" onClick={closeUpdateModel}>
              Close
            </Button>
          </ModalFooter>
        </Form>
      </Modal>

      {/* --------------Delete Model-------------- */}
      <DeleteModal
        loading={delete_faq?.loading}
        show={modelInfo?.deleteFaq}
        onCloseClick={closeDeleteModel}
        onDeleteClick={() => dispatch(deleteFaq(modelInfo?.deleteFaqInfo))}
      />
    </React.Fragment>
  )
}

FAQ.propTypes = {
  t: PropTypes.any,
  chartsData: PropTypes.any,
  onGetChartsData: PropTypes.func,
}

export default withTranslation()(FAQ)
