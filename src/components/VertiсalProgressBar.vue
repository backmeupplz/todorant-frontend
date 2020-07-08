<template lang="pug">
    div.progress.vertical
      div.progress-bar(:style="{ height: `${progresss}%`, backgroundColor: `${color}` }")
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    progresss: Number,
    colorArr: Array,
  },
})
export default class VerticalBar extends Vue {
  created() {
    this.colorScheme = this.$props.colorArr[
      Math.floor(Math.random() * this.$props.colorArr.length)
    ]
    this.color = this.colorScheme[
      Math.floor(Math.random() * this.colorScheme.length)
    ]
  }
  colorScheme = []
  color = []
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
}
.progress.vertical > .progress-bar {
  width: 100% !important;
  bottom: 0;
}
.progress-bar {
  box-shadow: none;
}
</style>
