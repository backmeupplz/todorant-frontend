<template lang="pug">
.progress.vertical
  .progress-bar(
    :style='{ height: `${progresss}%`, backgroundColor: `${colors}` }'
  )
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    progresss: Number,
    color: Array,
  },
})
export default class VerticalBar extends Vue {
  created() {
    this.colorScheme = this.$props.color[
      Math.floor(Math.random() * this.$props.color.length)
    ]
    this.colors = this.colorScheme[
      Math.floor(Math.random() * this.colorScheme.length)
    ]
  }
  colorScheme = []
  colors = []
}
</script>

<style>
.progress {
  background-color: rgba(0, 0, 0, 0.08);
  box-shadow: none;
}

.progress.vertical {
  width: 10%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
.progress.vertical > .progress-bar {
  width: 100% !important;
  bottom: 0;
}
.progress-bar {
  box-shadow: none;
}
</style>
