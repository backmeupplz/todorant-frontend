// Dependencies
import axios from 'axios'
import { User } from '../models/user'
import { Todo } from '../models/todo'

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
  const todoCopy = { ...todo }
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

export async function undoTodo(user: User, todo: Todo) {
  return axios.put(
    `${base}/todo/${todo._id}/undone`,
    {},
    {
      headers: getHeaders(user),
    }
  )
}

export async function getTodos(user: User, completed: boolean = false) {
  return (await axios.get(`${base}/todo`, {
    headers: getHeaders(user),
    params: {
      completed,
    },
  })).data as Todo[]
}

function getHeaders(user: User) {
  if (user.token) {
    return { token: user.token }
  } else {
    return undefined
  }
}
