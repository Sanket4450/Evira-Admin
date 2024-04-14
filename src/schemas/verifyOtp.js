import * as Yup from 'yup'

export const verifyOtpSchema = Yup.object({
  otp: Yup.string().required('Please Enter OTP').min(4, 'Enter Valid OTP'),
})
