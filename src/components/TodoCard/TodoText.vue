<template lang="pug">
.text-container
  p(v-if='!!todo.delegator')
    span.font-weight-bold.delegation-name(v-if='!isDelegation') {{ $t("from") }}: {{ todo.delegator.name }}
    span.font-weight-bold(v-if='isDelegation') {{ todo.monthAndYear }}{{ todo.date ? `-${todo.date}` : "" }}
  span(v-if='!!todo.frog') 🐸{{ " " }}
  span(v-if='!!todo.time') {{ todo.time }}{{ " " }}
  span(
    v-for='element in linkifiedText',
    :class='errorDecrypting ? "grey--text" : ""'
  )
    span(v-if='element.type === "text"') {{ element.value }}
    a(
      v-else-if='element.type === "link"',
      :href='element.url',
      target='_blank',
      :style='{ color: dark ? "#64B5F6" : "#1E88E5" }'
    ) {{ element.value }}
    a(
      v-else,
      @click.prevent='hash(element.url)',
      :style='{ color: colorForTag(element.value.substr(1)) }'
    ) {{ element.value }}
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { l } from '@/utils/linkify'
import { serverBus } from '@/main'
import { Prop } from 'vue-property-decorator'
import { Todo } from '@/models/Todo'
import { namespace } from 'vuex-class'
import { TagColors } from '@/models/TagColors'

const AppStore = namespace('AppStore')
const TagsStore = namespace('TagsStore')

@Component
export default class TodoText extends Vue {
  @Prop({ required: true }) todo!: Todo
  @Prop({ required: true }) text!: string
  @Prop({ required: true }) errorDecrypting!: boolean
  @Prop() type?: string

  @AppStore.State dark!: boolean
  @TagsStore.State tagColors!: TagColors

  get isDelegation() {
    return this.type === 'delegatedByMe' || this.type === 'delegatedToMe'
  }

  colorForTag(tag: string) {
    return this.tagColors[tag] || (this.dark ? '#64B5F6' : '#1E88E5')
  }

  get linkifiedText() {
    if (!this.text) return []
    return l(this.text)
  }

  hash(hash: string) {
    if (!location.hash.includes(hash)) {
      let hashesString = location.hash == '' ? hash : `,${hash}`
      location.hash += hashesString
    }
    serverBus.$emit('changeCurrentTab', 1)
    serverBus.$emit('refreshRequested')
  }
}
</script>

<style scoped>
span {
  white-space: pre-wrap;
}
.text-container {
  min-width: 10px;
}
.text-container * {
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 18px;
  letter-spacing: -0.24px;
}

.text-container * :not(.delegation-name) {
  word-wrap: break-word;
}
</style>
