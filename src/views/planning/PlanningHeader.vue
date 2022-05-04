<template lang="pug">
.header-container
  .header-title
    span {{ title }}
  v-btn(
    v-if='!delegation && !dontShowAddTodoButton && todoSection.title.length > 7',
    icon,
    @click.stop='addTodoWithDate(todoSection.title)',
    :loading='loading',
    color='#FF641A'
  )
    v-icon(color='#FF641A') add
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import { TodoSection } from '@/models/TodoSection'
import { serverBus } from '@/main'
import { i18n } from '@/plugins/i18n'

@Component
export default class PlanningHeader extends Vue {
  @Prop({ required: true }) todoSection!: TodoSection
  @Prop({ required: true }) loading!: boolean
  @Prop({ required: true }) getPanels!: () => number[]
  @Prop({ required: true }) setPanels!: (panels: number[]) => void
  @Prop({ required: true }) panelIndex!: number
  @Prop() delegation?: boolean
  @Prop() dontShowAddTodoButton?: boolean

  get panels() {
    return this.getPanels()
  }
  set panels(panels: number[]) {
    this.setPanels(panels)
  }

  weekdayFromTitle(title: string) {
    const date = new Date(title)
    return `weekday${
      (date.getDay() + (date.getTimezoneOffset() > 0 ? 1 : 0)) % 7
    }`
  }

  addTodoWithDate(date: string) {
    serverBus.$emit('addTodoRequested', date, undefined)
  }

  get title() {
    let result = this.todoSection.title
    if (!this.delegation && this.todoSection.title.length > 7) {
      result = `${result} ${i18n.t(
        this.weekdayFromTitle(this.todoSection.title)
      )}`
    }
    if (!this.panels.includes(this.panelIndex)) {
      result = `${result} (${this.todoSection.todos.length})`
    }
    return result
  }
}
</script>

<style scoped>
.header-container {
  max-width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.header-title {
  background: rgba(255, 100, 26, 0.1);
  border-radius: 10px;
  padding: 8px;

  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 17px;
  letter-spacing: -0.24px;
  text-overflow: ellipsis;
  overflow: hidden;
  color: #ff641a;
  margin-right: 4px;
}
</style>
