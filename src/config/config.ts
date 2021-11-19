export const CONFIG = {
  apiBaseUrl: process.env.REACT_APP_API_BASEURL as string,
} as const

export type Config = keyof typeof CONFIG
