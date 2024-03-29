export interface Tag {
  _id: string
  createdAt: Date
  updatedAt: Date

  tag: string
  color?: string
  numberOfUses: number

  epic?: boolean
  epicGoal?: number
  epicCompleted?: boolean
  epicPoints?: number
  epicOrder?: number
}
