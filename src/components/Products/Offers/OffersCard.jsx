import moment from 'moment'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Form,
  FormFeedback,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from 'reactstrap'
import Dropzone from 'react-dropzone'
import {
  addOffers,
  deleteOffers,
  getOffersList,
  updateOffers,
} from '../../../store/actions'
import { useDispatch } from 'react-redux'
import { createSelector } from 'reselect'
import { useSelector } from 'react-redux'
import DeleteModal from '../../Common/Model/DeleteModal'
import { toast } from 'react-toastify'
import { useFormik } from 'formik'
import { offerSchema } from '../../../schemas'
import CustomSpinner from '../../Common/CustomSpinner'
import { uploadFile } from '../../../api'

const CardShop = (props) => {
  const { productId } = props

  const [selectedFile, setSelectedFile] = useState({})
  const [imgUrl, setImgUrl] = useState(null)

  const dispatch = useDispatch()

  const [modelInfo, setModelInfo] = useState({
    updateOffers: false,
    updateOffersInfo: {},
    deleteOffers: false,
    deleteOffersInfo: {},
    addOffers: false,
    addOffersInfo: {},
  })

  const selectOfferState = (state) => state.offers
  const OfferProperties = createSelector(selectOfferState, (offer) => ({
    offers_info: offer.offers_list,
    offers_loading: offer.loading,
    delete_offers: offer.delete_offers,
    update_offers: offer.update_offers,
    add_offers: offer.add_offers,
  }))
  const { offers_info, delete_offers, update_offers, add_offers } =
    useSelector(OfferProperties)

  const refresh = () => {
    dispatch(getOffersList(productId))
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
        type: 'offer',
        file: generatedFile,
      }

      const response = await uploadFile(data)

      setSelectedFile(file)
      setImgUrl(response?.image.url)
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

  const updateOfferformik = useFormik({
    initialValues: {
      id: '',
      discountPercentage: '',
      startDate: '',
      endDate: '',
    },
    validationSchema: offerSchema,
    onSubmit: (values) => {
      if (imgUrl) {
        values.image = imgUrl
      }

      let payload = values

      if (
        values?.image &&
        values.image === modelInfo?.updateOffersInfo?.image
      ) {
        delete payload.image
      }
      if (
        values?.discountPercentage ===
        modelInfo?.updateOffersInfo?.discountPercentage
      ) {
        delete payload.discountPercentage
      }
      if (
        new Date(values?.startDate).getTime() ===
        new Date(modelInfo?.updateOffersInfo?.startDate).getTime()
      ) {
        delete payload.startDate
      }
      if (
        new Date(values?.endDate).getTime() ===
        new Date(modelInfo?.updateOffersInfo?.endDate).getTime()
      ) {
        delete payload.endDate
      }
      dispatch(updateOffers(payload))
    },
  })

  const addOfferformik = useFormik({
    initialValues: {
      discountPercentage: '',
      startDate: '',
      endDate: '',
    },
    validationSchema: offerSchema,
    onSubmit: (values) => {
      if (imgUrl) {
        values.image = imgUrl
      }
      values.product = productId

      let payload = values

      payload.startDate = new Date(values?.startDate).getTime()
      payload.endDate = new Date(values?.endDate).getTime()

      dispatch(addOffers(payload))
    },
  })

  useEffect(() => {
    dispatch(getOffersList(productId))
  }, [dispatch])

  useEffect(() => {
    if (modelInfo?.deleteOffers) {
      toast.success(delete_offers?.success?.message)
      closeModels()
      refresh()
    }
  }, [delete_offers?.success])

  useEffect(() => {
    if (modelInfo?.updateOffers) {
      toast.success(update_offers?.success)
      closeModels()
      refresh()
    }
  }, [update_offers?.success])

  useEffect(() => {
    if (modelInfo?.addOffers) {
      toast.success(add_offers?.success?.message)
      closeModels()
      refresh()
    }
  }, [add_offers?.success])

  useEffect(() => {
    dispatch(getOffersList(productId))
  }, [dispatch])

  useEffect(() => {
    updateOfferformik.setFieldValue('id', modelInfo?.updateOffersInfo?.id)
    updateOfferformik.setFieldValue(
      'discountPercentage',
      modelInfo?.updateOffersInfo?.discountPercentage
    )
    updateOfferformik.setFieldValue(
      'startDate',
      modelInfo?.updateOffersInfo?.startDate
    )
    updateOfferformik.setFieldValue(
      'endDate',
      modelInfo?.updateOffersInfo?.endDate
    )
  }, [modelInfo?.updateOffersInfo])

  const closeModels = () => {
    setModelInfo({
      ...modelInfo,
      updateOffers: false,
      updateOffersInfo: {},
      deleteOffers: false,
      deleteOffersInfo: {},
      addOffers: false,
      addOffersInfo: {},
    })
    updateOfferformik.resetForm()
    addOfferformik.resetForm()
  }

  return (
    <React.Fragment>
      {offers_info &&
        offers_info.map((offer, idx) => (
          <Row key={idx}>
            <Col lg="10" sm="8">
              <Card>
                <Row>
                  <Col xl="4">
                    <div className="text-center p-4 border-end">
                      <div className="mx-auto mb-3 mt-1">
                        <img src={offer.image} width={'200px'} />
                      </div>
                    </div>
                  </Col>

                  <Col xl="8">
                    <div className="p-4 text-center text-xl-start">
                      <Row>
                        <Col xs="4">
                          <div>
                            <p className="text-muted mb-2 text-truncate">
                              Start Date
                            </p>
                            <h5>
                              {moment(offer.startDate).format('MMM Do YY')}
                            </h5>
                          </div>
                        </Col>
                        <Col xs="4">
                          <div>
                            <p className="text-muted mb-2 text-truncate">
                              End Date
                            </p>
                            <h5>{moment(offer.endDate).format('MMM Do YY')}</h5>
                          </div>
                        </Col>
                        <Col xs="4">
                          <div>
                            <p className="text-muted mb-2 text-truncate">
                              Discount Percentage
                            </p>
                            <h5>{offer.discountPercentage} %</h5>
                          </div>
                        </Col>
                      </Row>
                      <div className="mt-4">
                        <Button
                          type="button"
                          color="success"
                          className="w-sm me-4"
                          onClick={() => {
                            setModelInfo({
                              ...modelInfo,
                              updateOffers: true,
                              updateOffersInfo: offer,
                            })
                          }}
                        >
                          <i className="mdi mdi-pencil d-block font-size-16"></i>{' '}
                          Edit
                        </Button>
                        <Button
                          type="button"
                          color="danger"
                          className="w-sm"
                          onClick={() => {
                            setModelInfo({
                              ...modelInfo,
                              deleteOffers: true,
                              deleteOffersInfo: offer,
                            })
                          }}
                        >
                          <i className="mdi mdi-trash-can d-block font-size-16"></i>{' '}
                          Delete
                        </Button>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        ))}

      <Button
        type="button"
        color="primary"
        className="btn mt-2 me-1 d-flex align-items-center"
        onClick={() => {
          setModelInfo({
            ...modelInfo,
            addOffers: true,
          })
        }}
      >
        Add offer
      </Button>

      {/* ------------------- Update Offer ------------------ */}
      <Modal
        isOpen={modelInfo?.updateOffers}
        role="dialog"
        autoFocus={true}
        centered
        data-toggle="modal"
        toggle={closeModels}
      >
        <div>
          <ModalHeader className="border-bottom-0" toggle={closeModels}>
            Update Offer
          </ModalHeader>
          {update_offers?.error ? (
            <Alert color="danger">{update_offers?.error}</Alert>
          ) : null}
        </div>
        <Form
          className="form-horizontal"
          onSubmit={(e) => {
            e.preventDefault()
            updateOfferformik.handleSubmit()
            return false
          }}
        >
          <ModalBody>
            <Row className="mt-4">
              <Card>
                <CardBody>
                  <CardTitle className="mb-3">Offer Image</CardTitle>
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
              <Col sm={6}>
                <div className="mb-3">
                  <Label htmlFor="metatitle">Start Date</Label>
                  <Input
                    id={`startDate`}
                    name={`startDate`}
                    type="date"
                    placeholder="Name"
                    value={
                      moment(updateOfferformik.values.startDate).format(
                        'YYYY-MM-DD'
                      ) || updateOfferformik.values.startDate
                    }
                    onChange={(e) => {
                      updateOfferformik.setFieldValue(
                        'startDate',
                        e.target.value
                      )
                    }}
                    invalid={
                      updateOfferformik.touched.startDate &&
                      updateOfferformik.errors.startDate
                    }
                  />
                  {updateOfferformik.touched.startDate &&
                    updateOfferformik.errors?.startDate && (
                      <FormFeedback type="invalid">
                        {updateOfferformik.errors.startDate}
                      </FormFeedback>
                    )}
                </div>
              </Col>
              <Col sm={6}>
                <div className="mb-3">
                  <Label htmlFor="metatitle">End Date</Label>
                  <Input
                    id={`endDate`}
                    name={`endDate`}
                    type="date"
                    placeholder="Name"
                    value={
                      moment(updateOfferformik.values.endDate).format(
                        'YYYY-MM-DD'
                      ) || updateOfferformik.values.endDate
                    }
                    onChange={(e) => {
                      updateOfferformik.setFieldValue('endDate', e.target.value)
                    }}
                    invalid={
                      updateOfferformik.touched.endDate &&
                      updateOfferformik.errors.endDate
                    }
                  />
                  {updateOfferformik.touched.endDate &&
                    updateOfferformik.errors?.endDate && (
                      <FormFeedback type="invalid">
                        {updateOfferformik.errors.endDate}
                      </FormFeedback>
                    )}
                </div>
              </Col>
              <Col sm={6}>
                <div className="mb-3">
                  <Label htmlFor="metatitle">Discount Percentage</Label>
                  <Input
                    id={`discountPercentage`}
                    name={`discountPercentage`}
                    type="number"
                    placeholder="Enter Discount Percentage"
                    value={updateOfferformik.values.discountPercentage}
                    onChange={updateOfferformik.handleChange}
                    invalid={
                      updateOfferformik.touched.discountPercentage &&
                      updateOfferformik.errors.discountPercentage
                    }
                  />
                  {updateOfferformik.touched.discountPercentage &&
                    updateOfferformik.errors?.discountPercentage && (
                      <FormFeedback type="invalid">
                        {updateOfferformik.errors.discountPercentage}
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
              disabled={update_offers?.loading}
              style={{ minWidth: '60px' }}
            >
              {update_offers?.loading ? <CustomSpinner /> : 'Update'}
            </Button>
            <Button type="button" color="secondary" onClick={closeModels}>
              Close
            </Button>
          </ModalFooter>
        </Form>
      </Modal>

      {/* ------------------- Add Offer ------------------ */}
      <Modal
        isOpen={modelInfo?.addOffers}
        role="dialog"
        autoFocus={true}
        centered
        data-toggle="modal"
        toggle={closeModels}
      >
        <div>
          <ModalHeader className="border-bottom-0" toggle={closeModels}>
            Add Offer
          </ModalHeader>
          {update_offers?.error ? (
            <Alert color="danger">{update_offers?.error}</Alert>
          ) : null}
        </div>
        <Form
          className="form-horizontal"
          onSubmit={(e) => {
            e.preventDefault()
            addOfferformik.handleSubmit()
            return false
          }}
        >
          <ModalBody>
            <Row className="">
              <Card>
                <CardBody>
                  <CardTitle className="mb-3">Offer Image</CardTitle>
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
              <Col sm={6}>
                <div className="mb-3">
                  <Label htmlFor="metatitle">Start Date</Label>
                  <Input
                    id={`startDate`}
                    name={`startDate`}
                    type="date"
                    placeholder="Name"
                    value={
                      moment(addOfferformik.values.startDate).format(
                        'YYYY-MM-DD'
                      ) || addOfferformik.values.startDate
                    }
                    onChange={(e) => {
                      addOfferformik.setFieldValue('startDate', e.target.value)
                    }}
                    invalid={
                      addOfferformik.touched.startDate &&
                      addOfferformik.errors.startDate
                    }
                  />
                  {addOfferformik.touched.startDate &&
                    addOfferformik.errors?.startDate && (
                      <FormFeedback type="invalid">
                        {addOfferformik.errors.startDate}
                      </FormFeedback>
                    )}
                </div>
              </Col>
              <Col sm={6}>
                <div className="mb-3">
                  <Label htmlFor="metatitle">End Date</Label>
                  <Input
                    id={`endDate`}
                    name={`endDate`}
                    type="date"
                    placeholder="Name"
                    value={
                      moment(addOfferformik.values.endDate).format(
                        'YYYY-MM-DD'
                      ) || addOfferformik.values.endDate
                    }
                    onChange={(e) => {
                      addOfferformik.setFieldValue('endDate', e.target.value)
                    }}
                    invalid={
                      addOfferformik.touched.endDate &&
                      addOfferformik.errors.endDate
                    }
                  />
                  {addOfferformik.touched.endDate &&
                    addOfferformik.errors?.endDate && (
                      <FormFeedback type="invalid">
                        {addOfferformik.errors.endDate}
                      </FormFeedback>
                    )}
                </div>
              </Col>
              <Col sm={6}>
                <div className="mb-3">
                  <Label htmlFor="metatitle">Discount Percentage</Label>
                  <Input
                    id={`discountPercentage`}
                    name={`discountPercentage`}
                    type="number"
                    placeholder="Enter Discount Percentage"
                    value={addOfferformik.values.discountPercentage}
                    onChange={addOfferformik.handleChange}
                    invalid={
                      addOfferformik.touched.discountPercentage &&
                      addOfferformik.errors.discountPercentage
                    }
                  />
                  {addOfferformik.touched.discountPercentage &&
                    addOfferformik.errors?.discountPercentage && (
                      <FormFeedback type="invalid">
                        {addOfferformik.errors.discountPercentage}
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
              disabled={update_offers?.loading}
              style={{ minWidth: '60px' }}
            >
              {update_offers?.loading ? <CustomSpinner /> : 'Add'}
            </Button>
            <Button type="button" color="secondary" onClick={closeModels}>
              Close
            </Button>
          </ModalFooter>
        </Form>
      </Modal>

      {/* -----------------Delete Model ------------------ */}
      <DeleteModal
        loading={delete_offers?.loading}
        show={modelInfo?.deleteOffers}
        onCloseClick={closeModels}
        onDeleteClick={() =>
          dispatch(deleteOffers(modelInfo?.deleteOffersInfo?.id))
        }
      />
    </React.Fragment>
  )
}

CardShop.propTypes = {
  id: PropTypes.object,
}

export default CardShop
