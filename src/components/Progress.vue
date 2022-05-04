<template lang="pug">
.progress-container
  .progress-section-container(v-if='total <= 15 && total != 0')
    .progress-section(
      v-for='(_, i) in Array(total).fill("")',
      :key='i',
      :style='{ backgroundColor: i < completed ? color || "#ff641a" : dark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)" }'
    )
  .progress-linear-container(v-else)
    .progress-linear-content(
      :style='{ width: `${(completed / total) * 100}%`, backgroundColor: color || "#ff641a" }'
    )
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

const AppStore = namespace('AppStore')

@Component
export default class Progress extends Vue {
  @Prop({ required: true }) total!: number
  @Prop({ required: true }) completed!: number
  @Prop() color?: string

  @AppStore.State dark!: boolean
}
</script>

<style>
.progress-container {
  display: flex;
  height: 4px;
  width: 100%;
}

.progress-section-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 4px;
  width: 100%;
}

.progress-section {
  display: flex;
  height: 100%;
  border-radius: 10px;
  flex-grow: 1;
  margin-left: 4px;
  margin-right: 4px;
}

.progress-linear-container {
  position: relative;
  height: 100%;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  margin-left: 4px;
  margin-right: 4px;
}

.progress-linear-content {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  border-radius: 10px;
}
</style>
