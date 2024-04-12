import * as Yup from 'yup'

export const shippingTypeSchema = Yup.object({
  title: Yup.string().required('Please Enter title'),
  description: Yup.string().required('Please Enter Description'),
  charge: Yup.number().required('Please Enter Charge').integer(),
})
