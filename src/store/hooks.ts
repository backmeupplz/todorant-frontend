import { getModule } from 'vuex-module-decorators'
import DelegationStore from '@/store/modules/DelegationStore'
import store from '@/store'
import { db } from '@/utils/db'

export function setupHooks() {
  db.delegates.hook('creating', function () {
    this.onsuccess = () => {
      getModule(DelegationStore, store).fetchDelegates()
    }
  })
  db.delegates.hook('deleting', function () {
    this.onsuccess = () => {
      getModule(DelegationStore, store).fetchDelegates()
    }
  })
  db.delegates.hook('updating', function () {
    this.onsuccess = () => {
      getModule(DelegationStore, store).fetchDelegates()
    }
  })
  db.delegators.hook('creating', function () {
    this.onsuccess = () => {
      getModule(DelegationStore, store).fetchDelegators()
    }
  })
  db.delegators.hook('deleting', function () {
    this.onsuccess = () => {
      getModule(DelegationStore, store).fetchDelegators()
    }
  })
  db.delegators.hook('updating', function () {
    this.onsuccess = () => {
      getModule(DelegationStore, store).fetchDelegators()
    }
  })
}
