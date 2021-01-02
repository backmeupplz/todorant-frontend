import { GoogleCalendarCredentials } from '@/models/GoogleCalendarCredentials'
import axios from 'axios'
import { User } from '@/models/User'
import { Todo } from '@/models/Todo'
import store from '@/store'
import { getModule } from 'vuex-module-decorators'
import AppStore from '@/store/modules/AppStore'

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

export async function getTodosForExport(user: User) {
  const response = await axios.get(`${base}/data`, {
    headers: getHeaders(user),
  })
  return response.data as string
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
  return (await axios.get(`${process.env.VUE_APP_WEBSITE}/version.json`)).data
    .version as string
}
