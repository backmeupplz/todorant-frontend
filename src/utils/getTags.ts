import { Todo } from '@/models/Todo'
import { l, linkify } from '@/utils/linkify'

export function getTags(text: string) {
  return l(text)
    .filter((m) => !!m.url && /^#[\u0400-\u04FFa-zA-Z_0-9/]+$/u.test(m.url))
    .map((m: any) => m.url.substr(1))
}

export function getTagsFromArr(todos: Todo[]) {
  return todos
    .map((todo) => {
      let text = todo.text
      return linkify.match(text) || []
    })
    .reduce((p, c) => p.concat(c), [])
    .filter((m) => /^#[\u0400-\u04FFa-zA-Z_0-9/]+$/u.test(m.url))
    .map((m) => m.url.substr(1))
}
