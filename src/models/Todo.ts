import { User } from '@/models/User'

export interface Todo {
  _tempSyncId: string
  _id?: string
  createdAt: Date
  updatedAt: Date

  text: string
  completed: boolean
  frog: boolean

  frogFails: number

  monthAndYear: string
  date: string
  time?: string

  encrypted: boolean

  order?: number

  skipped?: boolean

  deleted?: boolean

  delegate?: User
  delegator?: User
}
