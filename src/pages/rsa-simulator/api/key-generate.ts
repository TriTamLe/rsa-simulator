import type { AxiosError } from 'axios'

import { useMutation } from '@tanstack/react-query'

import { apiUrls } from '@/constants'
import { axios } from '@/lib/axios'
import { AccountToGenerateKey, GeneralError } from './type'

export const generateKeyPair = async (data: AccountToGenerateKey) => {
  const result = await axios.post(apiUrls.rsa.keyGenerate, data)

  return result.data
}

export const useKeyGenerate = () => {
  return useMutation({
    mutationFn: generateKeyPair,
    onError: (error: AxiosError<GeneralError>) => {
      return error
    },
  })
}
