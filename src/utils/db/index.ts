import Dexie from 'dexie'
import 'dexie-observable'
import { DelegationUser } from '@/models/DelegationUser'
import { Todo } from '@/models/Todo'
import { Tag } from '@/models/Tag'

class Database extends Dexie {
  delegates: Dexie.Table<DelegationUser, string>
  delegators: Dexie.Table<DelegationUser, string>
  todos: Dexie.Table<Todo, string>
  tags: Dexie.Table<Tag, string>

  constructor() {
    super('Database')
    this.version(26).stores({
      delegates: '_id, name',
      delegators: '_id, name',
      todos:
        '&_tempSyncId, _id, createdAt, updatedAt, text, completed, frog, monthAndYear, date, delegate, delegator, order',
      tags:
        '&_tempSyncId, _id, createdAt, updatedAt, &tag, color, numberOfUses, epic, epicGoal, epicCompleted, epicPoints',
    })
    this.delegates = this.table('delegates')
    this.delegators = this.table('delegators')
    this.todos = this.table('todos')
    this.tags = this.table('tags')
  }
}

export const db = new Database()
