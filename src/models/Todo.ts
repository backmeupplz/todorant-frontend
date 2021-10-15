import { User } from '@/models/User'

export interface Todo {
  _id: string
  createdAt: Date
  updatedAt: Date

  text: string
  completed: boolean
  frog: boolean
  repetitive: boolean

  frogFails: number
  futureSkips: number

  monthAndYear: string
  date: string
  time?: string

  encrypted: boolean

  order?: number

  user?: User
  delegator?: User
  delegateAccepted?: boolean
}
