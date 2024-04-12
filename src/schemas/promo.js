import * as Yup from 'yup'

export const promoCodeSchema = Yup.object({
  title: Yup.string().required('Please Enter Code'),
  description: Yup.string().required('Please Enter Description'),
})

export const promoCodeFullSchema = Yup.object({
  title: Yup.string().required('Please Enter Code'),
  description: Yup.string().required('Please Enter Description'),
  discountPercentage: Yup.string().required('Please Enter Discount Percentage'),
  maxUses: Yup.string().required('Please Enter Max User'),
  validFrom: Yup.string().required('Please Enter End Date'),
  validUntil: Yup.string().required('Please Enter Start Date'),
})
