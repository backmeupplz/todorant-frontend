import Cookies from 'js-cookie'

const domain = new URL('https://test.com').hostname

export function setCookie(name: string, value: any) {
  Cookies.set(name, value, {
    domain: domain,
    expires: 365,
  })
}

export function deleteCookie() {
  Cookies.remove('token', { domain: domain })
  Cookies.remove('password', { domain: domain })
  Cookies.remove('theme', { domain: domain })
}
