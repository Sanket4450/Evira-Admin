import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
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
  Row,
} from 'reactstrap'
//redux
import { useSelector, useDispatch } from 'react-redux'
//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb'

//i18n
import { withTranslation } from 'react-i18next'
import {
  addProduct,
  addProductMessage,
  deleteProduct,
  deleteProductMessage,
  getProductList,
  updateProduct,
  updateProductMessage,
} from '../../store/home/product/actions'
import { createSelector } from 'reselect'

// Formik validation
import { useFormik } from 'formik'
import { productSchema, promoCodeFullSchema } from '../../schemas'
import CustomSpinner from '../../components/Common/CustomSpinner'

import { toast } from 'react-toastify'

import DeleteModal from '../../components/Common/Model/DeleteModal'

import ProductsFilters from '../../components/Products/ProductsList/Filter/productFilter'
import ProductList from '../../components/Products/ProductsList/List/productList'

const Product = (props) => {
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 6,
    category: null,
    keyword: null,
    min_price: null,
    max_price: null,
    rating: null,
  })

  const [modelInfo, setModelInfo] = useState({
    updateProduct: false,
    updateProductInfo: {},
    deleteProduct: false,
    deleteProductInfo: {},
    addProduct: false,
  })

  document.title = 'Product | Skote - Vite React Admin & Product Template'
  const dispatch = useDispatch()

  const selectProductState = (state) => state.product

  const ProductProperties = createSelector(selectProductState, (product) => ({
    product_list: product.product_list,
    loading: product.loading,
    update_product: product.update_product,
    delete_product: product.delete_product,
    add_product: product.add_product,
    total_record: product.total_record,
  }))

  const {
    product_list,
    loading,
    update_product,
    delete_product,
    add_product,
    total_record,
  } = useSelector(ProductProperties)

  useEffect(() => {
    dispatch(getProductList(pagination))
  }, [dispatch, pagination])

  const refresh = () => {
    dispatch(getProductList(pagination))
  }

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      title: '',
      description: '',
    },
    validationSchema: productSchema,
    onSubmit: (values) => {
      let payload = values
      if (values?.title === modelInfo?.updateProductInfo?.title) {
        delete payload.title
      }
      if (values?.description === modelInfo?.updateProductInfo?.description) {
        delete payload.description
      }
      dispatch(updateProduct(values))
    },
  })

  const addProductValidation = useFormik({
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
      dispatch(addProduct(values))
    },
  })

  useEffect(() => {
    if (modelInfo?.updateProduct) {
      toast.success(update_product?.success?.message)
      closeUpdateModel()
      refresh()
    }
  }, [update_product?.success])

  useEffect(() => {
    if (modelInfo?.addProduct) {
      toast.success(add_product?.success?.message)
      closeAddModel()
      refresh()
    }
  }, [add_product?.success])

  useEffect(() => {
    if (modelInfo?.deleteProduct) {
      toast.success(delete_product?.success?.message)
      closeDeleteModel()
      refresh()
    }
  }, [delete_product?.success])

  useEffect(() => {
    if (modelInfo?.updateProductInfo) {
      validation.setFieldValue('title', modelInfo?.updateProductInfo?.title)
      validation.setFieldValue(
        'description',
        modelInfo?.updateProductInfo?.description
      )
    }
  }, [modelInfo?.updateProductInfo])

  const closeUpdateModel = () => {
    setModelInfo({
      ...modelInfo,
      updateProduct: !modelInfo?.updateProduct,
    })
    dispatch(
      updateProductMessage({
        loading: false,
        success: null,
        error: null,
      })
    )
  }

  const closeDeleteModel = () => {
    setModelInfo({
      ...modelInfo,
      deleteProduct: !modelInfo?.deleteProduct,
    })

    dispatch(
      deleteProductMessage({
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
      addProduct: !modelInfo?.addProduct,
    })

    dispatch(
      addProductMessage({
        loading: false,
        success: null,
        error: null,
      })
    )
    addProductValidation.resetForm()
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title={props.t('Product')}
            breadcrumbItem={props.t('Product')}
          />

          <Row>
            <ProductsFilters
              pagination={pagination}
              setPagination={setPagination}
            />
            <ProductList
              products={product_list}
              isLoading={loading}
              pagination={pagination}
              setPagination={setPagination}
              total_record={total_record}
              refresh={refresh}
            />
          </Row>
        </Container>
      </div>

      {/* --------------Add Model-------------- */}
      <Modal
        isOpen={modelInfo?.addProduct}
        role="dialog"
        autoFocus={true}
        centered
        data-toggle="modal"
        toggle={() => {
          setModelInfo({
            ...modelInfo,
            addProduct: !modelInfo?.addProduct,
          })
        }}
      >
        <div>
          <ModalHeader className="border-bottom-0" toggle={closeAddModel}>
            Add Product
          </ModalHeader>
          {add_product?.error ? (
            <Alert color="danger">{add_product?.error}</Alert>
          ) : null}
        </div>
        <Form
          className="form-horizontal"
          onSubmit={(e) => {
            e.preventDefault()
            addProductValidation.handleSubmit()
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
                        onChange={addProductValidation.handleChange}
                        onBlur={addProductValidation.handleBlur}
                        value={addProductValidation.values.title || ''}
                        invalid={
                          addProductValidation.touched.title &&
                          addProductValidation.errors.title
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
                            addProductValidation.handleChange(e)
                          }
                        }}
                        onBlur={addProductValidation.handleBlur}
                        value={
                          addProductValidation.values.discountPercentage || ''
                        }
                        invalid={
                          addProductValidation.touched.discountPercentage &&
                          addProductValidation.errors.discountPercentage
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
                        onChange={addProductValidation.handleChange}
                        onBlur={addProductValidation.handleBlur}
                        value={addProductValidation.values.maxUses || ''}
                        invalid={
                          addProductValidation.touched.maxUses &&
                          addProductValidation.errors.maxUses
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
                        onChange={addProductValidation.handleChange}
                        onBlur={addProductValidation.handleBlur}
                        value={addProductValidation.values.validFrom || ''}
                        invalid={
                          addProductValidation.touched.validFrom &&
                          addProductValidation.errors.validFrom
                            ? true
                            : false
                        }
                      />
                      <Input
                        type="date"
                        className="form-control bg-transparent"
                        placeholder="Enter End Date"
                        name="validUntil"
                        onChange={addProductValidation.handleChange}
                        onBlur={addProductValidation.handleBlur}
                        value={addProductValidation.values.validUntil || ''}
                        invalid={
                          addProductValidation.touched.validUntil &&
                          addProductValidation.errors.validUntil
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
                        onChange={addProductValidation.handleChange}
                        onBlur={addProductValidation.handleBlur}
                        value={addProductValidation.values.description || ''}
                        invalid={
                          addProductValidation.touched.description &&
                          addProductValidation.errors.description
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
              disabled={add_product?.loading}
              style={{ minWidth: '60px' }}
            >
              {add_product?.loading ? <CustomSpinner /> : 'Add'}
            </Button>
            <Button type="button" color="secondary" onClick={closeAddModel}>
              Close
            </Button>
          </ModalFooter>
        </Form>
      </Modal>

      {/* --------------Update Model-------------- */}
      <Modal
        isOpen={modelInfo?.updateProduct}
        role="dialog"
        autoFocus={true}
        centered
        data-toggle="modal"
        toggle={() => {
          setModelInfo({
            ...modelInfo,
            updateProduct: !modelInfo?.updateProduct,
          })
        }}
      >
        <div>
          <ModalHeader className="border-bottom-0" toggle={closeUpdateModel}>
            Update Product
          </ModalHeader>
          {update_product?.error ? (
            <Alert color="danger">{update_product?.error}</Alert>
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
              disabled={update_product?.loading}
              style={{ minWidth: '60px' }}
            >
              {update_product?.loading ? <CustomSpinner /> : 'Update'}
            </Button>
            <Button type="button" color="secondary" onClick={closeUpdateModel}>
              Close
            </Button>
          </ModalFooter>
        </Form>
      </Modal>

      {/* --------------Delete Model-------------- */}
      <DeleteModal
        loading={delete_product?.loading}
        show={modelInfo?.deleteProduct}
        onCloseClick={closeDeleteModel}
        onDeleteClick={() =>
          dispatch(deleteProduct(modelInfo?.deleteProductInfo))
        }
      />
    </React.Fragment>
  )
}

Product.propTypes = {
  t: PropTypes.any,
  chartsData: PropTypes.any,
  onGetChartsData: PropTypes.func,
}

export default withTranslation()(Product)
