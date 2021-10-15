<template lang="pug">
v-dialog(
  v-model='dialog',
  scrollable,
  max-width='600px',
  @click:outside='close'
)
  v-card
    v-card-title {{ $t("warning") }}
    v-card-text {{ futureSkippedTodo ? $t("move.request") : $t("breakdown.request") }}
    v-card-actions
      v-spacer
      v-btn(
        color='default',
        text,
        @click='() => { futureSkippedTodo ? moveTodo() : close(); }',
        v-shortkey.once='["esc"]',
        @shortkey.native='() => { futureSkippedTodo ? moveTodo() : close(); }'
      ) {{ futureSkippedTodo ? $t("move.button") : $t("close") }}
      v-btn(
        color='default',
        text,
        @click='breakdown',
        v-shortkey.once='["esc"]',
        @shortkey.native='close'
      ) {{ $t("breakdown.button") }}
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'

@Component
export default class BreakdownRequest extends Vue {
  @Prop({ required: true }) dialog!: boolean
  @Prop({ required: true }) close!: () => void
  @Prop({ required: true }) breakdown!: () => void
  @Prop() moveTodo?: () => void
  @Prop() futureSkippedTodo: boolean = false
}
</script>
