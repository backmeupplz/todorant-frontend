<template>
  <svg
    width="12"
    height="12"
    viewBox="0 0 21 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class="todorant-icon"
  >
    <path
      d="M8.54168 0.083313C13.2131 0.083313 17 3.87024 17 8.54165C17 10.4564 16.3638 12.2226 15.2912 13.6402L20.1583 18.5084C20.6139 18.964 20.6139 19.7027 20.1583 20.1583C19.7027 20.6139 18.964 20.6139 18.5084 20.1583L13.6403 15.2912C12.2226 16.3637 10.4564 17 8.54168 17C3.87027 17 0.0833435 13.2131 0.0833435 8.54165C0.0833435 3.87024 3.87027 0.083313 8.54168 0.083313ZM8.54168 2.41665C5.15893 2.41665 2.41668 5.1589 2.41668 8.54165C2.41668 11.9244 5.15893 14.6666 8.54168 14.6666C11.9244 14.6666 14.6667 11.9244 14.6667 8.54165C14.6667 5.1589 11.9244 2.41665 8.54168 2.41665Z"
    />
  </svg>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class SearchIcon extends Vue {}
</script>

<style>
.todorant-icon {
  fill: currentColor;
}
</style>
