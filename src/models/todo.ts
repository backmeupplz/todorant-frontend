export interface Todo {
  _id: string
  createdAt: Date
  updatedAt: Date

  text: string
  completed: boolean
  frog: boolean

  monthAndYear: string
  date: string
  time?: string
}
