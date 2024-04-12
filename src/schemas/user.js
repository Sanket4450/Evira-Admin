import * as Yup from 'yup'

export const emailSchema = Yup.object({
  email: Yup.string().required('Please Enter Email'),
})

export const userSchema = Yup.object({
  name: Yup.string().required('Please Enter Name'),
  description: Yup.string().required('Please Enter Description'),
})
