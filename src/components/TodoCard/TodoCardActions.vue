<template lang="pug">
.actions-container
  IconButton(
    :click='deleteTodo',
    :loading='loading',
    name='$delete',
    color='#E64646'
  )
  IconButton(
    :click='skipTodo',
    :loading='loading',
    name='$skip',
    v-if='incompleteTodosCount > 1 && !todo.frog && !todo.time'
  )
  v-tooltip.ml-4(:max-width='300', bottom)
    template(v-slot:activator='{ on }')
      IconButton(
        :click='() => addTodo()',
        :loading='loading',
        name='$breakdown',
        :on='on',
        :shortkeys='{ en: ["b"], ru: ["и"] }',
        :shortkeyFunction='() => addTodo(true)'
      )
    span {{ $t("breakdownInfo") }}
  IconButton(:click='edit', :loading='loading', name='$edit')
  IconButton(
    :click='() => completeTodo()',
    :loading='loading',
    name='$complete',
    color='#4BB34B',
    :shortkeys='{ en: ["d"], ru: ["в"] }',
    :shortkeyFunction='() => completeTodo(true)'
  )
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import { Todo } from '@/models/Todo'
import IconButton from '@/icons/IconButton.vue'

@Component({
  components: {
    IconButton,
  },
})
export default class TodoCardActions extends Vue {
  @Prop({ required: true }) deleteTodo!: () => void
  @Prop({ required: true }) skipTodo!: () => void
  @Prop({ required: true }) addTodo!: (hotkey?: boolean) => void
  @Prop({ required: true }) completeTodo!: (hotkey?: boolean) => void
  @Prop({ required: true }) edit!: () => void

  @Prop({ required: true }) todo!: Todo
  @Prop({ required: true }) loading!: boolean
  @Prop() incompleteTodosCount?: number
}
</script>

<style></style>
