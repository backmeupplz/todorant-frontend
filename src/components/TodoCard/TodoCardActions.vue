<template lang="pug">
.actions-container
  IconButton(
    :click='deleteTodo',
    :loading='loading',
    name='$delete',
    color='#E64646',
    :small='type === "planning" || type === "done"'
  )
  v-tooltip.ml-4(
    :max-width='300',
    bottom,
    v-if='type === "planning" && todoInFuture'
  )
    template(v-slot:activator='{ on }')
      IconButton(
        :click='() => { if (moveTodoToToday) moveTodoToToday(); }',
        :loading='loading',
        :on='on',
        name='$moveToToday',
        :small='type === "planning" || type === "done"'
      )
    span {{ $t("moveUp") }}
  IconButton(
    :click='() => { if (skipTodo) skipTodo(); }',
    :loading='loading',
    name='$skip',
    v-if='type === "current" && incompleteTodosCount > 1 && !todo.frog && !todo.time',
    :small='type === "planning" || type === "done"'
  )
  v-tooltip.ml-4(:max-width='300', bottom, v-if='type !== "done"')
    template(v-slot:activator='{ on }')
      IconButton(
        :click='() => addTodo()',
        :loading='loading',
        name='$breakdown',
        :on='on',
        :shortkeys='{ en: ["b"], ru: ["и"] }',
        :shortkeyFunction='() => addTodo(true)',
        :small='type === "planning" || type === "done"'
      )
    span {{ $t("breakdownInfo") }}
  IconButton(
    :click='edit',
    :loading='loading',
    name='$edit',
    :small='type === "planning" || type === "done"'
  )
  IconButton(
    v-if='type === "planning" || type === "current"',
    :click='() => completeTodo()',
    :loading='loading',
    name='$complete',
    color='#4BB34B',
    :shortkeys='{ en: ["d"], ru: ["в"] }',
    :shortkeyFunction='() => completeTodo(true)',
    :small='type === "planning" || type === "done"'
  )
  IconButton(
    v-if='type === "done"',
    :click='() => { if (repeat) repeat(); }',
    :loading='loading',
    name='$repeat',
    color='#4BB34B',
    :small='type === "planning" || type === "done"'
  )
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import { Todo } from '@/models/Todo'
import IconButton from '@/icons/IconButton.vue'
import { CardType } from '@/models/CardType'
import { isTodoOld } from '@/utils/isTodoOld'
import * as api from '@/utils/api'

@Component({
  components: {
    IconButton,
  },
})
export default class TodoCardActions extends Vue {
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

  get todoInFuture() {
    return !isTodoOld(this.todo, api.getTomorrow())
  }
}
</script>

<style></style>
