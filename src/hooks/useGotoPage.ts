import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import { parseSearchParams } from 'src/utils/string'

type UseGotoPageConfig = {
  next: string | null
  previous: string | null
  pathName: string
}

export function useGotoPage({ next, previous, pathName }: UseGotoPageConfig) {
  const navigate = useNavigate()

  const handleGoToNext = useCallback(() => {
    if (next) {
      const queryParam = new URL(next).search
      navigate(`/${pathName}/${queryParam}`)
    }
  }, [next, navigate, pathName])

  const handleGoToPrevious = useCallback(() => {
    if (previous) {
      const queryParam = new URL(previous).search
      const param = parseSearchParams(queryParam)

      if (param.page === '1') {
        navigate(`/${pathName}`)
        return
      }
      navigate(`/${pathName}/${queryParam}`)
    }
  }, [previous, navigate, pathName])

  return { handleGoToNext, handleGoToPrevious }
}
