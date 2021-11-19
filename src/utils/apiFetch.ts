import { config } from '../config'

interface RequestOptions extends RequestInit {
  isFullUrl?: boolean
}

const apiBaseUrl = config('apiBaseUrl')


export async function apiFetch<T>(
  url: string,
  opts?: RequestOptions,
): Promise<T> {
  if (opts && !opts.isFullUrl && !apiBaseUrl) {
    throw new Error('API URL not set')
  }

  opts = opts || {}
  opts.headers = { 'content-type': 'application/json', ...opts.headers }

  const apiUrl = opts.isFullUrl ? url : `${apiBaseUrl}${url}`
  
  const res = await fetch(apiUrl, opts)
  return await res.json()
}
