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
