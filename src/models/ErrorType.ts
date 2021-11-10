export interface ResponseError extends Error {
  response?: {
    data: string
  }
}
