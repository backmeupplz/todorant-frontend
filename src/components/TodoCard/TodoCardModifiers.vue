<template lang="pug">
div
  v-icon.mr-2(v-if='todoOutstanding', size='18') error_outline
  v-icon.grey--text.mr-2(small, v-if='todo.encrypted') vpn_key
  v-icon.grey--text.mr-2(small, v-if='todo.skipped') arrow_forward
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import { Todo } from '@/models/Todo'

@Component
export default class TodoCardModifiers extends Vue {
  @Prop({ required: true }) todo!: Todo
  @Prop() todoOutstanding?: boolean
}
</script>

<style></style>
