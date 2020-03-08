// @ts-ignore
import xhr from './xhr'
import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import { buildURL } from '../helpers/url'
import { transformRequest, transformResponse } from '../helpers/data'
import { processHeaders } from '../helpers/headers'

export default function dispathRequest(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config).then(res => {
    return transformResponse(res)
  })
}

// 中间件
function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
}

// 处理url
function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url, params)
}

// 处理data
function transformRequestData(config: AxiosRequestConfig): any {
  return transformRequest(config.data)
}

// 处理headers
function transformHeaders(config: AxiosRequestConfig): any {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

// 转换返回的data
function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transformResponse(res.data)
  return res
}