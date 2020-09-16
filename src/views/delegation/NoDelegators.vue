<template lang="pug">
.v-container.pa-4
  .v-flex.justify-center.text-center
    p.display-3 👁👄👁
    p.body-1 {{ $t("delegate.noDelegatorsShort") }}
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'

@Component
export default class NoDelegators extends Vue {}
</script>
