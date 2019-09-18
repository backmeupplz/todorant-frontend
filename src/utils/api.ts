// Dependencies
import axios from 'axios'
import { User } from '../models/user'
import { Todo } from '../models/todo'
import * as store from '../plugins/store'
import { TodoSection } from '../models/TodoSection'

const base = process.env.VUE_APP_API

export async function loginFacebook(accessToken: string) {
  return (await axios.post(`${base}/login/facebook`, {
    accessToken,
  })).data as User
}

export async function loginGoogle(accessToken: string) {
  return (await axios.post(`${base}/login/google`, {
    accessToken,
  })).data as User
}

export async function loginTelegram(loginInfo: any) {
  return (await axios.post(`${base}/login/telegram`, loginInfo)).data as User
}

export async function mergeFacebook(user: User, accessToken: string) {
  return (await axios.post(
    `${base}/merge/facebook`,
    {
      accessToken,
    },
    {
      headers: getHeaders(user),
    }
  )).data as User
}

export async function mergeGoogle(user: User, accessToken: string) {
  return (await axios.post(
    `${base}/merge/google`,
    {
      accessToken,
    },
    {
      headers: getHeaders(user),
    }
  )).data as User
}

export async function mergeTelegram(user: User, loginInfo: any) {
  return (await axios.post(`${base}/merge/telegram`, loginInfo, {
    headers: getHeaders(user),
  })).data as User
}

export async function postTodos(user: User, todos: Partial<Todo>[]) {
  return (await axios.post(
    `${base}/todo`,
    todos.map(todo => {
      const todoCopy = { ...todo }
      if (todo.date) {
        todoCopy.monthAndYear = todo.date.substr(0, 7)
        todoCopy.date = todo.date.substr(8)
      }
      return todoCopy
    }),
    {
      headers: getHeaders(user),
    }
  )).data
}

export async function editTodo(user: User, todo: Todo) {
  const todoCopy = { ...todo, today: getToday() }
  if (
    (todo.date && todo.date.length !== 2) ||
    (todo.monthAndYear && todo.monthAndYear.length !== 7)
  ) {
    if (todo.date) {
      todoCopy.monthAndYear = todo.date.substr(0, 7)
      todoCopy.date = todo.date.substr(8)
    }
  }
  return axios.put(`${base}/todo/${todo._id}`, todoCopy, {
    headers: getHeaders(user),
  })
}

export async function deleteTodo(user: User, todo: Todo) {
  return axios.delete(`${base}/todo/${todo._id}`, {
    headers: getHeaders(user),
  })
}

export async function completeTodo(user: User, todo: Todo) {
  return axios.put(
    `${base}/todo/${todo._id}/done`,
    {},
    {
      headers: getHeaders(user),
    }
  )
}

export async function skipTodo(user: User, todo: Todo) {
  return axios.put(
    `${base}/todo/${todo._id}/skip`,
    {},
    {
      headers: getHeaders(user),
    }
  )
}

export async function undoTodo(user: User, todo: Todo) {
  return axios.put(
    `${base}/todo/${todo._id}/undone`,
    {},
    {
      headers: getHeaders(user),
    }
  )
}

export async function getTodos(
  user: User,
  completed: boolean = false,
  hash?: string
) {
  await updateState(user)
  return (await axios.get(`${base}/todo`, {
    headers: getHeaders(user),
    params: {
      completed,
      hash,
    },
  })).data as Todo[]
}

export async function getCurrentTodo(user: User) {
  await updateState(user)
  const now = new Date()
  return (await axios.get(`${base}/todo/current`, {
    headers: getHeaders(user),
    params: {
      date: `${now.getFullYear()}-${
        now.getMonth() + 1 < 10 ? `0${now.getMonth() + 1}` : now.getMonth() + 1
      }-${now.getDate() < 10 ? `0${now.getDate()}` : now.getDate()}`,
    },
  })).data as {
    todosCount: number
    incompleteTodosCount: number
    todo?: Todo
  }
}

export async function rearrangeTodos(user: User, todos: TodoSection[]) {
  return axios.post(
    `${base}/todo/rearrange`,
    { todos },
    { headers: getHeaders(user) }
  )
}

export enum Plan {
  monthly = 'monthly',
  yearly = 'yearly',
}
export async function getPlanSession(user: User, plan: Plan) {
  return (await axios.get(`${base}/subscription/session/${plan}`, {
    headers: getHeaders(user),
  })).data as {
    session: string
  }
}

export async function cancelSubscription(user: User) {
  return axios.post(`${base}/subscription/cancel`, undefined, {
    headers: getHeaders(user),
  })
}

export async function setSettings(user: User, settings: store.Settings) {
  return axios.post(`${base}/settings`, settings, {
    headers: getHeaders(user),
  })
}

async function updateState(user: User) {
  const userState = (await axios.get(`${base}/state`, {
    headers: getHeaders(user),
    params: {
      date: getToday(),
    },
  })).data as store.UserState
  store.setUserState(userState)
}

function getHeaders(user: User) {
  if (user.token) {
    return { token: user.token }
  } else {
    return undefined
  }
}

export function getToday() {
  const now = new Date()
  return `${now.getFullYear()}-${
    now.getMonth() + 1 < 10 ? `0${now.getMonth() + 1}` : now.getMonth() + 1
  }-${now.getDate() < 10 ? `0${now.getDate()}` : now.getDate()}`
}

export function getTomorrow() {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  return `${tomorrow.getFullYear()}-${
    tomorrow.getMonth() + 1 < 10
      ? `0${tomorrow.getMonth() + 1}`
      : tomorrow.getMonth() + 1
  }-${tomorrow.getDate() < 10 ? `0${tomorrow.getDate()}` : tomorrow.getDate()}`
}
