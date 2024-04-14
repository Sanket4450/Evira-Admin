import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Link, useNavigate } from 'react-router-dom'
import withRouter from '../../../components/Common/withRouter'
import {
  Alert,
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormFeedback,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  Table,
  TabPane,
  UncontrolledTooltip,
} from 'reactstrap'
import classnames from 'classnames'
import { isEmpty } from 'lodash'
import { useFormik } from 'formik'
import { variantSchema } from '../../../schemas'

//Import Star Ratings
import StarRatings from 'react-star-ratings'

//Import Breadcrumb
import Breadcrumbs from '/src/components/Common/Breadcrumb'

//redux
import { useSelector, useDispatch } from 'react-redux'
import { createSelector } from 'reselect'
import {
  addProductVariants,
  deleteProductVariants,
  getProductInfoByID,
  getProductReviews,
  updateProductVariants,
} from '../../../store/actions'
import Spinners from '../../Common/Spinner'
import Reviews from './Reviews'
import CustomSpinner from '../../Common/CustomSpinner'
import InputColor from 'react-input-color'
import { toast } from 'react-toastify'
import DeleteModal from '../../Common/Model/DeleteModal'
import OffersCard from '../Offers/OffersCard'

const ProductsDetail = (props) => {
  const navigate = useNavigate()

  const [activeTab, setActiveTab] = useState('1')

  const [modelInfo, setModelInfo] = useState({
    updateProdVariant: false,
    updateProdVariantInfo: {},
    deleteProdVariant: false,
    deleteProdVariantInfo: {},
    addProdVariant: false,
    addProdVariantInfo: {},
  })

  const params = props.router.params

  document.title =
    'Product Details | Skote - Vite React Admin & Dashboard Template'
  const dispatch = useDispatch()
  const selectProductState = (state) => state.product
  const ProductProperties = createSelector(selectProductState, (product) => ({
    product: product.product_data_by_id,
    product_res: product.product_res_by_id,
    product_review: product.product_review,
    product_review_res: product.product_review_res,
    add_variant_res: product.add_variant_res,
    update_variant_res: product.update_variant_res,
    delete_variant_res: product.delete_variant_res,
  }))

  const {
    product,
    product_res,
    product_review,
    product_review_res,
    add_variant_res,
    update_variant_res,
    delete_variant_res,
  } = useSelector(ProductProperties)

  const [defaultVariant, setDefaultVariant] = useState({})

  useEffect(() => {
    dispatch(getProductInfoByID(params?.id))
  }, [dispatch])
  useEffect(() => {
    !isEmpty(product) && setDefaultVariant(product.variants[0])
  }, [product])
  useEffect(() => {
    dispatch(getProductReviews(params?.id))
  }, [dispatch])
  useEffect(() => {
    if (modelInfo?.updateProdVariant) {
      toast.success(update_variant_res?.success)
      closeModels()
      refresh()
    }
  }, [update_variant_res?.success])
  useEffect(() => {
    if (modelInfo?.addProdVariant) {
      toast.success(add_variant_res?.success)
      closeModels()
      refresh()
    }
  }, [add_variant_res?.success])
  useEffect(() => {
    if (modelInfo?.deleteProdVariant) {
      toast.success(delete_variant_res?.success)
      closeModels()
      refresh()
    }
  }, [delete_variant_res?.success])

  const refresh = () => {
    dispatch(getProductInfoByID(params?.id))
    dispatch(getProductReviews(params?.id))
  }

  const updateProdVariantformik = useFormik({
    initialValues: {
      color: '',
      size: '',
      price: '',
      quantity: '',
      id: '',
    },
    validationSchema: variantSchema,
    onSubmit: (values) => {
      let payload = values
      if (values?.size === modelInfo?.updateProdVariantInfo?.size) {
        delete payload.size
      }
      if (values?.color === modelInfo?.updateProdVariantInfo?.color) {
        delete payload.color
      }
      if (values?.price === modelInfo?.updateProdVariantInfo?.price) {
        delete payload.price
      }
      if (values?.quantity === modelInfo?.updateProdVariantInfo?.quantity) {
        delete payload.quantity
      }
      dispatch(updateProductVariants(payload))
    },
  })

  const addProdVariantformik = useFormik({
    initialValues: {
      color: '',
      size: '',
      price: '',
      quantity: '',
    },
    validationSchema: variantSchema,
    onSubmit: (values) => {
      let payload = values

      if (!values?.size) {
        delete payload.size
      }
      if (!values?.color) {
        delete payload.color
      }

      payload.id = params?.id
      dispatch(addProductVariants(payload))
    },
  })

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab)
    }
  }

  const closeModels = () => {
    setModelInfo({
      updateProdVariant: false,
      updateProdVariantInfo: {},
      deleteProdVariant: false,
      deleteProdVariantInfo: {},
      addProdVariant: false,
      addProdVariantInfo: {},
    })

    updateProdVariantformik.resetForm()
    addProdVariantformik.resetForm()
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Ecommerce" breadcrumbItem="Product Detail" />
          {product_res?.loading ? (
            <Spinners />
          ) : (
            <>
              {!isEmpty(product) && (
                <Row>
                  <Col>
                    <Card>
                      <CardBody>
                        <Row>
                          <Col xl={6}>
                            <div className="product-detai-imgs">
                              <Row>
                                <Col md={2} sm={3} className="col-4">
                                  <Nav className="flex-column" pills>
                                    <NavItem>
                                      <NavLink
                                        className={classnames({
                                          active: activeTab === '1',
                                        })}
                                        onClick={() => {
                                          toggleTab('1')
                                        }}
                                      >
                                        <img
                                          src={product.image}
                                          alt=""
                                          className="img-fluid mx-auto d-block rounded"
                                        />
                                      </NavLink>
                                    </NavItem>
                                  </Nav>
                                </Col>
                                <Col
                                  md={7}
                                  sm={9}
                                  className="offset-md-1 col-8"
                                >
                                  <TabContent activeTab={activeTab}>
                                    <TabPane tabId="1">
                                      <div>
                                        <img
                                          src={product.image}
                                          alt=""
                                          id="expandedImg1"
                                          className="img-fluid mx-auto d-block"
                                        />
                                      </div>
                                    </TabPane>
                                    <TabPane tabId="2">
                                      <div>
                                        <img
                                          src={product.image}
                                          id="expandedImg2"
                                          alt=""
                                          className="img-fluid mx-auto d-block"
                                        />
                                      </div>
                                    </TabPane>
                                    <TabPane tabId="3">
                                      <div>
                                        <img
                                          src={product.image}
                                          id="expandedImg3"
                                          alt=""
                                          className="img-fluid mx-auto d-block"
                                        />
                                      </div>
                                    </TabPane>
                                    <TabPane tabId="4">
                                      <div>
                                        <img
                                          src={product.image}
                                          id="expandedImg4"
                                          alt=""
                                          className="img-fluid mx-auto d-block"
                                        />
                                      </div>
                                    </TabPane>
                                  </TabContent>
                                  <div className="text-center  d-flex justify-content-center">
                                    <Button
                                      type="button"
                                      color="primary"
                                      className="btn mt-2 me-1 d-flex align-items-center"
                                      onClick={() =>
                                        navigate(
                                          `/update-product/${params?.id}`
                                        )
                                      }
                                    >
                                      <i
                                        className="mdi mdi-pencil font-size-16 me-1"
                                        id="edittooltip"
                                      ></i>{' '}
                                      Update
                                    </Button>
                                  </div>
                                </Col>
                              </Row>
                            </div>
                          </Col>

                          <Col xl="6">
                            <div className="mt-4 mt-xl-3">
                              <Link to="" className="text-primary">
                                {product.category?.name || ''}
                              </Link>
                              <h4 className="mt-1 mb-3">{product.name}</h4>

                              {product.stars > 0 ? (
                                <>
                                  <div className="text-muted float-start me-3">
                                    <StarRatings
                                      rating={product.stars}
                                      starRatedColor="#F1B44C"
                                      starEmptyColor="#74788d"
                                      name="rating"
                                      starDimension="14px"
                                      starSpacing="3px"
                                    />
                                  </div>
                                  <p className="text-muted mb-4">
                                    ( {product.reviewCount} Customers Review )
                                  </p>
                                </>
                              ) : null}

                              {!!product?.isOffer && (
                                <h6 className="text-success text-uppercase">
                                  {product?.offer} % Off
                                </h6>
                              )}
                              <h5 className="mb-4">
                                Price : <b>{defaultVariant?.price} </b>
                              </h5>
                              <p className="text-muted mb-4">
                                {product.description}
                              </p>

                              <h5 className="mb-4">
                                Sold : <b>{product.sold} </b>
                              </h5>

                              <h5 className="mb-4">
                                Quantity : <b>{defaultVariant?.quantity} </b>
                              </h5>
                              <Row className="mb-3">
                                <Col md="6">
                                  {product.features &&
                                    product.features.map((item, i) => (
                                      <div key={i}>
                                        <p className="text-muted">
                                          <i
                                            className={classnames(
                                              item.icon,
                                              'font-size-16 align-middle text-primary me-2'
                                            )}
                                          />
                                          {item.type && `${item.type}: `}
                                          {item.value}
                                        </p>
                                      </div>
                                    ))}
                                </Col>
                                <Col md="6">
                                  {product.features &&
                                    product.features.map((item, i) => (
                                      <div key={i}>
                                        <p className="text-muted">
                                          <i
                                            className={classnames(
                                              item.icon,
                                              'font-size-16 align-middle text-primary me-2'
                                            )}
                                          />
                                          {item.type && `${item.type}:`}
                                          {item.value}
                                        </p>
                                      </div>
                                    ))}
                                </Col>
                              </Row>
                              <div className="product-color">
                                <h5 className="font-size-15">Color :</h5>
                                <div className="d-flex">
                                  {product.variants &&
                                    (product.variants || []).map(
                                      (option, i) => (
                                        <div
                                          key={i}
                                          onClick={() => {
                                            setDefaultVariant(option)
                                          }}
                                          style={{
                                            borderRadius: '10px',
                                            border:
                                              option?.id == defaultVariant?.id
                                                ? '3px solid #556EE6'
                                                : '1px solid #74788D',
                                            marginRight: '5px',
                                            padding: '8px 10px',
                                          }}
                                          className="d-flex flex-column align-items-center"
                                        >
                                          <div
                                            style={{
                                              background: option.color,
                                              width: '30px',
                                              height: '30px',
                                              borderRadius: '50%',
                                              border: '1px solid #74788D',
                                            }}
                                          ></div>
                                          <div className="d-flex justify-content-between mt-2">
                                            <div
                                              id="edittooltipv"
                                              onClick={() => {
                                                setModelInfo({
                                                  ...modelInfo,
                                                  updateProdVariant:
                                                    !modelInfo.updateProdVariant,
                                                  updateProdVariantInfo: option,
                                                })
                                                updateProdVariantformik.setFieldValue(
                                                  'id',
                                                  option?.id
                                                )
                                                updateProdVariantformik.setFieldValue(
                                                  'color',
                                                  option?.color || ''
                                                )
                                                updateProdVariantformik.setFieldValue(
                                                  'size',
                                                  option?.size || ''
                                                )
                                                updateProdVariantformik.setFieldValue(
                                                  'price',
                                                  option?.price
                                                )
                                                updateProdVariantformik.setFieldValue(
                                                  'quantity',
                                                  option?.quantity
                                                )
                                              }}
                                            >
                                              <i className="mdi mdi-pencil font-size-16 text-success me-1" />
                                              <UncontrolledTooltip
                                                placement="top"
                                                target={`edittooltipv`}
                                              >
                                                Edit
                                              </UncontrolledTooltip>
                                            </div>
                                            <div
                                              id="deletetooltipv"
                                              onClick={() => {
                                                product.variants?.length > 1
                                                  ? setModelInfo({
                                                      ...modelInfo,
                                                      deleteProdVariant:
                                                        !modelInfo.deleteProdVariant,
                                                      deleteProdVariantInfo:
                                                        option,
                                                    })
                                                  : null
                                              }}
                                            >
                                              <i
                                                className={`mdi mdi-trash-can font-size-16 ${
                                                  product.variants?.length > 1
                                                    ? 'text-danger'
                                                    : 'text-muted'
                                                } me-1`}
                                              />
                                              <UncontrolledTooltip
                                                placement="top"
                                                target={`deletetooltipv`}
                                              >
                                                Delete
                                              </UncontrolledTooltip>
                                            </div>
                                          </div>
                                        </div>
                                      )
                                    )}

                                  <div
                                    onClick={() => {
                                      setModelInfo({
                                        ...modelInfo,
                                        addProdVariant:
                                          !modelInfo.addProdVariant,
                                      })
                                    }}
                                    id="addtooltip"
                                    style={{
                                      borderRadius: '10px',
                                      border: '1px solid #74788D',
                                      marginRight: '5px',
                                      padding: '31px 20px',
                                    }}
                                    className="d-flex flex-column align-items-center"
                                  >
                                    <i className="fas fa-plus font-size-16"></i>
                                    <UncontrolledTooltip
                                      placement="top"
                                      target={`addtooltip`}
                                    >
                                      Add New Variant
                                    </UncontrolledTooltip>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Col>
                        </Row>

                        {product.specification && (
                          <div className="mt-5">
                            <h5 className="mb-3">Specifications :</h5>

                            <div className="table-responsive">
                              <Table className="table mb-0 table-bordered">
                                <tbody>
                                  {product.specification &&
                                    product.specification.map(
                                      (specification, i) => (
                                        <tr key={i}>
                                          <th
                                            scope="row"
                                            style={{ width: '400px' }}
                                            className={'text-capitalize'}
                                          >
                                            {specification.type}
                                          </th>
                                          <td>{specification.value}</td>
                                        </tr>
                                      )
                                    )}
                                </tbody>
                              </Table>
                            </div>
                          </div>
                        )}

                        {product_review.length > 0 && (
                          <Reviews
                            comments={product_review}
                            productId={params?.id || 1}
                            onClickReply={onClickReply}
                            onCancelReply={onCancelReply}
                            onAddReply={onAddReply}
                            productReviewRes={product_review_res}
                          />
                        )}
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              )}
            </>
          )}
        </Container>
        <OffersCard productId={params?.id} />
        {/* ------------------- Update Variant ------------------ */}
        <Modal
          isOpen={modelInfo?.updateProdVariant}
          role="dialog"
          autoFocus={true}
          centered
          data-toggle="modal"
          toggle={closeModels}
        >
          <div>
            <ModalHeader className="border-bottom-0" toggle={closeModels}>
              Update Variant
            </ModalHeader>
            {update_variant_res?.error ? (
              <Alert color="danger">{update_variant_res?.error}</Alert>
            ) : null}
          </div>
          <Form
            className="form-horizontal"
            onSubmit={(e) => {
              e.preventDefault()
              updateProdVariantformik.handleSubmit()
              return false
            }}
          >
            <ModalBody>
              <Row className="mt-4">
                <Col sm={6}>
                  <div className="mb-3 d-flex flex-column">
                    <Label htmlFor="size">Select Color</Label>
                    <InputColor
                      initialValue={''}
                      onChange={(e) => {
                        if (e?.hex && e?.hex !== '') {
                          updateProdVariantformik.setFieldValue('color', e?.hex)
                        }
                      }}
                      placement="right"
                    />
                    {updateProdVariantformik.touched.color &&
                      updateProdVariantformik.errors.color && (
                        <span className="text-danger">
                          {updateProdVariantformik.errors.color}
                        </span>
                      )}
                  </div>
                  <div className="mb-3">
                    <Label htmlFor="size">Size</Label>
                    <Input
                      id={`size`}
                      name={`size`}
                      type="text"
                      placeholder="Enter Size"
                      value={updateProdVariantformik.values.size}
                      onChange={updateProdVariantformik.handleChange}
                      invalid={
                        updateProdVariantformik.touched.size &&
                        updateProdVariantformik.errors?.size
                      }
                    />
                    {updateProdVariantformik.touched.size &&
                      updateProdVariantformik.errors.size && (
                        <FormFeedback type="invalid">
                          {updateProdVariantformik.errors.size}
                        </FormFeedback>
                      )}
                  </div>
                </Col>
                <Col sm={6}>
                  <div className="mb-3">
                    <Label htmlFor="price">Price</Label>
                    <Input
                      id={`price`}
                      name={`price`}
                      type="number"
                      placeholder="Enter Price"
                      value={
                        isNaN(updateProdVariantformik.values.price)
                          ? 0
                          : updateProdVariantformik.values.price
                      }
                      onChange={updateProdVariantformik.handleChange}
                      invalid={
                        updateProdVariantformik.touched.price &&
                        updateProdVariantformik.errors?.price
                      }
                    />
                    {updateProdVariantformik.touched.price &&
                      updateProdVariantformik.errors?.price && (
                        <FormFeedback type="invalid">
                          {updateProdVariantformik.errors.price}
                        </FormFeedback>
                      )}
                  </div>
                  <div className="mb-3">
                    <Label htmlFor="price">Quantity</Label>
                    <Input
                      id={`quantity`}
                      name={`quantity`}
                      type="number"
                      placeholder="Enter Quantity"
                      value={
                        isNaN(updateProdVariantformik.values.quantity)
                          ? ''
                          : updateProdVariantformik.values.quantity
                      }
                      onChange={updateProdVariantformik.handleChange}
                      invalid={
                        updateProdVariantformik.touched.quantity &&
                        updateProdVariantformik.errors.quantity
                      }
                    />
                    {updateProdVariantformik.touched.quantity &&
                      updateProdVariantformik.errors?.quantity && (
                        <FormFeedback type="invalid">
                          {updateProdVariantformik.errors.quantity}
                        </FormFeedback>
                      )}
                  </div>
                </Col>
              </Row>
            </ModalBody>
            <ModalFooter>
              <Button
                type="submit"
                color="primary"
                disabled={update_variant_res?.loading}
                style={{ minWidth: '60px' }}
              >
                {update_variant_res?.loading ? <CustomSpinner /> : 'Update'}
              </Button>
              <Button type="button" color="secondary" onClick={closeModels}>
                Close
              </Button>
            </ModalFooter>
          </Form>
        </Modal>

        {/* ------------------- Add Variant Model --------------- */}
        <Modal
          isOpen={modelInfo?.addProdVariant}
          role="dialog"
          autoFocus={true}
          centered
          data-toggle="modal"
          toggle={closeModels}
        >
          <div>
            <ModalHeader className="border-bottom-0" toggle={closeModels}>
              Add Variant
            </ModalHeader>
            {add_variant_res?.error ? (
              <Alert color="danger">{add_variant_res?.error}</Alert>
            ) : null}
          </div>
          <Form
            className="form-horizontal"
            onSubmit={(e) => {
              e.preventDefault()
              addProdVariantformik.handleSubmit()
              return false
            }}
          >
            <ModalBody>
              <Row className="mt-4">
                <Col sm={6}>
                  <div className="mb-3 d-flex flex-column">
                    <Label htmlFor="size">Select Color</Label>
                    <InputColor
                      initialValue={''}
                      onChange={(e) => {
                        if (e?.hex && e?.hex !== '') {
                          addProdVariantformik.setFieldValue('color', e?.hex)
                        }
                      }}
                      placement="right"
                    />
                    {addProdVariantformik.touched.color &&
                      addProdVariantformik.errors.color && (
                        <span className="text-danger">
                          {addProdVariantformik.errors.color}
                        </span>
                      )}
                  </div>
                  <div className="mb-3">
                    <Label htmlFor="size">Size</Label>
                    <Input
                      id={`size`}
                      name={`size`}
                      type="text"
                      placeholder="Enter Size"
                      value={addProdVariantformik.values.size}
                      onChange={addProdVariantformik.handleChange}
                      invalid={
                        addProdVariantformik.touched.size &&
                        addProdVariantformik.errors?.size
                      }
                    />
                    {addProdVariantformik.touched.size &&
                      addProdVariantformik.errors.size && (
                        <FormFeedback type="invalid">
                          {addProdVariantformik.errors.size}
                        </FormFeedback>
                      )}
                  </div>
                </Col>
                <Col sm={6}>
                  <div className="mb-3">
                    <Label htmlFor="price">Price</Label>
                    <Input
                      id={`price`}
                      name={`price`}
                      type="number"
                      placeholder="Enter Price"
                      value={addProdVariantformik.values.price || ''}
                      onChange={addProdVariantformik.handleChange}
                      invalid={
                        addProdVariantformik.touched.price &&
                        addProdVariantformik.errors?.price
                      }
                    />
                    {addProdVariantformik.touched.price &&
                      addProdVariantformik.errors?.price && (
                        <FormFeedback type="invalid">
                          {addProdVariantformik.errors.price}
                        </FormFeedback>
                      )}
                  </div>
                  <div className="mb-3">
                    <Label htmlFor="price">Quantity</Label>
                    <Input
                      id={`quantity`}
                      name={`quantity`}
                      type="number"
                      placeholder="Enter Quantity"
                      value={addProdVariantformik.values.quantity || ''}
                      onChange={addProdVariantformik.handleChange}
                      invalid={
                        addProdVariantformik.touched.quantity &&
                        addProdVariantformik.errors.quantity
                      }
                    />
                    {addProdVariantformik.touched.quantity &&
                      addProdVariantformik.errors?.quantity && (
                        <FormFeedback type="invalid">
                          {addProdVariantformik.errors?.quantity}
                        </FormFeedback>
                      )}
                  </div>
                </Col>
              </Row>
            </ModalBody>
            <ModalFooter>
              <Button
                type="submit"
                color="primary"
                disabled={add_variant_res?.loading}
                style={{ minWidth: '60px' }}
              >
                {add_variant_res?.loading ? <CustomSpinner /> : 'Add '}
              </Button>
              <Button type="button" color="secondary" onClick={closeModels}>
                Close
              </Button>
            </ModalFooter>
          </Form>
        </Modal>

        {/* -----------------Delete Model ------------------ */}
        <DeleteModal
          loading={delete_variant_res?.loading}
          show={modelInfo?.deleteProdVariant}
          onCloseClick={closeModels}
          onDeleteClick={() =>
            dispatch(
              deleteProductVariants(modelInfo?.deleteProdVariantInfo?.id)
            )
          }
        />
      </div>
    </React.Fragment>
  )
}

ProductsDetail.propTypes = {
  product: PropTypes.object,
  match: PropTypes.any,
  onGetProductDetail: PropTypes.func,
}

export default withRouter(ProductsDetail)
