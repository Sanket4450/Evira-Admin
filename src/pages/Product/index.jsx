import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import {
  Container,
  Row,
} from 'reactstrap'
//redux
import { useSelector, useDispatch } from 'react-redux'
//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb'

//i18n
import { withTranslation } from 'react-i18next'
import {
  getProductList,
} from '../../store/home/product/actions'
import { createSelector } from 'reselect'

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

  document.title = 'Product | Evira - Admin & Dashboard'
  const dispatch = useDispatch()

  const selectProductState = (state) => state.product

  const ProductProperties = createSelector(selectProductState, (product) => ({
    product_list: product.product_list,
    loading: product.loading,
    total_record: product.total_record,
  }))

  const {
    product_list,
    loading,
    total_record,
  } = useSelector(ProductProperties)

  useEffect(() => {
    dispatch(getProductList(pagination))
  }, [dispatch, pagination])

  const refresh = () => {
    dispatch(getProductList(pagination))
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
