<template lang="pug">
v-list-item-content.text-center.mt-4
  span.display-3 🎉
  span.headline {{ $t("clear.congratulations") }}
  span.body-1 {{ $t("clear.text") }}
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class AllDonePlaceholder extends Vue {
}
</script>