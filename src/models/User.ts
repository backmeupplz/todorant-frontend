export interface User {
  _id: string
  name: string
  email?: string
  facebookId?: string
  telegramId?: string
  appleSubId?: string
  susbcriptionId?: string
  appleReceipt?: string
  googleReceipt?: string
  isPerpetualLicense?: boolean

  token?: string
}
