import Dexie from 'dexie'
import { DelegationUser } from '@/models/DelegationUser'

class Database extends Dexie {
  delegates: Dexie.Table<DelegationUser, string>
  delegators: Dexie.Table<DelegationUser, string>

  constructor() {
    super('Database')
    this.version(2).stores({
      delegates: '_id, name',
      delegators: '_id, name',
    })
    this.delegates = this.table('delegates')
    this.delegators = this.table('delegators')
  }
}

export const db = new Database()
