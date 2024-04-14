import * as Yup from 'yup'

export const offerSchema = Yup.object().shape({
  startDate: Yup.string().required('Start Date is required'),
  endDate: Yup.string().required('End Date is required'),
  discountPercentage: Yup.number()
    .max(90)
    .required('Discount Percentage is required')
    .integer(),
})
