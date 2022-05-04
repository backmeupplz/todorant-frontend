<template lang="pug">
.v-container.pa-4
  .v-flex.justify-center.text-center
    p.display-3 🥐
    p.body-1 {{ delegatedTasksTo ? $t("delegate.noDelegatedTasksTo") : $t("delegate.noDelegatedTasks") }}
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'

@Component
export default class NoDelegatedTasks extends Vue {
  @Prop({ required: true }) delegatedTasksTo!: boolean
}
</script>
