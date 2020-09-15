<template lang="pug">
.orangeBubble
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class OrangeBubble extends Vue {}
</script>

<style>
.orangeBubble {
  width: 8px;
  height: 6px;

  background: #ff641a;
  border-radius: 20px;
  margin-right: 4px;
}
</style>
