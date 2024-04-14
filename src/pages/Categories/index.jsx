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
import Dropzone from 'react-dropzone'
//redux
import { useSelector, useDispatch } from 'react-redux'

//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb'

//i18n
import { withTranslation } from 'react-i18next'
import BasicTable from '../../components/Common/BasicTable'
import {
  addCategories,
  addCategoriesMessage,
  deleteCategories,
  deleteCategoriesMessage,
  getCategoriesList,
  updateCategories,
  updateCategoriesMessage,
} from '../../store/home/categories/actions'
import { createSelector } from 'reselect'

// Formik validation
import { useFormik } from 'formik'
import { categorySchema } from '../../schemas'
import Spinners from '../../components/Common/Spinner'
import CustomSpinner from '../../components/Common/CustomSpinner'

import DummyImage from '../../assets/images/dummy-image.jpeg'
import { toast } from 'react-toastify'
import Paginations from '../../components/Common/Pagination'
import DeleteModal from '../../components/Common/Model/DeleteModal'
import { uploadFile } from '../../api'

const Categories = (props) => {
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 5,
  })

  const [selectedFile, setSelectedFile] = useState({})
  const [iconUrl, seticonUrl] = useState(null)

  const [modelInfo, setModelInfo] = useState({
    updateCategories: false,
    updateCategoriesInfo: {},
    deleteCategories: false,
    deleteCategoriesInfo: {},
    addCategories: false,
  })
  //meta title
  document.title = 'Categories | Skote - Vite React Admin & Categories Template'
  const dispatch = useDispatch()

  const selectCategoriesState = (state) => state.categories

  const CategoriesProperties = createSelector(
    selectCategoriesState,
    (categories) => ({
      categories_list: categories.categories_list,
      loading: categories.loading,
      update_categories: categories.update_categories,
      delete_categories: categories.delete_categories,
      add_categories: categories.add_categories,
      total_record: categories.total_record,
    })
  )

  const {
    categories_list,
    loading,
    update_categories,
    delete_categories,
    add_categories,
    total_record,
  } = useSelector(CategoriesProperties)

  useEffect(() => {
    dispatch(getCategoriesList(pagination))
  }, [dispatch, pagination])

  const refresh = () => {
    dispatch(getCategoriesList(pagination))
  }

  async function handleAcceptedFiles(file) {
    try {
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })

      const filePreview = await fetch(file.preview)
      const blob = await filePreview.blob()

      const generatedFile = new File([blob], file.name, {
        type: blob.type,
      })

      const data = {
        type: 'category',
        file: generatedFile,
      }

      const icon = await uploadFile(data)

      setSelectedFile(file)
      seticonUrl(icon.url)
    } catch (error) {
      setSelectedFile({})
    }
  }

  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
  }

  const column = [
    {
      id: 1,
      label: 'Icon',
      value: 'icon',
      render: (rowData) => {
        return rowData.icon ? (
          <img src={rowData.icon} alt="" width={'50px'} />
        ) : (
          <img src={DummyImage} alt="" width={'50px'} />
        )
      },
    },
    {
      id: 2,
      label: 'Name',
      value: 'name',
      textAlign: 'center',
    },
    {
      id: 3,
      label: 'Description',
      value: 'description',
      textAlign: 'start',
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
                  updateCategories: !modelInfo?.updateCategories,
                  updateCategoriesInfo: rowData,
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
                  deleteCategories: !modelInfo?.updateCategories,
                  deleteCategoriesInfo: rowData,
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
      name: '',
      description: '',
    },
    validationSchema: categorySchema,
    onSubmit: (values) => {
      if (iconUrl) {
        values.icon = iconUrl
      }

      let payload = values

      if (
        values?.icon &&
        values.icon === modelInfo?.updateCategoriesInfo?.icon
      ) {
        delete payload.icon
      }

      if (values?.name === modelInfo?.updateCategoriesInfo?.name) {
        delete payload.name
      }

      if (
        !values?.description ||
        values.description === modelInfo?.updateCategoriesInfo?.description
      ) {
        delete payload.description
      }

      dispatch(updateCategories(payload))
    },
  })

  const addCategoriesValidation = useFormik({
    enableReinitialize: true,

    initialValues: {
      name: '',
      description: '',
    },
    validationSchema: categorySchema,
    onSubmit: (values) => {
      if (iconUrl) {
        values.icon = iconUrl
      }

      let payload = values

      if (!values?.description) {
        delete payload.description
      }

      dispatch(addCategories(payload))
    },
  })

  // This useEffect Use after update categories
  useEffect(() => {
    if (modelInfo?.updateCategories) {
      toast.success(update_categories?.success?.message)
      closeUpdateModel()
      refresh()
    }
  }, [update_categories?.success])

  useEffect(() => {
    if (modelInfo?.addCategories) {
      toast.success(add_categories?.success?.message)
      closeAddModel()
      refresh()
    }
  }, [add_categories?.success])

  useEffect(() => {
    if (modelInfo?.deleteCategories) {
      toast.success(delete_categories?.success?.message)
      closeDeleteModel()
      refresh()
    }
  }, [delete_categories?.success])

  useEffect(() => {
    if (modelInfo?.updateCategoriesInfo) {
      validation.setFieldValue('id', modelInfo?.updateCategoriesInfo?.id)
      validation.setFieldValue('name', modelInfo?.updateCategoriesInfo?.name)
      validation.setFieldValue(
        'description',
        modelInfo?.updateCategoriesInfo?.description
      )
    }
  }, [modelInfo?.updateCategoriesInfo])

  const closeUpdateModel = () => {
    setModelInfo({
      ...modelInfo,
      updateCategories: !modelInfo?.updateCategories,
    })
    dispatch(
      updateCategoriesMessage({
        loading: false,
        success: null,
        error: null,
      })
    )
  }

  const closeDeleteModel = () => {
    setModelInfo({
      ...modelInfo,
      deleteCategories: !modelInfo?.deleteCategories,
    })

    dispatch(
      deleteCategoriesMessage({
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
      addCategories: !modelInfo?.addCategories,
    })

    dispatch(
      addCategoriesMessage({
        loading: false,
        success: null,
        error: null,
      })
    )
    addCategoriesValidation.resetForm()
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title={props.t('Categories')}
            breadcrumbItem={props.t('Categories')}
          />
          <div className="mb-4 text-end">
            <Button
              color="primary"
              onClick={() => {
                setModelInfo({
                  ...modelInfo,
                  addCategories: !modelInfo?.addCategories,
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
                data={categories_list}
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
        isOpen={modelInfo?.addCategories}
        role="dialog"
        autoFocus={true}
        centered
        data-toggle="modal"
        toggle={() => {
          setModelInfo({
            ...modelInfo,
            addCategories: !modelInfo?.addCategories,
          })
        }}
      >
        <div>
          <ModalHeader className="border-bottom-0" toggle={closeAddModel}>
            Add Categories
          </ModalHeader>
          {add_categories?.error ? (
            <Alert color="danger">{add_categories?.error}</Alert>
          ) : null}
        </div>
        <Form
          className="form-horizontal"
          onSubmit={(e) => {
            e.preventDefault()
            addCategoriesValidation.handleSubmit()
            return false
          }}
        >
          <ModalBody>
            <Card>
              <CardBody>
                <CardTitle className="mb-3">Category Icon</CardTitle>
                <Form>
                  <Dropzone
                    onDrop={(acceptedFiles) => {
                      if (acceptedFiles.length === 1) {
                        handleAcceptedFiles(acceptedFiles[0])
                      } else {
                        alert('Only one icon image can be uploaded.')
                      }
                    }}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <div className="dropzone">
                        <div
                          className="dz-message needsclick"
                          {...getRootProps()}
                        >
                          <input {...getInputProps()} />
                          <div className="dz-message needsclick">
                            <div className="mb-3">
                              <i className="display-4 text-muted bx bxs-cloud-upload" />
                            </div>
                            <h4>Drop file here or click to upload.</h4>
                          </div>
                        </div>
                      </div>
                    )}
                  </Dropzone>
                  {Object.keys(selectedFile).length > 0 && (
                    <ul className="list-unstyled mb-0" id="file-previews">
                      <li className="mt-2 dz-image-preview">
                        <div className="border rounded">
                          <div className="d-flex flex-wrap gap-2 p-2">
                            <div className="flex-shrink-0 me-3">
                              <div className="avatar-sm bg-light rounded p-2">
                                <img
                                  data-dz-thumbnail=""
                                  className="img-fluid rounded d-block"
                                  src={selectedFile.preview}
                                  alt={selectedFile.name}
                                />
                              </div>
                            </div>
                            <div className="flex-grow-1">
                              <div className="pt-1">
                                <h5 className="fs-md mb-1" data-dz-name>
                                  {selectedFile.path}
                                </h5>
                                <strong
                                  className="error text-danger"
                                  data-dz-errormessage
                                ></strong>
                              </div>
                            </div>
                            <div className="flex-shrink-0 ms-3">
                              <Button
                                color="danger"
                                size="sm"
                                onClick={() => setSelectedFile({})}
                              >
                                Delete
                              </Button>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  )}
                </Form>
              </CardBody>
            </Card>
            <div className="modal-body">
              <div className="text-center mb-4">
                <div className="row justify-content-center">
                  <div className="col-xl-10">
                    <div className="input-group rounded bg-light">
                      <Input
                        type="text"
                        className="form-control bg-transparent"
                        placeholder="Enter Name"
                        name="name"
                        onChange={addCategoriesValidation.handleChange}
                        onBlur={addCategoriesValidation.handleBlur}
                        value={addCategoriesValidation.values.name || ''}
                        invalid={
                          addCategoriesValidation.touched.name &&
                          addCategoriesValidation.errors.name
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
                        onChange={addCategoriesValidation.handleChange}
                        onBlur={addCategoriesValidation.handleBlur}
                        value={addCategoriesValidation.values.description || ''}
                        invalid={
                          addCategoriesValidation.touched.description &&
                          addCategoriesValidation.errors.description
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
              disabled={add_categories?.loading}
              style={{ minWidth: '60px' }}
            >
              {add_categories?.loading ? <CustomSpinner /> : 'Add'}
            </Button>
            <Button type="button" color="secondary" onClick={closeAddModel}>
              Close
            </Button>
          </ModalFooter>
        </Form>
      </Modal>

      {/* --------------Update Model-------------- */}
      <Modal
        isOpen={modelInfo?.updateCategories}
        role="dialog"
        autoFocus={true}
        centered
        data-toggle="modal"
        toggle={() => {
          setModelInfo({
            ...modelInfo,
            updateCategories: !modelInfo?.updateCategories,
          })
        }}
      >
        <div>
          <ModalHeader className="border-bottom-0" toggle={closeUpdateModel}>
            Update Categories
          </ModalHeader>
          {update_categories?.error ? (
            <Alert color="danger">{update_categories?.error}</Alert>
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
            <Card>
              <CardBody>
                <CardTitle className="mb-3">Category Image</CardTitle>
                <Form>
                  <Dropzone
                    onDrop={(acceptedFiles) => {
                      if (acceptedFiles.length === 1) {
                        handleAcceptedFiles(acceptedFiles[0])
                      } else {
                        alert('Only one image can be uploaded.')
                      }
                    }}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <div className="dropzone">
                        <div
                          className="dz-message needsclick"
                          {...getRootProps()}
                        >
                          <input {...getInputProps()} />
                          <div className="dz-message needsclick">
                            <div className="mb-3">
                              <i className="display-4 text-muted bx bxs-cloud-upload" />
                            </div>
                            <h4>Drop file here or click to upload.</h4>
                          </div>
                        </div>
                      </div>
                    )}
                  </Dropzone>
                  {Object.keys(selectedFile).length > 0 && (
                    <ul className="list-unstyled mb-0" id="file-previews">
                      <li className="mt-2 dz-image-preview">
                        <div className="border rounded">
                          <div className="d-flex flex-wrap gap-2 p-2">
                            <div className="flex-shrink-0 me-3">
                              <div className="avatar-sm bg-light rounded p-2">
                                <img
                                  data-dz-thumbnail=""
                                  className="img-fluid rounded d-block"
                                  src={selectedFile.preview}
                                  alt={selectedFile.name}
                                />
                              </div>
                            </div>
                            <div className="flex-grow-1">
                              <div className="pt-1">
                                <h5 className="fs-md mb-1" data-dz-name>
                                  {selectedFile.path}
                                </h5>
                                <strong
                                  className="error text-danger"
                                  data-dz-errormessage
                                ></strong>
                              </div>
                            </div>
                            <div className="flex-shrink-0 ms-3">
                              <Button
                                color="danger"
                                size="sm"
                                onClick={() => setSelectedFile({})}
                              >
                                Delete
                              </Button>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  )}
                </Form>
              </CardBody>
            </Card>
            <div className="modal-body">
              <div className="text-center mb-4">
                <div className="row justify-content-center">
                  <div className="col-xl-10">
                    <div className="input-group rounded bg-light">
                      <Input
                        type="text"
                        className="form-control bg-transparent"
                        placeholder="Enter Name"
                        name="name"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.name || ''}
                        invalid={
                          validation.touched.name && validation.errors.name
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
              disabled={update_categories?.loading}
              style={{ minWidth: '60px' }}
            >
              {update_categories?.loading ? <CustomSpinner /> : 'Update'}
            </Button>
            <Button type="button" color="secondary" onClick={closeUpdateModel}>
              Close
            </Button>
          </ModalFooter>
        </Form>
      </Modal>

      {/* --------------Delete Model-------------- */}
      <DeleteModal
        loading={delete_categories?.loading}
        show={modelInfo?.deleteCategories}
        onCloseClick={closeDeleteModel}
        onDeleteClick={() =>
          dispatch(deleteCategories(modelInfo?.deleteCategoriesInfo))
        }
      />
    </React.Fragment>
  )
}

Categories.propTypes = {
  t: PropTypes.any,
  chartsData: PropTypes.any,
  onGetChartsData: PropTypes.func,
}

export default withTranslation()(Categories)
