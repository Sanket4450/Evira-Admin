import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
  Card,
  CardBody,
  CardTitle,
  Col,
  FormGroup,
  Input,
  Label,
} from 'reactstrap'
import 'nouislider/distribute/nouislider.css'
import withRouter from '../../../Common/withRouter'
import { getAllCategoriesList } from '../../../../store/actions'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { createSelector } from 'reselect'

const ProductsFilters = ({ pagination, setPagination }) => {
  const dispatch = useDispatch()
  //meta title
  document.title = 'Products | Skote - Vite React Admin & Dashboard Template'
  // eslint-disable-next-line no-unused-vars
  const filterClothes = [
    { id: 1, name: 'T-shirts', link: '#' },
    { id: 2, name: 'Shirts', link: '#' },
    { id: 3, name: 'Jeans', link: '#' },
    { id: 4, name: 'Jackets', link: '#' },
  ]
  // eslint-disable-next-line no-unused-vars
  const [discountDataList, setDiscountDataList] = useState([])

  useEffect(() => {
    setDiscountDataList(discountDataList)
  }, [discountDataList])

  const selectProductState = (state) => state.product

  const ProductProperties = createSelector(selectProductState, (product) => ({
    categories_list: product.categories_list,
  }))

  const { categories_list } = useSelector(ProductProperties)

  useEffect(() => {
    dispatch(getAllCategoriesList())
  }, [dispatch])

  return (
    <React.Fragment>
      <Col lg={3}>
        <Card>
          <CardBody>
            <CardTitle className="mb-4">Filter</CardTitle>
            <div>
              <h5 className="font-size-14 mb-3">Category</h5>
              <ul className="list-unstyled product-list">
                <li
                  key={'_li_' + 0}
                  onClick={() => {
                    setPagination({ ...pagination, category: null })
                  }}
                  className={`${
                    pagination?.category === null ? 'text-primary' : null
                  } mb-2`}
                  style={{ cursor: 'pointer' }}
                >
                  <i className="mdi mdi-chevron-right me-2" /> All
                </li>
                {(categories_list || [])?.map((category, key) => (
                  <li
                    key={'_li_' + key}
                    onClick={() => {
                      setPagination({ ...pagination, category: category?.id })
                    }}
                    className={`${
                      pagination?.category === category?.id
                        ? 'text-primary'
                        : null
                    } mb-2`}
                    style={{ cursor: 'pointer' }}
                  >
                    <i className="mdi mdi-chevron-right me-2" />{' '}
                    {category?.name}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-4 pt-3">
              <h5 className="font-size-14 mb-3">Customer Rating</h5>
              <div>
                <FormGroup check className="mt-2">
                  <Input
                    checked={pagination?.rating == null}
                    type="checkbox"
                    id="productratingCheck1"
                    onClick={() => {
                      setPagination({ ...pagination, rating: null })
                    }}
                  />
                  <Label check htmlFor="productratingCheck1">
                    All <i className="bx bx-star text-warning" />
                  </Label>
                </FormGroup>
                <FormGroup check className="mt-2">
                  <Input
                    checked={pagination?.rating == 4}
                    type="checkbox"
                    id="productratingCheck2"
                    onClick={() => {
                      setPagination({ ...pagination, rating: 4 })
                    }}
                  />
                  <Label check htmlFor="productratingCheck2">
                    4 <i className="bx bx-star text-warning" /> & Above
                  </Label>
                </FormGroup>
                <FormGroup check className="mt-2">
                  <Input
                    checked={pagination?.rating == 3}
                    type="checkbox"
                    id="productratingCheck3"
                    onClick={() => {
                      setPagination({ ...pagination, rating: 3 })
                    }}
                  />
                  <Label check htmlFor="productratingCheck3">
                    3 <i className="bx bx-star text-warning" /> & Above
                  </Label>
                </FormGroup>
                <FormGroup check className="mt-2">
                  <Input
                    checked={pagination?.rating == 2}
                    type="checkbox"
                    id="productratingCheck4"
                    onClick={() => {
                      setPagination({ ...pagination, rating: 2 })
                    }}
                  />
                  <Label check htmlFor="productratingCheck4">
                    2 <i className="bx bx-star text-warning" /> & Above
                  </Label>
                </FormGroup>
                <FormGroup check className="mt-2">
                  <Input
                    checked={pagination?.rating == 1}
                    type="checkbox"
                    id="productratingCheck5"
                    onClick={() => {
                      setPagination({ ...pagination, rating: 1 })
                    }}
                  />
                  <Label check htmlFor="productratingCheck5">
                    1 <i className="bx bx-star text-warning" /> & Above
                  </Label>
                </FormGroup>
              </div>
            </div>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  )
}

ProductsFilters.propTypes = {
  products: PropTypes.array,
  history: PropTypes.object,
  onGetProducts: PropTypes.func,
  pagination: PropTypes.any,
}

export default withRouter(ProductsFilters)
