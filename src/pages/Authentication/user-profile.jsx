import React, { useState, useEffect } from 'react'
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Input,
  FormFeedback,
  Form,
} from 'reactstrap'
import Dropzone from 'react-dropzone'

// Formik Validation
import { useFormik } from 'formik'
import { profileSchema } from '../../schemas'

//redux
import { useSelector, useDispatch } from 'react-redux'
import { createSelector } from 'reselect'

import { toast } from 'react-toastify'

import DummyImage from '../../assets/images/dummy-image.jpeg'
import withRouter from '../../components/Common/withRouter'
import Breadcrumb from '../../components/Common/Breadcrumb'
import { getUserInfo, editProfile } from '../../store/actions'
import { uploadFile } from '../../api'

const UserProfile = () => {
  document.title = 'Profile | Skote - React Admin & Dashboard Template'

  const dispatch = useDispatch()

  const [selectedFile, setSelectedFile] = useState({})
  const [imageUrl, setImageUrl] = useState(null)

  const selectProfileState = (state) => state.Profile
  const ProfileProperties = createSelector(selectProfileState, (profile) => ({
    user_data: profile.user_data,
    user_res: profile.user_res,
    edit_profile: profile.edit_profile,
  }))

  const { user_data, user_res, edit_profile } = useSelector(ProfileProperties)

  useEffect(() => {
    dispatch(getUserInfo())
  }, [dispatch])

  const refresh = () => {
    dispatch(getUserInfo())
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
        type: 'user',
        file: generatedFile,
      }

      const response = await uploadFile(data)

      setSelectedFile(file)
      setImageUrl(response?.image.url)
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

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      email: '',
      fullName: '',
    },
    validationSchema: profileSchema,
    onSubmit: (values) => {
      if (imageUrl) {
        values.profileImage = imageUrl
      }

      let payload = values

      if (
        values?.profileImage &&
        values.profileImage === user_data?.profileImage
      ) {
        delete payload.profileImage
      }

      if (values?.email === user_data?.email) {
        delete payload.email
      }

      if (!values?.fullName || values.fullName === user_data?.fullName) {
        delete payload.fullName
      }

      dispatch(editProfile(payload))
    },
  })

  useEffect(() => {
    if (edit_profile?.success) {
      toast.success(editProfile?.success?.message)
      refresh()
    }
  }, [edit_profile?.success])

  useEffect(() => {
    if (Object.keys(user_data).length > 0) {
      validation.setFieldValue('email', user_data?.email)
      validation.setFieldValue('fullName', user_data?.fullName || '')
    }
  }, [user_res?.success])

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumb title="Skote" breadcrumbItem="Profile" />

          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <div className="d-flex">
                    <div className="ms-3">
                      <img
                        src={user_data?.profileImage || DummyImage}
                        alt=""
                        className="avatar-md rounded-circle img-thumbnail"
                      />
                    </div>
                    <div
                      className="flex-grow-1 align-self-center text-muted"
                      style={{ margin: '0 20px' }}
                    >
                      <p className="mb-1">{user_data?.fullName}</p>
                      <p className="mb-1">{user_data?.email}</p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <h4 className="card-title mb-4">Update Profile</h4>

          <Card>
            <CardBody>
              <Form
                className="form-horizontal"
                onSubmit={(e) => {
                  e.preventDefault()
                  validation.handleSubmit()
                  return false
                }}
              >
                <div className="form-group">
                  <div className='mx-4'>
                    <p className="form-label">Profile Image</p>
                  </div>
                  <Card>
                    <CardBody>
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
                  <div className="mb-3 mx-4">
                    <p className="form-label">Full Name</p>
                    <Input
                      name="fullName"
                      className="form-control"
                      placeholder="Enter fullName"
                      type="text"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.fullName}
                      invalid={
                        validation.touched.fullName &&
                        validation.errors.fullName
                          ? true
                          : false
                      }
                    />
                    {validation.touched.fullName &&
                    validation.errors.fullName ? (
                      <FormFeedback type="invalid">
                        {validation.errors.fullName}
                      </FormFeedback>
                    ) : null}
                  </div>
                  <div className="mb-4 mx-4">
                    <p className="form-label">Email</p>
                    <Input
                      name="email"
                      className="form-control"
                      placeholder="Enter Email"
                      type="text"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.email}
                      autoComplete='off'
                      invalid={
                        validation.touched.email && validation.errors.email
                          ? true
                          : false
                      }
                    />
                    {validation.touched.email && validation.errors.email ? (
                      <FormFeedback type="invalid">
                        {validation.errors.email}
                      </FormFeedback>
                    ) : null}
                  </div>
                </div>
                <div className="text-center">
                  <Button type="submit" color="primary">
                    Update
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withRouter(UserProfile)
