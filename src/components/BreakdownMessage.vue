<template lang="pug">
v-dialog(
  v-model='dialog',
  scrollable,
  max-width='600px',
  @click:outside='close'
)
  v-card
    v-card-title {{ $t("breakdownMessage.title") }}
    v-card-text(v-html='$t("breakdownMessage.text")')
    v-card-actions
      v-spacer
      v-btn(
        color='default',
        text,
        @click='close',
        v-shortkey.once='["esc"]',
        @shortkey.native='close'
      ) {{ $t("close") }}
      v-btn(
        color='default',
        text,
        @click='breakdownTodo',
        v-shortkey.once='["enter"]',
        @shortkey.native='breakdownTodo'
      ) {{ $t("breakdown.button") }}
</template>

<script lang="ts">
import { serverBus } from '@/main'
import { Todo } from '@/models/Todo'
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'

@Component
export default class BreakdownMessage extends Vue {
  @Prop({ required: true }) dialog!: boolean
  @Prop({ required: true }) close!: () => void
  @Prop({ required: true }) todo!: Todo

  async breakdownTodo() {
    await serverBus.$emit('addTodoRequested', undefined, this.todo)
    this.close()
  }
}
</script>
