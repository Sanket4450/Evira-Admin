import * as Yup from 'yup'

export const addProductSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  category: Yup.string().required('Category is required'),
  description: Yup.string(),
  defaultVariant: Yup.object().shape({
    size: Yup.string(),
    color: Yup.string(),
    price: Yup.number().required('Price is required').integer(),
    quantity: Yup.number().required('Quantity is required').integer(),
  }),
})

export const updateProductSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  image: Yup.string().required('Image is required'),
  category: Yup.string().required('Category is required'),
  description: Yup.string(),
  defaultVariant: Yup.object().shape({
    size: Yup.string(),
    color: Yup.string(),
    price: Yup.number().required('Price is required').integer(),
    quantity: Yup.number().required('Quantity is required').integer(),
  }),
})
