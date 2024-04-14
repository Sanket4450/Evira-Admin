import * as Yup from 'yup'

export const faqSchema = Yup.object({
  title: Yup.string().required('Please Enter Title'),
  description: Yup.string().required('Please Enter Description'),
})
