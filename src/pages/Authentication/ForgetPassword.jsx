import PropTypes from 'prop-types'
import React from 'react'
import {
  Row,
  Col,
  Alert,
  Card,
  CardBody,
  Container,
  FormFeedback,
  Input,
  Label,
  Form,
} from 'reactstrap'
import OtpInput from 'react-otp-input'

//redux
import { useSelector, useDispatch } from 'react-redux'
import { createSelector } from 'reselect'
import { Link, useNavigate } from 'react-router-dom'
import withRouter from '../../components/Common/withRouter'

// Formik Validation
import { useFormik } from 'formik'
import {
  forgotPasswordSchema,
  verifyOtpSchema,
  resetPasswordSchema,
} from '../../schemas'

// action
import {
  userForgetPassword,
  userResetPassword,
  userVerifyOTP,
} from '../../store/actions'

// import images
import profile from '../../assets/images/profile-img.png'
import logo from '../../assets/images/logo.svg'
import lightlogo from '../../assets/images/logo-light.svg'

const ForgetPasswordPage = (props) => {
  const history = useNavigate()
  //meta title
  document.title = 'Forget Password | Evira - Admin & Dashboard'
  const dispatch = useDispatch()

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      email: '',
    },
    validationSchema: forgotPasswordSchema,
    onSubmit: (values) => {
      dispatch(userForgetPassword(values, props.history))
    },
  })

  const OTPvalidation = useFormik({
    enableReinitialize: true,

    initialValues: {
      otp: '',
    },
    validationSchema: verifyOtpSchema,
    onSubmit: (values) => {
      const payload = {
        otp: parseInt(values.otp),
        token: forgetSuccessMsg?.resetToken,
      }
      dispatch(userVerifyOTP(payload, props.history))
    },
  })

  const ForgetPasswordValidation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      password: '',
      confirm_password: '',
    },
    validationSchema: resetPasswordSchema,
    onSubmit: (values) => {
      const payload = {
        password: values.password,
        token: forgetSuccessMsg?.resetToken,
      }
      dispatch(userResetPassword(payload, history))
    },
  })

  const selectForgotPasswordState = (state) => state.ForgetPassword

  const ForgotPasswordProperties = createSelector(
    selectForgotPasswordState,
    (forgetPassword) => ({
      forgetError: forgetPassword.forgetError,
      forgetSuccessMsg: forgetPassword.forgetSuccessMsg,
      verifyOTPSuccessMsg: forgetPassword.verifyOTPSuccessMsg,
    })
  )

  const { forgetError, forgetSuccessMsg, verifyOTPSuccessMsg } = useSelector(
    ForgotPasswordProperties
  )
  return (
    <React.Fragment>
      <div className="home-btn d-none d-sm-block">
        <Link to="/" className="text-dark">
          <i className="bx bx-home h2" />
        </Link>
      </div>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">
                <div className="bg-primary-subtlebg-soft-primary">
                  <Row>
                    <Col xs={7}>
                      <div className="text-primary p-4">
                        <h5 className="text-primary">Welcome Back !</h5>
                        <p>Sign in to continue to Evira.</p>
                      </div>
                    </Col>
                    <Col className="col-5 align-self-end">
                      <img src={profile} alt="" className="img-fluid" />
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <div className="auth-logo">
                    <Link to="/" className="auth-logo-light">
                      <div className="avatar-md profile-user-wid mb-4">
                        <span className="avatar-title rounded-circle bg-light">
                          <img
                            src={lightlogo}
                            alt=""
                            className="rounded-circle"
                            height="34"
                          />
                        </span>
                      </div>
                    </Link>
                    <Link to="/" className="auth-logo-dark">
                      <div className="avatar-md profile-user-wid mb-4">
                        <span className="avatar-title rounded-circle bg-light">
                          <img
                            src={logo}
                            alt=""
                            className="rounded-circle"
                            height="34"
                          />
                        </span>
                      </div>
                    </Link>
                  </div>

                  {verifyOTPSuccessMsg?.verifyOtp ? (
                    <>
                      <div className="p-2">
                        {forgetError ? (
                          <Alert color="danger" style={{ marginTop: '13px' }}>
                            {forgetError}
                          </Alert>
                        ) : null}
                        <Form
                          className="form-horizontal"
                          onSubmit={(e) => {
                            e.preventDefault()
                            ForgetPasswordValidation.handleSubmit()
                            return false
                          }}
                        >
                          <div className="mb-3">
                            <Label className="form-label">New Password</Label>
                            <Input
                              name="password"
                              className="form-control"
                              placeholder="Enter New Password"
                              type="password"
                              onChange={ForgetPasswordValidation.handleChange}
                              onBlur={ForgetPasswordValidation.handleBlur}
                              value={
                                ForgetPasswordValidation.values.password || ''
                              }
                              invalid={
                                ForgetPasswordValidation.touched.password &&
                                ForgetPasswordValidation.errors.password
                                  ? true
                                  : false
                              }
                            />
                            {ForgetPasswordValidation.touched.password &&
                            ForgetPasswordValidation.errors.password ? (
                              <FormFeedback type="invalid">
                                {ForgetPasswordValidation.errors.password}
                              </FormFeedback>
                            ) : null}
                          </div>

                          <div className="mb-3">
                            <Label className="form-label">New Password</Label>
                            <Input
                              name="confirm_password"
                              className="form-control"
                              placeholder="Enter Confirm Password"
                              type="text"
                              onChange={ForgetPasswordValidation.handleChange}
                              onBlur={ForgetPasswordValidation.handleBlur}
                              value={
                                ForgetPasswordValidation.values
                                  .confirm_password || ''
                              }
                              invalid={
                                ForgetPasswordValidation.touched
                                  .confirm_password &&
                                ForgetPasswordValidation.errors.confirm_password
                                  ? true
                                  : false
                              }
                            />
                            {ForgetPasswordValidation.touched
                              .confirm_password &&
                            ForgetPasswordValidation.errors.confirm_password ? (
                              <FormFeedback type="invalid">
                                {
                                  ForgetPasswordValidation.errors
                                    .confirm_password
                                }
                              </FormFeedback>
                            ) : null}
                          </div>
                          <Row className="mb-3">
                            <Col className="text-end">
                              <button
                                className="btn btn-primary w-md "
                                type="submit"
                              >
                                Change Password
                              </button>
                            </Col>
                          </Row>
                        </Form>
                      </div>
                    </>
                  ) : (
                    <div className="p-2">
                      {forgetError ? (
                        <Alert color="danger" style={{ marginTop: '13px' }}>
                          {forgetError}
                        </Alert>
                      ) : null}
                      {!forgetError && forgetSuccessMsg?.message ? (
                        <Alert color="success" style={{ marginTop: '13px' }}>
                          {forgetSuccessMsg.message}
                        </Alert>
                      ) : null}

                      <Form
                        className="form-horizontal"
                        onSubmit={(e) => {
                          e.preventDefault()
                          validation.handleSubmit()
                          return false
                        }}
                      >
                        <div className="mb-3">
                          <Label className="form-label">Email</Label>
                          <Input
                            name="email"
                            className="form-control"
                            placeholder="Enter email"
                            type="email"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.email || ''}
                            invalid={
                              validation.touched.email &&
                              validation.errors.email
                                ? true
                                : false
                            }
                          />
                          {validation.touched.email &&
                          validation.errors.email ? (
                            <FormFeedback type="invalid">
                              {validation.errors.email}
                            </FormFeedback>
                          ) : null}
                        </div>
                        <Row className="mb-3">
                          <Col className="text-end">
                            <button
                              className="btn btn-primary w-md "
                              type="submit"
                            >
                              Reset
                            </button>
                          </Col>
                        </Row>
                      </Form>

                      {forgetSuccessMsg ? (
                        <Form
                          className="form-horizontal"
                          onSubmit={(e) => {
                            e.preventDefault()
                            OTPvalidation.handleSubmit()
                            return false
                          }}
                        >
                          <div className="mb-3">
                            <Label className="form-label">OTP</Label>
                            <OtpInput
                              value={OTPvalidation.values.otp}
                              // onChange={setOtp}
                              onChange={(e) => {
                                OTPvalidation.setFieldValue('otp', e)
                                return false
                              }}
                              numInputs={4}
                              renderSeparator={<span>-</span>}
                              renderInput={(props) => (
                                <input
                                  {...props}
                                  className="form-control"
                                  style={{
                                    width: '40px',
                                    height: '40px',
                                    textAlign: 'center',
                                  }}
                                />
                              )}
                            />
                            <Input
                              hidden
                              invalid={
                                OTPvalidation.touched.otp &&
                                OTPvalidation.errors.otp
                                  ? true
                                  : false
                              }
                            />
                            {OTPvalidation.touched.otp &&
                            OTPvalidation.errors.otp ? (
                              <FormFeedback type="invalid">
                                {OTPvalidation.errors.otp}
                              </FormFeedback>
                            ) : null}
                          </div>
                          <Row className="mb-3">
                            <Col className="text-end">
                              <button
                                className="btn btn-primary w-md "
                                type="submit"
                              >
                                Verify OTP
                              </button>
                            </Col>
                          </Row>
                        </Form>
                      ) : null}
                    </div>
                  )}
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  Go back to{' '}
                  <Link to="login" className="font-weight-medium text-primary">
                    Login
                  </Link>{' '}
                </p>
                <p>
                  © {new Date().getFullYear()} Evira. Crafted with{' '}
                  <i className="mdi mdi-heart text-danger" /> by Object Infotech
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

ForgetPasswordPage.propTypes = {
  history: PropTypes.object,
}

export default withRouter(ForgetPasswordPage)
