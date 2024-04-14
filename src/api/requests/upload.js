import { postApi } from '../common'
import * as constants from '../constants'
import { getHeaders } from '../../helpers/auth'

export const uploadFile = async (data) => {
  const response = await postApi(constants.UPLOAD_FILE, data, {
    headers: { ...getHeaders(), 'Content-Type': 'multipart/form-data'},
  })
  return response.results
}
