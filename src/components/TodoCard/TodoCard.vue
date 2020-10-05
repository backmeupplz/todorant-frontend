<template lang="pug">
.todo-container(
  :class='todoOutstanding ? "outstanding" : ""',
  :style='backgroundColor',
  @mousemove='handleMove'
)
  SwipeOut(
    ref='swipelist',
    :items='todo',
    @leftRevealed='swipeLeftHandler',
    @rightRevealed='swipeRightHandler',
    @active='handleSome'
  )
    template(
      v-slot='{ item, index, revealLeft, revealRight, close, revealed, disabled }'
    )
      .card-content
        .orange-bubble-container(v-if='todo.frogFails')
          OrangeBubble(
            v-for='(_, i) in Array(todo.frogFails).fill("")',
            :key='i'
          )
        .todo-text-container
          v-icon.handle.mr-2(
            :style='{ fill: "#ff641a" }',
            v-if='editable && todo.frogFails < 3'
          ) $drag
          TodoText(
            :todo='todo',
            :text='text',
            :errorDecrypting='errorDecrypting'
          )
        .footer-container(v-if='!editable')
          TodoCardModifiers(:todo='todo', :todoOutstanding='todoOutstanding')
          TodoCardActions(
            :type='type',
            :deleteTodo='deleteTodo',
            :skipTodo='skipTodo',
            :addTodo='addTodo',
            :completeTodo='completeTodo',
            :edit='edit',
            :todo='todo',
            :loading='loading',
            :incompleteTodosCount='incompleteTodosCount',
            :moveTodoToToday='moveTodoToToday',
            :repeat='repeat'
          )
    template(
      v-slot:left='{ item }',
      v-if='type === "planning" || type === "current"'
    )
      .d-flex.justify-center.align-center.ml-2
        IconButton(
          :click='completeTodo',
          :loading='loading',
          name='$complete',
          color='#4BB34B'
        )
    template(
      v-slot:right='{ item }',
      v-if='type === "planning" || type === "current"'
    )
      .d-flex.justify-center.align-center
        IconButton(
          :click='deleteTodo',
          :loading='loading',
          name='$delete',
          color='#E64646'
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
import IconButton from '@/icons/IconButton.vue'
import { CardType } from '@/models/CardType'
import { namespace } from 'vuex-class'
import * as api from '@/utils/api'
import { isTodoOld } from '@/utils/isTodoOld'
import { SwipeOut } from 'vue-swipe-actions'
import 'vue-swipe-actions/dist/vue-swipe-actions.css'

const AppStore = namespace('AppStore')

@Component({
  components: {
    TodoText,
    OrangeBubble,
    TodoCardModifiers,
    TodoCardActions,
    IconButton,
    SwipeOut,
  },
})
export default class TodoCard extends Vue {
  @AppStore.State dark!: boolean

  @Prop({ required: true }) deleteTodo!: () => void
  @Prop({ required: true }) addTodo!: (hotkey?: boolean) => void
  @Prop({ required: true }) completeTodo!: (hotkey?: boolean) => void
  @Prop({ required: true }) edit!: () => void
  @Prop() skipTodo?: () => void
  @Prop() moveTodoToToday?: () => void
  @Prop() repeat?: () => void

  @Prop({ required: true }) type?: CardType
  @Prop({ required: true }) todo!: Todo
  @Prop({ required: true }) loading!: boolean
  @Prop() incompleteTodosCount?: number
  @Prop() editable?: boolean

  swipeActive = false
  oldXAxis = 0
  direction = ''

  closeSwipe() {
    const swipeList: any = this.$refs.swipelist
    swipeList.closeActions()
    this.swipeActive = false
  }

  handleSome(event: boolean) {
    this.swipeActive = event
  }

  handleMove(e: MouseEvent) {
    if (e.pageX < this.oldXAxis) {
      this.direction = 'left'
    } else {
      this.direction = 'right'
    }
    if (!this.swipeActive) this.oldXAxis = e.pageX
  }

  swipeRightHandler() {
    if (this.type !== 'planning' && this.type !== 'current') {
      return
    }
    this.deleteTodo()
    this.closeSwipe()
  }

  swipeLeftHandler() {
    if (this.type !== 'planning' && this.type !== 'current') {
      return
    }
    this.completeTodo()
    this.closeSwipe()
  }

  get backgroundColor() {
    return `background-color: ${
      this.swipeActive
        ? this.direction === 'left'
          ? 'rgba(230, 70, 70, 0.1)'
          : 'rgba(75, 179, 75, 0.1)'
        : ''
    }`
  }

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

  get todoOutstanding() {
    if (this.todo.completed) {
      return false
    }
    const today = api.getToday()
    return isTodoOld(this.todo, today)
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
.todo-text-container {
  display: flex;
  flex-direction: row;
  align-items: center;
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
.outstanding {
  background-color: rgba(255, 0, 0, 0.1);
}
.handle {
  flex-grow: 1;
  max-width: 25px;
}
</style>
