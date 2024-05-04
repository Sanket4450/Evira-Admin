import * as Yup from 'yup'

export const addCategorySchema = Yup.object({
  name: Yup.string().required('Please Enter Name'),
  description: Yup.string(),
})

export const updateCategorySchema = Yup.object({
  icon: Yup.string().required('Please Select Icon'),
  name: Yup.string().required('Please Enter Name'),
  description: Yup.string(),
})
