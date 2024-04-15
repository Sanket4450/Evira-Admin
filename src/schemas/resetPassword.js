import * as Yup from 'yup'

export const resetPasswordSchema = Yup.object({
  password: Yup.string()
    .required('Please Enter Password')
    .min(8, 'Password must be at least 8 characters'),
  confirm_password: Yup.string()
    .required('Please Confirm Password')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
})
