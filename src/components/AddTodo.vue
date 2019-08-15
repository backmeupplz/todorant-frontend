<template lang="pug">
  v-dialog(v-model='dialog'
  persistent
  scrollable
  max-width='600px')
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
          v-expansion-panels
            TodoForm
      v-card-actions
        v-spacer
        v-btn(dark color='blue' text @click='dialog = false') {{$t('cancel')}}
        v-btn(dark color='blue' text @click='dialog = false') {{$t('save')}}
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import TodoForm from "./TodoForm.vue";

@Component({
  components: { TodoForm }
})
export default class AddTodo extends Vue {
  dialog = false;
}
</script>
