export interface Tag {
  _tempSyncId: string
  _id?: string
  deleted: boolean
  createdAt: Date
  updatedAt: Date

  tag: string
  color?: string
  numberOfUses: number

  epic?: boolean
  epicGoal?: number
  epicCompleted?: boolean
  epicPoints?: number
}
