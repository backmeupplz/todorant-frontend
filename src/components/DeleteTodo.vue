<template lang="pug">
  v-dialog(
    v-model='dialog'
    persistent
    scrollable
    max-width='600px'
  )
    v-card
      v-card-text.pt-4 {{$t('deleteHeadline', { name: todo ? textForTodo(todo) : '' } )}}
      v-card-actions
        v-spacer
        v-btn(
          color='blue'
          text
          @click='dialog = false'
          :loading='loading'
          :disabled='loading'
        ) {{$t('cancel')}}
        v-btn(
          color='error'
          text 
          @click='deleteTodo'
          :loading='loading'
          :disabled='loading'
          v-shortkey.once="['enter']"
          @shortkey='deleteTodo'
        ) {{$t('delete')}}
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Watch } from 'vue-property-decorator'
import * as store from '../plugins/store'
import * as api from '../utils/api'
import { serverBus } from '../main'
import { Todo } from '../models/todo'
import { decrypt } from '../utils/encryption'
import { i18n } from '../plugins/i18n'

@Component({
  props: {
    todo: Object,
  },
})
export default class DeleteTodo extends Vue {
  loading = false
  dialog = false

  @Watch('todo')
  onTodoChanged(val: boolean, oldVal: boolean) {
    this.dialog = !!val
  }

  async deleteTodo() {
    const user = store.user()
    if (!user) {
      return
    }
    this.loading = true
    try {
      await api.deleteTodo(user, (this as any).todo)
      this.dialog = false
    } catch (err) {
      store.setSnackbarError(err.response ? err.response.data : err.message)
    } finally {
      this.loading = false
    }
  }

  textForTodo(todo: Todo) {
    if (todo.encrypted) {
      return decrypt(todo.text, true) || i18n.t('encryption.errorDecrypting')
    } else {
      return todo.text
    }
  }
}
</script>
