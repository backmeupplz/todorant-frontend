<template lang="pug">
  v-dialog(v-model='dialog' persistent max-width='600px')
    template(v-slot:activator='{ on }')
      v-btn(fixed
      dark
      fab
      bottom
      right
      color='blue'
      v-on="on")
        v-icon add
    v-card
      v-card-title
        span.headline {{$t('todo.create.title')}}
      v-card-text
        v-container
          v-text-field(:label="$t('todo.create.text')" 
          :hint="$t('todo.create.textHint')")
      v-card-actions
        v-spacer
        v-btn(dark color='blue' text @click='dialog = false') {{$t('cancel')}}
        v-btn(dark color='blue' text @click='dialog = false') {{$t('save')}}
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class Superpower extends Vue {
  dialog = false;
}
</script>
