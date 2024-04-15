import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Link, useNavigate } from 'react-router-dom'
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Nav,
  NavItem,
  NavLink,
  Row,
} from 'reactstrap'
import classnames from 'classnames'
import { isEmpty } from 'lodash'

//Import Star Ratings
import StarRatings from 'react-star-ratings'

//redux
import { useSelector, useDispatch } from 'react-redux'
import { createSelector } from 'reselect'
import Spinners from '../../../Common/Spinner'
import withRouter from '../../../Common/withRouter'
import Paginations from '../../../Common/Pagination'
import DeleteModal from '../../../Common/Model/DeleteModal'
import { toast } from 'react-toastify'
import { deleteProduct } from '../../../../store/actions'
import { useDebouncedCallback } from 'use-debounce'

const ProductList = ({
  refresh,
  products,
  isLoading,
  setPagination,
  pagination,
  total_record,
}) => {
  //meta title
  document.title = 'Products | Evira - Admin & Dashboard'
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [productList, setProductList] = useState([])
  const [activeTab, setActiveTab] = useState('1')
  const [modelInfo, setModelInfo] = useState({
    deleteProd: false,
    deleteProdId: '',
  })
  // eslint-disable-next-line no-unused-vars
  const [discountDataList, setDiscountDataList] = useState([])

  useEffect(() => {
    setDiscountDataList(discountDataList)
  }, [discountDataList])

  useEffect(() => {
    setProductList(products)
  }, [products])

  const closeModels = () => {
    setModelInfo({
      deleteProd: false,
      deleteProdId: '',
    })
  }

  const selectProductState = (state) => state.product

  const ProductProperties = createSelector(selectProductState, (product) => ({
    delete_product: product.delete_product,
  }))

  const { delete_product } = useSelector(ProductProperties)

  useEffect(() => {
    if (modelInfo?.deleteProd) {
      toast.success(delete_product?.success)
      closeModels()
      refresh()
    }
  }, [delete_product?.success])

  useEffect(() => {
    if (modelInfo?.deleteProd) {
      toast.error(delete_product?.error)
    }
  }, [delete_product?.error])

  const debounced = useDebouncedCallback((value) => {
    setPagination({ ...pagination, keyword: value })
  }, 1000)

  return (
    <React.Fragment>
      <Col lg={9}>
        <Row className="mb-3">
          <Col xl={4} sm={6}></Col>
          <Col lg={8} sm={6}>
            <Form className="mt-4 mt-sm-0 float-sm-end d-sm-flex align-items-center">
              <div className="search-box me-2">
                <div className="position-relative">
                  <Input
                    type="text"
                    name="search"
                    className="border-0"
                    placeholder="Search..."
                    onChange={(e) => debounced(e.target.value)}
                  />
                  <i className="bx bx-search-alt search-icon" />
                </div>
              </div>
            </Form>
          </Col>
        </Row>
        {isLoading ? (
          <Spinners />
        ) : (
          <>
            <Row>
              {!isEmpty(productList) ? (
                (productList || []).map((product, key) => (
                  <Col xl={4} sm={6} key={'_col_' + key}>
                    <Card>
                      <CardBody>
                        <div
                          className="product-img position-relative"
                          onClick={() =>
                            navigate(`/product-detail/${product.id}`)
                          }
                        >
                          {product.offers?.[0] ? (
                            <div className="avatar-sm product-ribbon">
                              <span className="avatar-title rounded-circle bg-primary">
                                {`- ${product.offers?.[0]?.discountPercentage} %`}
                              </span>
                            </div>
                          ) : null}

                          <img
                            style={{ height: 'auto' }}
                            src={product.image}
                            alt=""
                            className="img-fluid mx-auto d-block"
                          />
                        </div>
                        <div
                          className="mt-4 text-center"
                          onClick={() =>
                            navigate(`/product-detail/${product.id}`)
                          }
                        >
                          <h5 className="mb-3 text-truncate">
                            <Link
                              to={'/product-detail/' + product.id}
                              className="text-dark"
                            >
                              {product.name}
                            </Link>
                          </h5>
                          <div className="text-muted mb-3">
                            <StarRatings
                              rating={product.stars > 5 ? 5 : product.stars}
                              starRatedColor="#F1B44C"
                              starEmptyColor="#74788d"
                              numberOfStars={5}
                              name="rating"
                              starDimension="14px"
                              starSpacing="1px"
                            />
                          </div>
                          <h5 className="my-0">
                            <b>{product.price}₹</b>
                          </h5>
                        </div>
                        <div className="text-center  d-flex justify-content-center">
                          <Button
                            type="button"
                            color="primary"
                            className="btn mt-2 me-1 d-flex align-items-center"
                            onClick={() =>
                              navigate(`/update-product/${product.id}`)
                            }
                          >
                            <i
                              className="mdi mdi-pencil font-size-16 me-1"
                              id="edittooltip"
                            ></i>{' '}
                            Update
                          </Button>
                          <Button
                            type="button"
                            color="danger"
                            className="ms-1 btn mt-2 d-flex align-items-center"
                            onClick={(e) => {
                              e.preventDefault()
                              setModelInfo({
                                ...modelInfo,
                                deleteProd: !modelInfo.deleteProd,
                                deleteProdId: product.id,
                              })
                            }}
                          >
                            <i
                              className="mdi mdi-trash-can font-size-16 me-1"
                              id="deletetooltip"
                            ></i>
                            Delete
                          </Button>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                ))
              ) : (
                <div className="align-items-center text-center p-4">
                  {' '}
                  <i className="mdi mdi-book-open-page-variant-outline me-2 display-5"></i>{' '}
                  <h4> No Records Found </h4>
                </div>
              )}
            </Row>
            <Row>
              {!isEmpty(productList) && (
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
              )}
            </Row>
          </>
        )}
      </Col>

      {/* -----------------Delete Model ------------------ */}
      <DeleteModal
        loading={delete_product?.loading}
        show={modelInfo?.deleteProd}
        onCloseClick={closeModels}
        onDeleteClick={() => dispatch(deleteProduct(modelInfo?.deleteProdId))}
      />
    </React.Fragment>
  )
}

ProductList.propTypes = {
  products: PropTypes.array,
  history: PropTypes.object,
  onGetProducts: PropTypes.func,
  isLoading: PropTypes.bool,
  setPagination: PropTypes.any,
  pagination: PropTypes.any,
  total_record: PropTypes.number,
  refresh: PropTypes.any,
}

export default withRouter(ProductList)
