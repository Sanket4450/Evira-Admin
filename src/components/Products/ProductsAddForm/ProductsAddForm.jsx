import React, { useEffect, useState } from 'react'
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Form,
  Input,
  Label,
  Row,
  FormFeedback,
  Alert,
} from 'reactstrap'
import Dropzone from 'react-dropzone'
import { useFormik } from 'formik'
import { productFullSchema } from '../../../schemas'
import Select from 'react-select'
import PropTypes from 'prop-types'
import withRouter from '../../Common/withRouter'
//Import Breadcrumb
import Breadcrumbs from '/src/components/Common/Breadcrumb'
import {
  addProduct,
  addProductMessage,
  getAllCategoriesList,
  getProductInfoByID,
  updateProduct,
  updateProductMessage,
} from '../../../store/actions'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { createSelector } from 'reselect'
import InputColor from 'react-input-color'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { uploadFile } from '../../../api'

const ProductsAddForm = (props) => {
  const ProdUpdateID = props?.router?.params?.id

  document.title = 'Add Product | Skote - Vite React Admin & Dashboard Template'
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [selectedFile, setSelectedFile] = useState({})
  const [imgUrl, setImgUrl] = useState(null)

  const selectProductState = (state) => state.product

  const ProductProperties = createSelector(selectProductState, (product) => ({
    categories_list: product.categories_list,
    add_product: product.add_product,
    product_info: product.product_data_by_id,
    update_product: product.update_product,
  }))

  const { categories_list, add_product, product_info, update_product } =
    useSelector(ProductProperties)

  useEffect(() => {
    dispatch(getAllCategoriesList())
  }, [dispatch])

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
        type: 'product',
        file: generatedFile,
      }

      const image = await uploadFile(data)

      setSelectedFile(file)
      setImgUrl(image.url)
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

  const formik = useFormik({
    initialValues: {
      name: '',
      category: '',
      description: '',
      defaultVariant: {
        size: '',
        color: '',
        price: '',
        quantity: '',
      },
    },
    validationSchema: productFullSchema,
    onSubmit: (values) => {
      if (imgUrl) {
        values.image = imgUrl
      }

      if (ProdUpdateID) {
        let payload = values

        if (values?.name === product_info?.name) {
          delete payload.name
        }
        if (values?.image && values.image === product_info?.image) {
          delete payload.image
        }
        if (
          !values?.description ||
          values.description === product_info?.description
        ) {
          delete payload.description
        }
        if (values?.category === product_info?.category?.id) {
          delete payload.category
        }
        delete payload.defaultVariant
        payload.id = ProdUpdateID

        dispatch(updateProduct(payload))
      } else {
        let payload = values

        if (!values?.description) {
          delete payload.description
        }
        if (!values?.defaultVariant?.size) {
          delete payload.defaultVariant.size
        }
        if (!values?.defaultVariant?.color) {
          delete payload.defaultVariant.color
        }

        dispatch(addProduct(payload))
      }
    },
  })

  const CategoryOptions = categories_list?.map((item) => {
    return {
      value: item?.id,
      label: item?.name,
    }
  })

  useEffect(() => {
    if (add_product?.success && !add_product?.loading) {
      formik.resetForm()
      toast.success(add_product?.success?.message)
      dispatch(
        addProductMessage({
          loading: false,
          success: null,
          error: null,
        })
      )
    }
  }, [add_product])

  useEffect(() => {
    if (ProdUpdateID) {
      dispatch(getProductInfoByID(ProdUpdateID))
    }
  }, [ProdUpdateID])

  useEffect(() => {
    if (update_product?.success) {
      toast.success(update_product?.success?.message)
      navigate(`/product`)
      dispatch(
        updateProductMessage({
          loading: false,
          success: null,
          error: null,
        })
      )
    }
  }, [update_product])
  useEffect(() => {
    if (ProdUpdateID && product_info) {
      formik.setFieldValue('name', product_info?.name)
      formik.setFieldValue('category', product_info?.category?.id)
      formik.setFieldValue('description', product_info?.description || '')

      const defaultVariant = product_info?.variants
        ? product_info?.variants[0]
        : {}
      formik.setFieldValue('defaultVariant', {
        size: defaultVariant.size || '',
        color: defaultVariant.color || '',
        price: defaultVariant.price || '',
        quantity: defaultVariant.quantity || '',
      })
    }
  }, [ProdUpdateID, product_info])

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Product" breadcrumbItem="Add Product" />
          <Form onSubmit={formik.handleSubmit}>
            {add_product?.error ? (
              <Alert color="danger">{add_product?.error}</Alert>
            ) : null}
            <Row>
              <Col xs="12">
                <Card>
                  <CardBody>
                    <CardTitle tag="h4">Basic Information</CardTitle>
                    <p className="card-title-desc mb-4">
                      Fill all information below
                    </p>

                    <Form onSubmit={formik.handleSubmit} autoComplete="off">
                      <Row>
                        <Col sm="6">
                          <div className="mb-3">
                            <Label htmlFor="name">Product Name</Label>
                            <Input
                              id="name"
                              name="name"
                              type="text"
                              placeholder="Product Name"
                              value={formik.values.name}
                              onChange={formik.handleChange}
                              invalid={
                                formik.touched.name && formik.errors.name
                                  ? true
                                  : false
                              }
                            />
                            {formik.errors.name && formik.touched.name ? (
                              <FormFeedback type="invalid">
                                {formik.errors.name}
                              </FormFeedback>
                            ) : null}
                          </div>
                          <div className="mb-3">
                            <div
                              className="control-label"
                              style={{ marginBottom: '0.5rem' }}
                            >
                              Category
                            </div>
                            <Select
                              name="category"
                              options={CategoryOptions}
                              className="select2"
                              value={
                                CategoryOptions.find(
                                  (option) =>
                                    option.value === formik.values.category
                                ) || ''
                              }
                              onChange={(selectedOption) =>
                                formik.setFieldValue(
                                  'category',
                                  selectedOption.value
                                )
                              }
                            />
                            {formik.errors.category &&
                            formik.touched.category ? (
                              <span className="text-danger">
                                {formik.errors.category}
                              </span>
                            ) : null}
                          </div>
                        </Col>
                        <Col sm="6">
                          <div className="mb-3">
                            <Label htmlFor="description">
                              {' '}
                              Product Description
                            </Label>
                            <Input
                              tag="textarea"
                              className="mb-3"
                              id="description"
                              name="description"
                              rows={5}
                              placeholder="Product Description"
                              value={formik.values.description}
                              onChange={formik.handleChange}
                              invalid={
                                formik.touched.description &&
                                formik.errors.description
                                  ? true
                                  : false
                              }
                            />
                            {formik.errors.description &&
                            formik.touched.description ? (
                              <FormFeedback type="invalid">
                                {formik.errors.description}
                              </FormFeedback>
                            ) : null}
                          </div>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card>
                  <CardBody>
                    <CardTitle className="mb-3">Product Image</CardTitle>
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
                {!ProdUpdateID && (
                  <Card>
                    <CardBody>
                      <CardTitle tag="h4">Variant Data</CardTitle>
                      <p className="card-title-desc mb-3">
                        Fill all information below
                      </p>

                      <Row className="mt-4">
                        <Col sm={6}>
                          <div className="mb-3 d-flex flex-column">
                            <Label htmlFor="size">Select Color</Label>
                            <InputColor
                              initialValue=""
                              onChange={(e) => {
                                const defaultVariant =
                                  formik.values?.defaultVariant
                                if (e?.hex && e?.hex !== '') {
                                  defaultVariant.color = e.hex
                                  formik.setFieldValue(
                                    'defaultVariant',
                                    defaultVariant
                                  )
                                }
                              }}
                              placement="right"
                            />
                            {formik.errors.defaultVariant &&
                              formik.errors.defaultVariant.color && (
                                <span className="text-danger">
                                  {formik.errors.defaultVariant.color}
                                </span>
                              )}
                          </div>
                          <div className="mb-3">
                            <Label htmlFor="size">Size</Label>
                            <Input
                              id={`defaultVariant.size`}
                              name={`defaultVariant.size`}
                              type="text"
                              placeholder="Size"
                              value={formik.values.defaultVariant?.size}
                              onChange={formik.handleChange}
                              invalid={
                                formik.touched.defaultVariant &&
                                formik.errors.defaultVariant?.size
                                  ? true
                                  : false
                              }
                            />
                            {formik.errors.defaultVariant &&
                              formik.errors.defaultVariant.size && (
                                <FormFeedback type="invalid">
                                  {formik.errors.defaultVariant.size}
                                </FormFeedback>
                              )}
                          </div>
                        </Col>
                        <Col sm={6}>
                          <div className="mb-3">
                            <Label htmlFor="price">Price</Label>
                            <Input
                              id={`defaultVariant.price`}
                              name={`defaultVariant.price`}
                              type="number"
                              placeholder="price"
                              value={
                                isNaN(formik.values.defaultVariant?.price)
                                  ? 0
                                  : formik.values.defaultVariant?.price
                              }
                              onChange={formik.handleChange}
                              invalid={
                                formik.touched.defaultVariant &&
                                formik.errors.defaultVariant?.price
                                  ? true
                                  : false
                              }
                            />
                            {formik.errors.defaultVariant &&
                              formik.errors.defaultVariant.price && (
                                <FormFeedback type="invalid">
                                  {formik.errors.defaultVariant.price}
                                </FormFeedback>
                              )}
                          </div>
                          <div className="mb-3">
                            <Label htmlFor="price">Quantity</Label>
                            <Input
                              id={`defaultVariant.quantity`}
                              name={`defaultVariant.quantity`}
                              type="number"
                              placeholder="Enter Quantity"
                              value={
                                isNaN(formik.values.defaultVariant?.quantity)
                                  ? 0
                                  : formik.values.defaultVariant?.quantity
                              }
                              onChange={formik.handleChange}
                              invalid={
                                formik.touched.defaultVariant &&
                                formik.errors.defaultVariant?.quantity
                                  ? true
                                  : false
                              }
                            />
                            {formik.errors.defaultVariant &&
                              formik.errors.defaultVariant.quantity && (
                                <FormFeedback type="invalid">
                                  {formik.errors.defaultVariant.quantity}
                                </FormFeedback>
                              )}
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                )}
                <div className="d-flex flex-wrap gap-2 justify-content-end">
                  <Button type="submit" color="primary">
                    Save Changes
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>
    </React.Fragment>
  )
}

ProductsAddForm.propTypes = {
  product: PropTypes.object,
  match: PropTypes.any,
  onGetProductDetail: PropTypes.func,
}

export default withRouter(ProductsAddForm)
