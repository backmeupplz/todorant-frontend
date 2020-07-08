export interface User {
  _id: string
  name: string
  email?: string
  facebookId?: string
  telegramId?: string
  appleSubId?: string

  token?: string
}
