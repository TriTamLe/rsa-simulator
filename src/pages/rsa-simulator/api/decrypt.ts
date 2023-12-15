import type { AxiosError } from 'axios'

import { useMutation } from '@tanstack/react-query'

import { apiUrls } from '@/constants'
import { axios } from '@/lib/axios'
import { GeneralError, RequestToDecrypt } from './type'

export const dataToDecrypt = async (data: RequestToDecrypt) => {
  const result = await axios.post(apiUrls.rsa.decrypt, data)

  return result.data
}

export const useDataDecryption = () => {
  return useMutation({
    mutationFn: dataToDecrypt,
    onError: (error: AxiosError<GeneralError>) => {
      return error
    },
  })
}
