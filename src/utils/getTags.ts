import { l } from '@/utils/linkify'

export function getTags(text: string) {
  return l(text)
    .filter((m) => !!m.url && /^#[\u0400-\u04FFa-zA-Z_0-9/]+$/u.test(m.url))
    .map((m: any) => m.url.substr(1))
}
