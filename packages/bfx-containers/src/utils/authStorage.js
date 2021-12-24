import CryptoJS from 'crypto-js'

import { secretPassphrase } from '../functions/config.selectors'

const SESSION_STORAGE_API_KEY = 'USER_API_INFO_1'
const SESSION_STORAGE_API_SECRET = 'USER_API_INFO_2'

export const saveAPICredentials = (key, secret) => {
  const encryptedKey = CryptoJS.AES.encrypt(key, secretPassphrase).toString()
  const encryptedSecret = CryptoJS.AES.encrypt(secret, secretPassphrase).toString()
  sessionStorage.setItem(SESSION_STORAGE_API_KEY, encryptedKey)
  sessionStorage.setItem(SESSION_STORAGE_API_SECRET, encryptedSecret)
}

export const removeAPICredentials = () => {
  sessionStorage.removeItem(SESSION_STORAGE_API_KEY)
  sessionStorage.removeItem(SESSION_STORAGE_API_SECRET)
}

export const getAPICredentials = () => {
  const encryptedKey = sessionStorage.getItem(SESSION_STORAGE_API_KEY) || ''
  const encryptedSecret = sessionStorage.getItem(SESSION_STORAGE_API_SECRET) || ''
  const decryptedKey = CryptoJS.AES.decrypt(encryptedKey, secretPassphrase) || ''
  const decryptedSecret = CryptoJS.AES.decrypt(encryptedSecret, secretPassphrase) || ''

  return [
    decryptedKey.toString(CryptoJS.enc.Utf8),
    decryptedSecret.toString(CryptoJS.enc.Utf8),
  ]
}
