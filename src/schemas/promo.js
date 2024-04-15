import * as Yup from 'yup'

export const promoCodeSchema = Yup.object({
  title: Yup.string().required('Please Enter Title'),
  description: Yup.string().required('Please Enter Description'),
  discountPercentage: Yup.string().required('Please Enter Discount Percentage'),
  maxUses: Yup.string().required('Please Enter Max Uses'),
  validFrom: Yup.string().required('Please Enter End Date'),
  validUntil: Yup.string().required('Please Enter Start Date'),
})
