// Dependencies
import { GoogleCalendarCredentials } from './../plugins/store'
import axios from 'axios'
import { User } from '../models/user'
import { Todo } from '../models/todo'
import { Tag } from '../models/tag'
import * as store from '../plugins/store'
import { TodoSection } from '../models/TodoSection'

const base = process.env.VUE_APP_API

export async function loginFacebook(accessToken: string) {
  return (
    await axios.post(`${base}/login/facebook`, {
      accessToken,
    })
  ).data as User
}

export async function loginGoogle(accessToken: string) {
  return (
    await axios.post(`${base}/login/google`, {
      accessToken,
    })
  ).data as User
}

export async function loginTelegram(loginInfo: any) {
  return (await axios.post(`${base}/login/telegram`, loginInfo)).data as User
}

export async function loginApple(loginInfo: any) {
  return (await axios.post(`${base}/login/apple`, loginInfo)).data as User
}

export async function telegramLoginRequest(uuid: string, id?: string) {
  return axios.post(`${base}/login/telegram_mobile`, { uuid, id })
}

export async function checkTelegramLoginRequest(uuid: string) {
  return axios.post<{ allowed?: boolean; user: User }>(
    `${base}/login/telegram_mobile_check`,
    { uuid }
  )
}

export async function mergeFacebook(user: User, accessToken: string) {
  return (
    await axios.post(
      `${base}/merge/facebook`,
      {
        accessToken,
      },
      {
        headers: getHeaders(user),
      }
    )
  ).data as User
}

export async function mergeGoogle(user: User, accessToken: string) {
  return (
    await axios.post(
      `${base}/merge/google`,
      {
        accessToken,
      },
      {
        headers: getHeaders(user),
      }
    )
  ).data as User
}

export async function mergeTelegram(user: User, loginInfo: any) {
  return (
    await axios.post(`${base}/merge/telegram`, loginInfo, {
      headers: getHeaders(user),
    })
  ).data as User
}

export async function postTodos(user: User, todos: Partial<Todo>[]) {
  return (
    await axios.post(
      `${base}/todo`,
      todos.map((todo) => {
        const todoCopy = { ...todo }
        if (todo.date) {
          todoCopy.monthAndYear = todo.date.substr(0, 7)
          todoCopy.date = todo.date.substr(8)
        }
        todoCopy.encrypted = !!store.password()
        return todoCopy
      }),
      {
        headers: getHeaders(user),
      }
    )
  ).data
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

export async function deleteTag(user: User, tag: Tag) {
  return axios.delete(`${base}/tag/${tag._id}`, {
    headers: getHeaders(user),
  })
}

export async function editTag(user: User, tag: Tag, color?: string) {
  return axios.put(
    `${base}/tag/${tag._id}`,
    {
      color: color || null,
    },
    {
      headers: getHeaders(user),
    }
  )
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
  skip: number,
  limit: number,
  hash?: string,
  queryString?: string,
  calendarView: boolean = false,
  period?: Date
) {
  const data = (
    await axios.get(`${base}/todo`, {
      headers: getHeaders(user),
      params: {
        completed,
        hash,
        skip,
        limit,
        today: period ? getStringFromDate(period) : getToday(),
        calendarView,
        date: getToday(),
        queryString,
      },
    })
  ).data as { todos: Todo[]; state: store.UserState; tags: Tag[] }
  store.setUserState(data.state)
  setTags(data.tags)
  return data.todos
}

export async function getCurrentTodo(user: User) {
  const data = (
    await axios.get(`${base}/todo/current`, {
      headers: getHeaders(user),
      params: {
        date: getToday(),
      },
    })
  ).data as {
    todosCount: number
    incompleteTodosCount: number
    todo?: Todo
    state: store.UserState
    tags: Tag[]
  }
  store.setUserState(data.state)
  setTags(data.tags)
  return data
}

export async function getTodosForExport(user: User) {
  const response = await axios.get(`${base}/data`, {
    headers: getHeaders(user),
  })
  return response.data as string
}

export async function rearrangeTodos(user: User, todos: TodoSection[]) {
  return axios.post(
    `${base}/todo/rearrange`,
    { todos, today: getToday() },
    { headers: getHeaders(user) }
  )
}

export enum Plan {
  monthly = 'monthly',
  yearly = 'yearly',
}
export async function getPlanSession(user: User, plan: Plan) {
  return (
    await axios.get(`${base}/subscription/session/${plan}`, {
      headers: getHeaders(user),
    })
  ).data as {
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

function setTags(tags: Tag[]) {
  store.setTags(
    tags.sort((a, b) => {
      return a.numberOfUses !== b.numberOfUses
        ? a.numberOfUses > b.numberOfUses
          ? -1
          : 1
        : a.tag < b.tag
        ? -1
        : 1
    })
  )
  const tagColors = tags.reduce((p, c) => {
    if (c.color) {
      p[c.tag] = c.color
    }
    return p
  }, {} as { [index: string]: string })
  store.setTagColors(tagColors)
}

export async function getReport(
  user: User,
  hash: string,
  startDate: null | string,
  endDate: null | string
) {
  return (
    await axios.get(`${base}/report`, {
      params: {
        hash: hash || '',
        startDate: startDate || undefined,
        endDate: endDate || undefined,
      },
      headers: getHeaders(user),
    })
  ).data as {
    completedTodosMap: { [index: string]: number }
    completedFrogsMap: { [index: string]: number }
  }
}

export async function getPublicReport(uuid: string) {
  return (await axios.get(`${base}/report/public/${uuid}`)).data as {
    meta: {
      completedTodosMap: { [index: string]: number }
      completedFrogsMap: { [index: string]: number }
    }
    user: string
    hash?: string
  }
}

export async function getSharedReport(user: User, hash: string) {
  return (
    await axios.get(`${base}/report/share${hash ? `?hash=${hash}` : ''}`, {
      headers: getHeaders(user),
    })
  ).data as {
    uuid: string
  }
}

export async function getCalendarAuthenticationURL(user: User) {
  return (
    await axios.get(`${base}/google/calendarAuthenticationURL?web=true`, {
      headers: getHeaders(user),
    })
  ).data as string
}

export async function authorizeGoogleCalendar(user: User, code: string) {
  return (
    await axios.post(
      `${base}/google/calendarAuthorize`,
      { code, web: true },
      {
        headers: getHeaders(user),
      }
    )
  ).data as GoogleCalendarCredentials
}

function getHeaders(user: User) {
  if (user.token) {
    const password = store.password()
    return password ? { token: user.token, password } : { token: user.token }
  } else {
    return undefined
  }
}

export function getToday() {
  return getStringFromDate(new Date())
}

export function getStringFromDate(date: Date) {
  return `${date.getFullYear()}-${
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
  }-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`
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

export async function getVersion() {
  return (await axios.get(`${process.env.VUE_APP_WEBSITE}/version.json`)).data
    .version as string
}

export async function getHeroPoints(user: User) {
  const response = await axios.get(`${base}/hero`, {
    headers: getHeaders(user),
  })
  return response.data.points
}

export async function addHeroPoints(user: User, points: number) {
  axios.post(
    `${base}/hero`,
    {
      points: points,
    },
    {
      headers: getHeaders(user),
    }
  )
}

export async function initializeHeroPoints(user: User, points: number) {
  axios.post(
    `${base}/hero/initialize`,
    {
      points: points,
    },
    {
      headers: getHeaders(user),
    }
  )
}
