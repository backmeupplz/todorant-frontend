<template>
  <svg
    width="28"
    height="28"
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class="todorant-icon"
  >
    <path
      d="M22.5 20C23.0523 20 23.5 20.4477 23.5 21C23.5 21.5523 23.0523 22 22.5 22H5.5C4.94772 22 4.5 21.5523 4.5 21C4.5 20.4477 4.94772 20 5.5 20H22.5ZM22.5 13C23.0523 13 23.5 13.4477 23.5 14C23.5 14.5523 23.0523 15 22.5 15H5.5C4.94772 15 4.5 14.5523 4.5 14C4.5 13.4477 4.94772 13 5.5 13H22.5ZM22.5 6C23.0523 6 23.5 6.44772 23.5 7C23.5 7.55228 23.0523 8 22.5 8H5.5C4.94772 8 4.5 7.55228 4.5 7C4.5 6.44772 4.94772 6 5.5 6H22.5Z"
    />
  </svg>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class DragIcon extends Vue {}
</script>

<style>
.todorant-icon {
  fill: currentColor;
}
</style>
