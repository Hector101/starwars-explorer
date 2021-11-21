import { StringDict } from 'src/types'

export function wordify(str: string, replacementChar = ' ') {
  return str.toLowerCase().replace(/[^a-z0-9-]+/g, replacementChar)
}

export function parseSearchParams(search: string): StringDict {
  if (!search) {
    return {}
  }

  return search
    .replace(/^\?/, '')
    .split('&')
    .map((param) => param.split('='))
    .reduce(
      (acc, [k, v]) => ({
        ...acc,
        [decodeURIComponent(k)]: decodeURIComponent(v),
      }),
      {} as StringDict
    )
}
