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
import { productSchema } from '../../schemas'
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

  document.title = 'Product | Evira - Admin & Dashboard'
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
    validationSchema: productSchema,
    onSubmit: (values) => {
      dispatch(addProduct(values))
    },
  })

  useEffect(() => {
    if (modelInfo?.updateProduct) {
      toast.success(update_product?.success)
      closeUpdateModel()
      refresh()
    }
  }, [update_product?.success])

  useEffect(() => {
    if (modelInfo?.addProduct) {
      toast.success(add_product?.success)
      closeAddModel()
      refresh()
    }
  }, [add_product?.success])

  useEffect(() => {
    if (modelInfo?.deleteProduct) {
      toast.success(delete_product?.success)
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

      
    </React.Fragment>
  )
}

Product.propTypes = {
  t: PropTypes.any,
  chartsData: PropTypes.any,
  onGetChartsData: PropTypes.func,
}

export default withTranslation()(Product)
