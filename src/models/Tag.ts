export interface Tag {
  _id: string
  createdAt: Date
  updatedAt: Date

  tag: string
  color?: string
  numberOfUses: number
}
