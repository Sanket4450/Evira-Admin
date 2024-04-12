import * as Yup from 'yup'

export const profileSchema = Yup.object({
  username: Yup.string().required('Please Enter Your UserName'),
})
