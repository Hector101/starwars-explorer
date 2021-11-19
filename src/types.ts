export type ApiResponse<P = {}> = {
  success: boolean
  payload: P
  status: number
  message: string
}
