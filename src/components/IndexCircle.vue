<template lang="pug">
.index-circle
  p(:class='morePadding ? "mt-5" : "mt-4"', :style='{ color: color }') {{ index }}
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

const AppStore = namespace('AppStore')

@Component
export default class IndexCircle extends Vue {
  @Prop({ required: true }) index!: string
  @Prop() morePadding?: boolean

  @AppStore.State dark!: boolean

  get color() {
    return this.dark ? 'rgba(255, 255, 255, 0.87)' : 'rgba(0, 0, 0, 0.87)'
  }
}
</script>

<style scoped>
.index-circle {
  width: 100px;
  height: 100px;
  border-radius: 50px;
  border: 2px solid white;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  font-size: 70px;
  line-height: 70px;

  text-align: center;
}
</style>
