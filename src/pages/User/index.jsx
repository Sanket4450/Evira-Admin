import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
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
} from 'reactstrap'
//redux
import { useSelector, useDispatch } from 'react-redux'

//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb'

//i18n
import { withTranslation } from 'react-i18next'
import BasicTable from '../../components/Common/BasicTable'
import {
  deleteUser,
  deleteUserMessage,
  getUserList,
  updateUser,
  updateUserMessage,
} from '../../store/home/user/actions'
import { createSelector } from 'reselect'

// Formik validation
import { useFormik } from 'formik'
import { emailSchema } from '../../schemas'
import Spinners from '../../components/Common/Spinner'
import CustomSpinner from '../../components/Common/CustomSpinner'
import DummyImage from '../../assets/images/dummy-image.jpeg'

import { toast } from 'react-toastify'
import Paginations from '../../components/Common/Pagination'
import DeleteModal from '../../components/Common/Model/DeleteModal'

const User = (props) => {
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 5,
  })

  const [modelInfo, setModelInfo] = useState({
    updateUser: false,
    updateUserInfo: {},
    deleteUser: false,
    deleteUserInfo: {},
  })
  //meta title
  document.title = 'User | Skote - Vite React Admin & User Template'
  const dispatch = useDispatch()

  const selectUserState = (state) => state.user

  const UserProperties = createSelector(selectUserState, (user) => ({
    user_list: user.user_list,
    loading: user.loading,
    update_user: user.update_user,
    delete_user: user.delete_user,
    add_user: user.add_user,
    total_record: user.total_record,
  }))

  const { user_list, loading, update_user, delete_user, total_record } =
    useSelector(UserProperties)

  useEffect(() => {
    dispatch(getUserList(pagination))
  }, [dispatch, pagination])

  const refresh = () => {
    dispatch(getUserList(pagination))
  }

  const column = [
    {
      id: 1,
      label: 'Profile Image',
      value: 'icon',
      enableSorting: true,
      render: (rowData) => {
        return (
          <div className="avatar-sm">
            <span className="avatar-title rounded-circle">
              {rowData.profileImage ? (
                <img
                  src={rowData.profileImage}
                  alt=""
                  className="avatar-title rounded-circle"
                />
              ) : (
                <img src={DummyImage} alt="" width={'50px'} />
              )}
            </span>
          </div>
        )
      },
    },
    {
      id: 3,
      label: 'Full Name',
      value: 'fullName',
      textAlign: 'start',
    },
    {
      id: 2,
      label: 'Nick Name',
      value: 'nickName',
      textAlign: 'center',
    },
    {
      id: 3,
      label: 'Phone Number',
      value: 'mobile',
      textAlign: 'start',
    },
    {
      id: 3,
      label: 'Gender',
      value: 'gender',
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
                  updateUser: !modelInfo?.updateUser,
                  updateUserInfo: rowData,
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
                  deleteUser: !modelInfo?.updateUser,
                  deleteUserInfo: rowData,
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
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      id: '',
      email: '',
      fullName: '',
      nickName: '',
      dateOfBirth: '',
      mobile: '',
      gender: '',
    },
    validationSchema: emailSchema,
    onSubmit: (values) => {
      let payload = values
      if (values?.email === modelInfo?.updateUserInfo?.email) {
        delete payload.email
      }
      if (values?.fullName === modelInfo?.updateUserInfo?.fullName) {
        delete payload.fullName
      }
      if (values?.nickName === modelInfo?.updateUserInfo?.nickName) {
        delete payload.nickName
      }
      if (values?.dateOfBirth === modelInfo?.updateUserInfo?.dateOfBirth) {
        delete payload.dateOfBirth
      }
      if (values?.mobile === modelInfo?.updateUserInfo?.mobile) {
        delete payload.mobile
      }
      if (values?.gender === modelInfo?.updateUserInfo?.gender) {
        delete payload.gender
      }
      dispatch(updateUser(payload))
    },
  })

  useEffect(() => {
    if (modelInfo?.updateUser) {
      toast.success(update_user?.success?.message)
      closeUpdateModel()
      refresh()
    }
  }, [update_user?.success])

  useEffect(() => {
    if (modelInfo?.deleteUser) {
      toast.success(delete_user?.success?.message)
      closeDeleteModel()
      refresh()
    }
  }, [delete_user?.success])

  useEffect(() => {
    if (modelInfo?.updateUserInfo) {
      validation.setFieldValue('id', modelInfo?.updateUserInfo?.id)
      validation.setFieldValue('email', modelInfo?.updateUserInfo?.email)
      validation.setFieldValue('fullName', modelInfo?.updateUserInfo?.fullName)
      validation.setFieldValue('nickName', modelInfo?.updateUserInfo?.nickName)
      validation.setFieldValue(
        'dateOfBirth',
        modelInfo?.updateUserInfo?.dateOfBirth
      )
      validation.setFieldValue('mobile', modelInfo?.updateUserInfo?.mobile)
      validation.setFieldValue('gender', modelInfo?.updateUserInfo?.gender)
    }
  }, [modelInfo?.updateUserInfo])

  const closeUpdateModel = () => {
    setModelInfo({
      ...modelInfo,
      updateUser: !modelInfo?.updateUser,
    })
    dispatch(
      updateUserMessage({
        loading: false,
        success: null,
        error: null,
      })
    )
  }

  const closeDeleteModel = () => {
    setModelInfo({
      ...modelInfo,
      deleteUser: !modelInfo?.deleteUser,
    })

    dispatch(
      deleteUserMessage({
        loading: false,
        success: null,
        error: null,
      })
    )
    validation.resetForm()
  }

  return (
    <React.Fragment>
      ;
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title={props.t('User')}
            breadcrumbItem={props.t('User')}
          />
          {loading ? (
            <>
              <Spinners />
            </>
          ) : (
            <>
              <BasicTable
                column={column}
                data={user_list}
                theadClass="table-light"
              />
              {/* <Paginations data={user_list} pagination={pagination} setPagination={setPagination} total_page={total_record} /> */}
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
      {/* --------------Update Model-------------- */};
      <Modal
        isOpen={modelInfo?.updateUser}
        role="dialog"
        autoFocus={true}
        centered
        data-toggle="modal"
        toggle={() => {
          setModelInfo({
            ...modelInfo,
            updateUser: !modelInfo?.updateUser,
          })
        }}
      >
        <div>
          <ModalHeader className="border-bottom-0" toggle={closeUpdateModel}>
            Update User
          </ModalHeader>
          {update_user?.error ? (
            <Alert color="danger">{update_user?.error}</Alert>
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
                <div className="avatar-md mx-auto mb-4">
                  <div className="avatar-title bg-light  rounded-circle text-primary h1">
                    <img
                      src={modelInfo?.updateUserInfo?.profileImage}
                      alt=""
                      width={'80px'}
                      className="rounded-circle"
                    />
                  </div>
                </div>

                <div className="row justify-content-center">
                  <div className="col-xl-10">
                    <div className="input-group rounded bg-light">
                      <Input
                        type="text"
                        className="form-control bg-transparent"
                        placeholder="Enter Full Name"
                        name="fullName"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.fullName || ''}
                        invalid={
                          validation.touched.fullName &&
                          validation.errors.fullName
                            ? true
                            : false
                        }
                      />
                      <Input
                        type="text"
                        className="form-control bg-transparent"
                        placeholder="Enter Nick Name"
                        name="nickName"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.nickName || ''}
                        invalid={
                          validation.touched.nickName &&
                          validation.errors.nickName
                            ? true
                            : false
                        }
                      />
                    </div>
                    <div className="input-group rounded bg-light mt-3">
                      <Input
                        type="email"
                        className="form-control bg-transparent "
                        placeholder="Enter Description"
                        name="email"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.email || ''}
                        invalid={
                          validation.touched.email && validation.errors.email
                            ? true
                            : false
                        }
                      />
                    </div>
                    <div className="input-group rounded bg-light mt-3">
                      <Input
                        type="number"
                        className="form-control bg-transparent "
                        placeholder="Enter Phone Number"
                        name="mobile"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.mobile || ''}
                        invalid={
                          validation.touched.mobile && validation.errors.mobile
                            ? true
                            : false
                        }
                      />
                    </div>
                    <div className="input-group rounded bg-light mt-3">
                      <Input
                        type="date"
                        className="form-control bg-transparent "
                        placeholder="Enter Description"
                        name="dateOfBirth"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={
                          validation.values.dateOfBirth?.split('T')?.[0] || ''
                        }
                        invalid={
                          validation.touched.dateOfBirth &&
                          validation.errors.dateOfBirth
                            ? true
                            : false
                        }
                      />
                    </div>
                    <div className="radio-toolbar mt-3">
                      <input
                        type="radio"
                        id="maleRadio"
                        name="radioFruit"
                        checked={'male' === validation.values.gender}
                        onChange={() => {
                          validation.setFieldValue('gender', 'male')
                        }}
                      />
                      <label className="me-1" htmlFor="maleRadio">
                        Male
                      </label>
                      <input
                        type="radio"
                        id="femaleRadio"
                        name="radioFruit"
                        checked={'female' === validation.values.gender}
                        onChange={() => {
                          validation.setFieldValue('gender', 'female')
                        }}
                      />
                      <label htmlFor="femaleRadio">Female</label>
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
              disabled={update_user?.loading}
              style={{ minWidth: '60px' }}
            >
              {update_user?.loading ? <CustomSpinner /> : 'Update'}
            </Button>
            <Button type="button" color="secondary" onClick={closeUpdateModel}>
              Close
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
      {/* --------------Delete Model-------------- */}
      <DeleteModal
        loading={delete_user?.loading}
        show={modelInfo?.deleteUser}
        onCloseClick={closeDeleteModel}
        onDeleteClick={() => dispatch(deleteUser(modelInfo?.deleteUserInfo))}
      />
    </React.Fragment>
  )
}

User.propTypes = {
  t: PropTypes.any,
  chartsData: PropTypes.any,
  onGetChartsData: PropTypes.func,
};

export default withTranslation()(User);
