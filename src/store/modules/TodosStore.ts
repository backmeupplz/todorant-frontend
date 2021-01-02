import { serverBus } from '@/main'
import { Todo } from '@/models/Todo'
import { TodoSection } from '@/models/TodoSection'
import { getStringFromDate, getToday } from '@/utils/api'
import { db } from '@/utils/db'
import { decrypt, encrypt } from '@/utils/encryption'
import { isTodoOld } from '@/utils/isTodoOld'
import { sockets } from '@/utils/sockets'
import { v4 } from 'uuid'
import { Mutate } from 'vuetify/lib'
import {
  VuexModule,
  Module,
  Action,
  Mutation,
  getModule,
} from 'vuex-module-decorators'
const fuzzysort = require('fuzzysort')

@Module({ namespaced: true, name: 'TodosStore' })
export default class TodosStore extends VuexModule {
  lastSyncDate: Date | undefined = undefined

  @Mutation
  setLastSyncDate(newDate: Date) {
    this.lastSyncDate = newDate
  }

  @Action
  async getTodos({
    completed = false,
    skip,
    limit,
    hash,
    queryString,
    calendarView = false,
    period,
  }: {
    completed: boolean
    skip: number
    limit: number
    hash?: string
    queryString?: string
    calendarView: boolean
    period?: Date
  }) {
    const neededTodos = await db.todos
      .filter((todo) => {
        return (
          todo.completed === completed &&
          !todo.deleted &&
          !todo.deleted &&
          !todo.delegator
        )
      })
      .sortBy('order')
    const today = getToday()
    const hashes = hash?.toLowerCase().split(',')
    let results = await neededTodos
    if (hashes) {
      for (const singleHash of hashes) {
        results = results.filter((todo) =>
          todo.text.toLowerCase().includes(decodeURI(singleHash))
        )
      }
    }
    if (queryString) {
      results = (
        await fuzzysort.goAsync(decodeURI(queryString), results, {
          key: 'text',
          threshold: -1000,
        })
      ).map((founded: any) => founded.obj)
    }
    if (!calendarView && period ? getStringFromDate(period) : getToday()) {
      if (skip !== undefined && limit !== undefined) {
        results = results.slice(skip, skip + limit)
      }
    } else {
      const monthAndYear = today.slice(0, 7)
      const monthAndYearMinusOne = monthAndYearPlus(monthAndYear, -1)
      const monthAndYearPlusOne = monthAndYearPlus(monthAndYear, 1)
      results = results.filter((todo) =>
        [monthAndYear, monthAndYearMinusOne, monthAndYearPlusOne].includes(
          todo.monthAndYear
        )
      )
    }
    return results
  }

  @Action
  async deleteTodo(todo: Todo) {
    todo.updatedAt = new Date()
    todo.deleted = true
    await db.todos.put(todo)
    // await db.todos.where('_tempSyncId').equals(todo._tempSyncId).delete()
  }

  @Action
  async completeTodo(todo: Todo) {
    todo.updatedAt = new Date()
    todo.completed = true
    await db.todos.put(todo)
  }

  @Action
  async addTodos(todos: Todo[]) {
    await db.todos.bulkPut(todos)
    serverBus.$emit('refreshRequested')
  }

  @Action
  async editTodo(todo: Todo) {
    if (!todo._id && !todo._tempSyncId) return
    let localTodo: Todo | undefined
    if (todo._id) {
      localTodo = await getTodoById(todo._id, false)
    } else {
      localTodo = await getTodoById(todo._tempSyncId, true)
    }
    const todoDateMonth = todo.date
    todo.date = todoDateMonth.substr(8, 2)
    todo.monthAndYear = todoDateMonth.substr(0, 7)
    const updatedTodo = Object.assign(localTodo, todo)
    updatedTodo.updatedAt = new Date()
    await db.todos.put(updatedTodo)
  }

  @Action
  async undoTodo(todo: Todo) {
    todo.completed = false
    todo.updatedAt = new Date()
    await db.todos.put(todo)
  }

  @Action
  async rearrangeTodos(todos: TodoSection[]) {
    const time = getTimeString(new Date())
    const today = getToday()

    const allOldTodos = await db.todos.filter((todo) => !todo.deleted).toArray()
    const oldTodoSections = allOldTodos.reduce((prev, cur) => {
      const title = cur.date
        ? `${cur.monthAndYear}-${cur.date}`
        : cur.monthAndYear
      prev[title] = (prev[title] || []).concat([cur])
      return prev
    }, {} as { [index: string]: Todo[] })
    const oldTodoMap = allOldTodos.reduce((prev, cur) => {
      const title = cur.date
        ? `${cur.monthAndYear}-${cur.date}`
        : cur.monthAndYear
      prev[cur._tempSyncId] = {
        title,
        todo: cur,
      }
      return prev
    }, {} as { [index: string]: { title: string; todo: Todo } })
    // Get new todo sections
    const newTodoSections = todos as {
      title: string
      todos: Todo[]
    }[]
    // Placeholder for modified todos
    const modifiedTodos = new Set<Todo>()
    // Placeholder for titles in need of reordering
    const titlesToReorder = new Set<string>()
    // Loop through new todo sections
    for (const section of newTodoSections) {
      let i = 0
      for (const newTodo of section.todos) {
        const newTodoTitle = section.title
        const oldTodo = oldTodoMap[newTodo._tempSyncId]
        if (!oldTodo) {
          i++
          continue
        }
        titlesToReorder.add(oldTodo.title)
        titlesToReorder.add(newTodoTitle)
        if (oldTodo.title !== newTodoTitle) {
          // const startTimeOfDay = ctx.state.user.settings.startTimeOfDay
          const startTimeOfDay = undefined
          if (isTodoOld(oldTodo.todo, today) && !!oldTodo.todo.date) {
            oldTodo.todo.frogFails += 1
            if (oldTodo.todo.frogFails >= 2) {
              oldTodo.todo.frog = true
            }
          }
          if (newTodoTitle.length === 7) {
            oldTodo.todo.date = newTodoTitle.substr(8)
          }
          oldTodo.todo.monthAndYear = newTodoTitle.substr(0, 7)
          modifiedTodos.add(oldTodo.todo)
        }
        if (oldTodo.todo.order !== i) {
          oldTodo.todo.order = i
          modifiedTodos.add(oldTodo.todo)
        }
        i++
      }
    }
    // Reorder
    const newTodoIdsMap = newTodoSections
      .reduce((prev, cur) => prev.concat(cur.todos), [] as Todo[])
      .map((t) => t._tempSyncId)
      .reduce((prev, cur) => {
        prev[cur] = true
        return prev
      }, {} as { [index: string]: boolean })
    for (const title of titlesToReorder) {
      const todos = oldTodoSections[title]
      if (!todos) {
        continue
      }
      const newTodos = todos.filter((t) => !!newTodoIdsMap[t._tempSyncId])
      const oldTodos = todos.filter((t) => !newTodoIdsMap[t._tempSyncId])
      let i = newTodos.length
      for (const todo of oldTodos) {
        if (todo.order !== i) {
          todo.order = i
          modifiedTodos.add(todo)
        }
      }
    }
    const todosToSave = Array.from(modifiedTodos.values()).map((todo) => {
      todo.updatedAt = new Date()
      return todo
    })
    await db.todos.bulkPut(todosToSave)
  }

  @Action
  async skipTodo(todo: Todo) {
    const neighbours = (
      await db.todos
        .where({
          monthAndYear: todo.monthAndYear,
          date: todo.date,
        })
        .sortBy('order')
    ).filter(
      (filteringTodo) =>
        filteringTodo.completed === todo.completed && todo.deleted === false
    )
    let startOffseting = false
    let offset = 0
    let foundValidNeighbour = false
    const todosToSave = [todo]
    for (const t of neighbours) {
      if (t._tempSyncId.toString() === todo._tempSyncId.toString()) {
        startOffseting = true
        continue
      }
      if (startOffseting) {
        offset++
        if (!t.skipped) {
          if (!t.order) t.order = 0
          t.order -= offset
          t.updatedAt = new Date()
          todosToSave.push(t)
          foundValidNeighbour = true
          break
        }
      }
    }
    if (!foundValidNeighbour) {
      neighbours.forEach((n, i) => {
        if (i > 0) {
          if (!n.order) n.order = 0
          n.order--
          n.updatedAt = new Date()
          todosToSave.push(n)
        }
      })
    }
    if (todo.order) {
      todo.updatedAt = new Date()
      todo.order += offset
    }
    // Edit and save
    todo.skipped = true
    await db.todos.bulkPut(todosToSave)
    //   await TodoModel.find({
    //     monthAndYear: todo.monthAndYear,
    //     date: todo.date,
    //     completed: todo.completed,
    //     deleted: false,
    //   })
    // ).sort(compareTodos(false))  }
  }

  @Action({ rawError: true })
  async onObjectFromServer({
    objects,
    pushBack,
    completeSync,
  }: {
    objects: Todo[]
    pushBack: (objects: Todo[]) => Promise<Todo[]>
    completeSync: () => void
  }) {
    const todosChangedOnServer = objects
    // Modify dates
    await Promise.all(
      todosChangedOnServer.map(async (todo) => {
        todo.updatedAt = new Date(todo.updatedAt)
        todo.createdAt = new Date(todo.createdAt)
        if (
          todo._id &&
          !todo._tempSyncId &&
          !(await getTodoById(todo._id, false))
        ) {
          todo._tempSyncId = v4()
        }
      })
    )
    // Get variables
    const serverTodosMap = todosChangedOnServer.reduce((p, c) => {
      if (c._id) {
        p[c._id] = c
      }
      return p
    }, {} as { [index: string]: Todo })
    const todosChangedLocally = await (this.lastSyncDate
      ? db.todos.filter((todo) => todo.updatedAt > this.lastSyncDate!).toArray()
      : db.todos.toArray())
    // Pull
    await db.transaction('rw', db.todos, async () => {
      for (const serverTodo of todosChangedOnServer) {
        if (!serverTodo._id) {
          continue
        }
        let localTodo = await getTodoById(serverTodo._id, false)
        if (localTodo) {
          if (localTodo.updatedAt < serverTodo.updatedAt) {
            const newTodo = Object.assign(localTodo, serverTodo)
            if (newTodo.encrypted) {
              newTodo.text = decrypt(newTodo.text)
            }
            db.todos.put(newTodo)
          }
        } else {
          const newTodo = {
            ...serverTodo,
            _exactDate: serverTodo.monthAndYear
              ? new Date(getTitle(serverTodo))
              : new Date(),
          }
          if (newTodo.encrypted) {
            newTodo.text = decrypt(newTodo.text)
          }
          db.todos.put(newTodo)
        }
      }
    })
    // Push
    const todosToPush = todosChangedLocally.filter((todo) => {
      if (!todo._id) {
        return true
      }
      const serverTodo = serverTodosMap[todo._id]
      if (serverTodo) {
        return todo.updatedAt > serverTodo.updatedAt
      } else {
        return true
      }
    })
    if (!todosToPush.length) {
      // Complete sync
      completeSync()
      return
    }
    // db.transaction('rw', db.todos, () => {
    //   for (const todoToPush of todosToPush) {
    //     if (!todoToPush._tempSyncId) {
    //       todoToPush._tempSyncId = uuid()
    //     }
    //   }
    // })
    const savedPushedTodos = await pushBack(
      todosToPush
        .map((v) => ({ ...v }))
        .map((v) => {
          if (v.encrypted) {
            v.text = encrypt(v.text)
          }
          return v
        }) as any
    )
    // Modify dates
    savedPushedTodos.forEach((todo) => {
      todo.updatedAt = new Date(todo.updatedAt)
      todo.createdAt = new Date(todo.createdAt)
    })
    db.transaction('rw', db.todos, async () => {
      for (const todo of savedPushedTodos) {
        if (!todo._tempSyncId) {
          continue
        }
        const localTodo = await getTodoById(todo._tempSyncId, true)
        if (localTodo) {
          const newTodo = Object.assign(localTodo, todo)
          if (newTodo.encrypted) {
            newTodo.text = decrypt(newTodo.text)
          }
          db.todos.put(newTodo)
          // localTodo._exactDate = localTodo.monthAndYear
          //   ? new Date(getTitle(localTodo))
          //   : new Date()
        }
      }
    })
    // Complete sync
    completeSync()
    // this.refreshTodos()
  }
}

export async function getTodoById(id: string, temp: boolean) {
  return temp
    ? await db.todos.get({ _tempSyncId: id })
    : await db.todos.get({ _id: id })
}

export function getTitle(todo: { monthAndYear?: string; date?: string }) {
  return `${todo.monthAndYear ? todo.monthAndYear : ''}${
    todo.date ? `-${todo.date}` : ''
  }`
}

export function monthAndYearPlus(monthAndYear: string, numberOfMonths: number) {
  let year = parseInt(monthAndYear.substr(0, 4), 10)
  let month = parseInt(monthAndYear.substr(5, 2), 10)
  month += numberOfMonths
  if (month <= 0) {
    year--
    month = 12 + month
  }
  if (month > 12) {
    year++
    month = month - 12
  }
  return `${year}-${month < 10 ? `0${month}` : month}`
}

function getTimeString(now: Date) {
  const timeArr = [
    `${0 + now.getHours()}`,
    `${0 + now.getMinutes()}`,
  ].map((item) => item.slice(-2))
  const time = `${timeArr[0]}:${timeArr[1]}`
  return time
}
