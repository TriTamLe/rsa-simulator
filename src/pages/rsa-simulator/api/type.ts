export type AccountToGenerateKey = {
  email: string
  password: string
}

export type GeneralError = {
  message: string
  success: boolean
  errorId: string
  errors: string[]
}

export type RequestToEncrypt = {
  dataToEncrypt: string
  publicKey: string
}

export type RequestToDecrypt = {
  email: string
  password: string
  encryptedData: string
  privateKey: string
}
