import { postApi } from '../common'
import * as constants from '../constants'
import { headers } from '../../helpers/auth'

export const uploadFile = async (data) => {
  const response = await postApi(constants.UPLOAD_FILE, data, {
    headers: { ...headers, 'Content-Type': 'multipart/form-data'},
  })
  return response.results
}
