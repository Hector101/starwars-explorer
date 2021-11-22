import { config } from '../config'

const apiBaseUrl = config('apiBaseUrl')

export async function apiFetch<T>(
  path: string,
  opts?: RequestInit,
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
