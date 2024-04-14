import * as Yup from 'yup'

export const profileSchema = Yup.object({
  email: Yup.string().email('Invalid email address'),
  fullName: Yup.string(),
})
