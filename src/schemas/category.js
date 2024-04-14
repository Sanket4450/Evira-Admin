import * as Yup from 'yup'

export const categorySchema = Yup.object({
  name: Yup.string().required('Please Enter Name'),
  description: Yup.string(),
})
