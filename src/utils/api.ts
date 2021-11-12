import { GoogleCalendarCredentials } from '@/models/GoogleCalendarCredentials'
import axios from 'axios'
import { User } from '@/models/User'
import { Todo } from '@/models/Todo'
import { Tag } from '@/models/Tag'
import { TodoSection } from '@/models/TodoSection'
import store from '@/store'
import { getModule } from 'vuex-module-decorators'
import TagsStore from '@/store/modules/TagsStore'
import UserStore from '@/store/modules/UserStore'
import SettingsStore from '@/store/modules/SettingsStore'
import HeroStore from '@/store/modules/HeroStore'
import AppStore from '@/store/modules/AppStore'
import { getTodayWithStartOfDay } from '@/utils/time'

const base = import.meta.env.VITE_VUE_APP_API

export async function loginFacebook(accessToken: string) {
  return (
    await axios.post(`${base}/login/facebook`, {
      accessToken,
    })
  ).data as User
}

export async function loginGoogle(accessToken: string) {
  return (
    await axios.post(`${base}/login/google-firebase`, {
      accessToken,
    })
  ).data as User
}

export async function loginTelegram(loginInfo: any) {
  return (await axios.post(`${base}/login/telegram`, loginInfo)).data as User
}

export async function loginApple(loginInfo: any) {
  return (await axios.post(`${base}/login/apple-firebase`, loginInfo))
    .data as User
}

export async function loginToken(token: string) {
  return (await axios.post(`${base}/login/token`, { token })).data as User
}

export async function mergeTelegram(user: User, loginInfo: any) {
  return (
    await axios.post(`${base}/merge/telegram`, loginInfo, {
      headers: getHeaders(user),
    })
  ).data as { telegramId: string }
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

export async function generateQrUuid() {
  return (await axios.get(`${base}/login/generate_uuid`)).data.uuid as string
}

export async function checkQrLogin(uuid: string) {
  return (await axios.post(`${base}/login/qr_check`, { uuid })).data
    .token as string
}

export async function postEpics(user: User, epics: Tag[]) {
  return (
    await axios.post(
      `${base}/tag/rearrage`,
      { epics },
      {
        headers: getHeaders(user),
      }
    )
  ).data
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
        todoCopy.encrypted =
          !!(store as any).state.UserStore.password && !todoCopy.delegator
        return todoCopy
      }),
      {
        headers: getHeaders(user),
      }
    )
  ).data
}

function getTimeString(now: Date) {
  const timeArr = [
    `${0 + now.getHours()}`,
    `${0 + now.getMinutes()}`,
  ].map((item) => item.slice(-2))
  const time = `${timeArr[0]}:${timeArr[1]}`
  return time
}

export async function editTodo(user: User, todo: Todo) {
  const now = getTodayWithStartOfDay()

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
  const time = getTimeString(new Date())
  return (
    await axios.put(`${base}/todo/${todo._id}`, todoCopy, {
      headers: getHeaders(user),
      params: {
        date: getStringFromDate(now),
        time: time,
      },
    })
  ).data as { incompleteFrogsExist: boolean }
}

export async function deleteTodo(todo: Todo) {
  const user = (store as any).state.UserStore.user
  if (!user) {
    throw new Error('No user')
  }
  return axios.delete(`${base}/todo/${todo._id}`, {
    headers: getHeaders(user),
  })
}

export async function deleteTag(user: User, tag: Tag) {
  return axios.delete(`${base}/tag/${tag._id}`, {
    headers: getHeaders(user),
  })
}

export async function editTag(
  user: User,
  tag: Tag,
  color?: string,
  epic?: boolean,
  epicGoal?: number,
  epicCompleted?: boolean,
  newEpicName?: string
) {
  return axios.put(
    `${base}/tag/${tag._id}`,
    {
      color: color || null,
      epic: epic || null,
      epicGoal: epicGoal || null,
      epicCompleted: epicCompleted || null,
      newName: newEpicName || null,
    },
    {
      headers: getHeaders(user),
    }
  )
}

export async function unEpic(user: User, tag: Tag) {
  return axios.put(
    `${base}/tag/unEpic/${tag._id}`,
    {},
    {
      headers: getHeaders(user),
    }
  )
}

export async function deleteAllTags() {
  const user = (store as any).state.UserStore.user
  if (!user) {
    throw new Error('No user')
  }
  return axios.delete(`${base}/tag/all`, {
    headers: getHeaders(user),
  })
}

export async function completeTodo(user: User, todo: Todo) {
  const now = getTodayWithStartOfDay()

  return (
    await axios.put(
      `${base}/todo/${todo._id}/done`,
      {},
      {
        headers: getHeaders(user),
        params: {
          date: getStringFromDate(now),
        },
      }
    )
  ).data as { incompleteFrogsExist: boolean }
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
  const time = getTimeString(new Date())
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
        time: time,
        queryString,
      },
    })
  ).data as {
    todos: Todo[]
    state: UserStore
    tags: Tag[]
    points: number
  }
  setSettingsFromServer(data.state)
  getModule(UserStore, store).setUserStore(data.state)
  setTags(data.tags)
  getModule(HeroStore, store).setPoints(data.points)
  return data.todos
}

export async function getCurrentTodo(user: User) {
  const now = getTodayWithStartOfDay()
  const date = getStringFromDate(now)
  const time = getTimeString(now)

  const data = (
    await axios.get(`${base}/todo/current`, {
      headers: getHeaders(user),
      params: {
        date: date,
        time: time,
      },
    })
  ).data as {
    todosCount: number
    incompleteTodosCount: number
    todo?: Todo
    state: UserStore & { userInfo: { name: string } }
    tags: Tag[]
    points: number
  }
  setSettingsFromServer(data.state)
  getModule(UserStore, store).setUserStore(data.state)
  getModule(UserStore, store).setUserName(data.state.userInfo.name)
  setTags(data.tags)
  getModule(HeroStore, store).setPoints(data.points)
  return data
}

export async function getTodosForExport(user: User) {
  const response = await axios.get(`${base}/data`, {
    headers: getHeaders(user),
  })
  return response.data as string
}

export async function rearrangeTodos(user: User, todos: TodoSection[]) {
  const time = getTimeString(new Date())
  return axios.post(
    `${base}/todo/rearrange`,
    { todos, today: getToday(), time: time },
    { headers: getHeaders(user) }
  )
}

export enum Plan {
  monthly = 'monthly',
  yearly = 'yearly',
}
export async function getPlanSession(user: User, plan: Plan) {
  return (
    await axios.post(
      `${base}/subscription/session/${plan}`,
      { locale: getModule(AppStore, store).language },
      {
        headers: getHeaders(user),
      }
    )
  ).data as {
    session: string
  }
}

export async function manageSubscriptionUrl() {
  const user = (store as any).state.UserStore.user
  if (!user) {
    throw new Error('No user')
  }
  return (
    await axios.get<{ url: string }>(`${base}/subscription/manageUrl`, {
      headers: getHeaders(user),
    })
  ).data.url
}

export async function setSettings(user: User, settings: object) {
  return axios.post(`${base}/settings`, settings, {
    headers: getHeaders(user),
  })
}

export async function setUserName(user: User, name: object) {
  return axios.post(`${base}/settings/username`, name, {
    headers: getHeaders(user),
  })
}

function setTags(tags: Tag[]) {
  getModule(TagsStore, store).setTags(
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
  getModule(TagsStore, store).setTagColors(tagColors)
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

export async function resetDelegateToken() {
  const user = (store as any).state.UserStore.user
  if (!user) {
    throw new Error('No user')
  }
  return (
    await axios.post(
      `${base}/delegate/generateToken`,
      {},
      {
        headers: getHeaders(user),
      }
    )
  ).data as string
}

export async function getUnacceptedDelegated() {
  const user = (store as any).state.UserStore.user
  if (!user) {
    throw new Error('No user')
  }
  return (
    await axios.get(`${base}/delegate/unaccepted`, {
      headers: getHeaders(user),
    })
  ).data as Todo[]
}

export async function getDelegatedTodos() {
  const user = (store as any).state.UserStore.user
  if (!user) {
    throw new Error('No user')
  }
  return (
    await axios.get(`${base}/delegate/todos`, {
      headers: getHeaders(user),
    })
  ).data as Todo[]
}

export async function deleteDelegate(id: string) {
  const user = (store as any).state.UserStore.user
  if (!user) {
    throw new Error('No user')
  }
  return (
    await axios.delete(`${base}/delegate/delegate/${id}`, {
      headers: getHeaders(user),
    })
  ).data as string
}

export async function deleteDelegator(id: string) {
  const user = (store as any).state.UserStore.user
  if (!user) {
    throw new Error('No user')
  }
  return (
    await axios.delete(`${base}/delegate/delegator/${id}`, {
      headers: getHeaders(user),
    })
  ).data as string
}

export async function useDelegateToken(user: User, token: string) {
  return axios.post(
    `${base}/delegate/useToken`,
    { token },
    {
      headers: getHeaders(user),
    }
  )
}

export async function acceptDelegateTodo(todo: Todo) {
  const user = (store as any).state.UserStore.user
  if (!user) {
    throw new Error('No user')
  }
  return axios.post(
    `${base}/delegate/accept/${todo._id}`,
    {},
    {
      headers: getHeaders(user),
    }
  )
}

function getHeaders(user: User) {
  if (user.token) {
    const password = (store as any).state.UserStore.password
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
  return (
    await axios.get(`${import.meta.env.VITE_VUE_APP_WEBSITE}/version.json`)
  ).data.version as string
}

function setSettingsFromServer(state: any) {
  const settings = state.settings
  const settingsStore = getModule(SettingsStore, store)
  settingsStore.setSettingsStore(settings)
  const appStore = getModule(AppStore, store).setLanguage(settings.language)
}
