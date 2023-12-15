import Axios from 'axios'

import { API_URL } from '@/config/env-config'

export const axios = Axios.create({
  baseURL: API_URL,
})
