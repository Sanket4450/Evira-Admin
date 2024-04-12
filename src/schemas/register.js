import * as Yup from 'yup'

export const registerSchema = Yup.object({
  email: Yup.string().required('Please Enter Your Email'),
  username: Yup.string().required('Please Enter Your Username'),
  password: Yup.string().required('Please Enter Your Password'),
})
