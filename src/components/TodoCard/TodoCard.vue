<template lang="pug">
.todo-container
  .orange-bubble-container(v-if='todo.frogFails')
    OrangeBubble(v-for='(_, i) in Array(todo.frogFails).fill("")', :key='i')
  TodoText(:todo='todo', :text='text', :errorDecrypting='errorDecrypting')
  .footer-container
    TodoCardModifiers(:todo='todo')
    TodoCardActions(
      :deleteTodo='deleteTodo',
      :skipTodo='skipTodo',
      :addTodo='addTodo',
      :completeTodo='completeTodo',
      :edit='edit',
      :todo='todo',
      :loading='loading',
      :incompleteTodosCount='incompleteTodosCount'
    )
</template>

<script lang="ts">
import { Todo } from '@/models/Todo'
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import { decrypt } from '@/utils/encryption'
import { i18n } from '@/plugins/i18n'
import TodoText from '@/components/TodoCard/TodoText.vue'
import OrangeBubble from '@/components/TodoCard/OrangeBubble.vue'
import TodoCardModifiers from '@/components/TodoCard/TodoCardModifiers.vue'
import TodoCardActions from '@/components/TodoCard/TodoCardActions.vue'

@Component({
  components: { TodoText, OrangeBubble, TodoCardModifiers, TodoCardActions },
})
export default class TodoCard extends Vue {
  @Prop({ required: true }) deleteTodo!: () => void
  @Prop({ required: true }) skipTodo!: () => void
  @Prop({ required: true }) addTodo!: (hotkey?: boolean) => void
  @Prop({ required: true }) completeTodo!: (hotkey?: boolean) => void
  @Prop({ required: true }) edit!: () => void

  @Prop({ required: true }) todo!: Todo
  @Prop({ required: true }) loading!: boolean
  @Prop() incompleteTodosCount?: number

  get text() {
    if (this.todo?.encrypted) {
      return (
        decrypt(this.todo?.text, true) || i18n.t('encryption.errorDecrypting')
      )
    } else {
      return this.todo?.text
    }
  }

  get errorDecrypting() {
    if (this.todo?.encrypted) {
      return !decrypt(this.todo?.text, true)
    } else {
      return false
    }
  }
}
</script>

<style>
.todo-container {
  border: 1px solid #dde2e5;
  border-radius: 12px;
  padding: 12px;

  display: flex;
  flex-direction: column;
}
.theme--dark .todo-container {
  border: 1px solid rgba(255, 255, 255, 0.2);
}
.orange-bubble-container {
  display: flex;
  flex-direction: row;
  margin-bottom: 8px;
}
.footer-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 4px;
}
.actions-container {
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>
