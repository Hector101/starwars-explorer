import { config } from '../config'

interface RequestOptions extends RequestInit {
  isFullUrl?: boolean
}

const apiBaseUrl = config('apiBaseUrl')


export async function apiFetch<T>(
  path: string,
  opts?: RequestOptions,
): Promise<T> {
  if (apiBaseUrl === null) {
    throw new Error('API URL not set')
  }

  opts = opts || {}
  opts.headers = { 'content-type': 'application/json', ...opts.headers }

  const apiUrl = `${apiBaseUrl}${path}`
  
  const res = await fetch(apiUrl, opts)
  return await res.json()
}
