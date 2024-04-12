import * as Yup from 'yup'

export const resetPasswordSchema = Yup.object({
  password: Yup.string()
    .required('Please Enter Password')
    .min(6, 'Password must be at least 6 characters'),
  confirm_password: Yup.string()
    .required('Please Confirm Password')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
})
