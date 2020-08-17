import Cookies from 'js-cookie'

const domain = new URL(process.env.VUE_APP_WEBSITE!).hostname

export function setCookie(name: string, value: any) {
  Cookies.set(name, value, {
    domain: domain,
    expires: 365
  })
}

export function deleteCookie() {
  Cookies.remove('token')
  Cookies.remove('password')
  Cookies.remove('theme')
}
