import type { AxiosError } from 'axios'

import { useMutation } from '@tanstack/react-query'

import { apiUrls } from '@/constants'
import { axios } from '@/lib/axios'
import { GeneralError, RequestToEncrypt } from './type'

export const encryptData = async (data: RequestToEncrypt) => {
  const result = await axios.post(apiUrls.rsa.encrypt, data)

  return result.data
}

export const useDataEncryption = () => {
  return useMutation({
    mutationFn: encryptData,
    onError: (error: AxiosError<GeneralError>) => {
      return error
    },
  })
}
