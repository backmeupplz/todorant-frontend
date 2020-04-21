export interface Todo {
  _id: string
  createdAt: Date
  updatedAt: Date

  text: string
  completed: boolean
  frog: boolean

  frogFails: number

  monthAndYear: string
  date: string
  time?: string
}
