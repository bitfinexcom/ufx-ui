/* eslint-disable import/prefer-default-export */
import axios from 'axios'

import { createErrorHandler } from './api_handlers'
import {
  apiUrl,
  corsProxyUrl,
} from './config.selectors'
import interceptor from './interceptor'

const DEFAULT_REQUEST_HEADERS = {
  Accept: '*/*',
  'Content-Type': 'application/json;charset=UTF-8',
}

const createApiInstance = (baseURL) => axios.create({
  baseURL: `${corsProxyUrl}https:${baseURL}`,
  headers: DEFAULT_REQUEST_HEADERS,
})

export const pubApi = createApiInstance(`//${apiUrl}`)
export const api = createApiInstance(`//${apiUrl}`)

let apiResponseInterceptor
let pubApiResponseInterceptor

const defaultErrorHandler = createErrorHandler()

// Request interceptors
// add interceptor to append auth headers
api.interceptors.request.use(interceptor(), defaultErrorHandler)

const removeResponseInterceptors = () => {
  api.interceptors.response.eject(apiResponseInterceptor)
  pubApi.interceptors.response.eject(pubApiResponseInterceptor)
}

const setupResponseInterceptors = (successHandler, errorHandler) => {
  apiResponseInterceptor = api.interceptors.response.use(successHandler, errorHandler)
  pubApiResponseInterceptor = pubApi.interceptors.response.use(successHandler, errorHandler)
}

export const setupHttpErrorHandlers = (store) => {
  // remove current interceptors
  removeResponseInterceptors()
  // create new errorHandlers with access to redux store
  const errorHandler = createErrorHandler(store)
  // setup new interceptors
  setupResponseInterceptors((response) => response, errorHandler)
}
