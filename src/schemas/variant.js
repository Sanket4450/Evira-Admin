import * as Yup from 'yup'

export const variantSchema = Yup.object().shape({
  size: Yup.string(),
  color: Yup.string(),
  price: Yup.number().required('Price is required').integer(),
  quantity: Yup.number().required('Quantity is required').integer(),
})
