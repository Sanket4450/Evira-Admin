import * as Yup from 'yup'

export const userSchema = Yup.object({
  email: Yup.string().email('Invalid Email').required('Please Enter Email'),
  fullName: Yup.string()
    .max(30, 'Full name should not exceed 30 characters')
    .required('Please Enter Full name'),
  nickName: Yup.string()
    .max(15, 'Nick name should not exceed 15 characters')
    .required('Please Enter Nick name'),
  mobile: Yup.number()
    .min(10 ** 9, 'Invalid Mobile Number')
    .max(10 ** 10 - 1, 'Invalid Mobile Number'),
  dateOfBirth: Yup.date('Invalid Date of Birth'),
  gender: Yup.string(),
})
