<template lang="pug">
v-dialog(v-model='dialog', persistent, scrollable, max-width='600px')
  v-card
    v-card-text.pt-4 {{ $t("deleteHeadline", { name: todo ? textForTodo(todo) : "" }) }}
    v-card-actions
      v-spacer
      v-btn(
        color='blue',
        text,
        @click='dialog = false',
        :loading='loading',
        :disabled='loading'
      ) {{ $t("cancel") }}
      v-btn(
        color='error',
        text,
        @click='removeTodo',
        :loading='loading',
        :disabled='loading',
        v-shortkey.once='["enter"]',
        @shortkey.native='removeTodo'
      ) {{ $t("delete") }}
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Watch, Prop } from 'vue-property-decorator'
import * as api from '@/utils/api'
import { serverBus } from '@/main'
import { Todo } from '@/models/Todo'
import { decrypt } from '@/utils/encryption'
import { i18n } from '@/plugins/i18n'
import { namespace } from 'vuex-class'
import { User } from '@/models/User'

const UserStore = namespace('UserStore')
const SnackbarStore = namespace('SnackbarStore')
const TodosStore = namespace('TodosStore')

@Component
export default class DeleteTodo extends Vue {
  @Prop({ required: true }) todo!: Todo

  @UserStore.State user?: User
  @SnackbarStore.Mutation setSnackbarError!: (error: string) => void
  @TodosStore.Action deleteTodo!: (todo: Todo) => Promise<void>

  loading = false
  dialog = false

  @Watch('todo')
  onTodoChanged(val: boolean, oldVal: boolean) {
    this.dialog = !!val
  }

  async removeTodo() {
    this.loading = true
    try {
      await this.deleteTodo(this.todo)
      this.dialog = false
    } catch (err) {
      this.setSnackbarError(err.response ? err.response.data : err.message)
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
