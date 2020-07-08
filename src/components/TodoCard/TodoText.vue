<template lang="pug">
.flex-grow-1(style='max-width: 100%;')
  span(v-if='debug') ({{ todo.order }})
  span(v-if='debug') ({{ todo.frogFails }})
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

  @AppStore.State dark!: boolean
  @TagsStore.State tagColors!: TagColors

  colorForTag(tag: string) {
    return this.tagColors[tag] || (this.dark ? '#64B5F6' : '#1E88E5')
  }

  get linkifiedText() {
    if (!this.text) return []
    return l(this.text)
  }

  get debug() {
    return !!process.env.VUE_APP_DEV
  }

  hash(hash: string) {
    location.hash = hash
    serverBus.$emit('refreshRequested')
  }
}
</script>

<style scoped>
span {
  white-space: pre-wrap;
}
</style>
