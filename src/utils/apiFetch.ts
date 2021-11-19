import { config } from '../config'
import { ApiResponse } from '../types'

const apiBaseUrl = config('apiBaseUrl')


export async function apiFetch<T>(
  path: string,
  opts?: RequestInit,
): Promise<ApiResponse<T>> {
  if (apiBaseUrl === null) {
    throw new Error('API URL not set')
  }

  opts = opts || {}
  opts.headers = { 'content-type': 'application/json', ...opts.headers }
  
  const res = await fetch(`${apiBaseUrl}${path}`, opts)
  return await res.json()
}
