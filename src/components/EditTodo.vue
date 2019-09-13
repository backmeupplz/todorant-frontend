<template lang="pug">
  v-dialog(v-model='dialog'
  persistent
  scrollable
  max-width='600px')
    v-form(ref='form')
      v-card
        v-card-title
          span.headline {{$t('todo.edit.title')}}
        v-card-text
          v-container
            TodoForm(v-if='!!todo'
            :todo='todo'
            :enterPressed='save' 
            :escapePressed='escapePressed')
        v-card-actions
          v-spacer
          v-btn(color='error'
          text 
          @click='cleanTodo()'
          :disabled='loading'
          v-shortkey.once="['esc']"
          @shortkey='dialog=false') {{$t('cancel')}}
          v-btn(color='blue'
          text 
          @click='save'
          :loading='loading'
          v-shortkey.once="['enter']"
          @shortkey='save') {{$t('save')}}
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Watch } from "vue-property-decorator";
import TodoForm from "./TodoForm.vue";
import { Todo } from "../models/todo";
import * as store from "../plugins/store";
import * as api from "../utils/api";

@Component({
  components: { TodoForm },
  props: {
    todo: Object,
    cleanTodo: Function
  }
})
export default class EditTodo extends Vue {
  loading = false;
  dialog = false;

  @Watch("todo")
  onTodoChanged(val: boolean, oldVal: boolean) {
    this.dialog = !!val;
    if (!oldVal && val) {
      this.reset();
    }
  }

  reset() {
    if (this.$refs.form) {
      (this.$refs.form as any).resetValidation();
    }
  }

  async save() {
    const user = store.user();
    if (!user) {
      return;
    }
    if (!(this.$refs.form as any).validate()) {
      return;
    }
    this.loading = true;
    try {
      await api.editTodo(user, (this as any).todo);
      (this as any).cleanTodo();
    } catch (err) {
      store.setSnackbarError(err.response ? err.response.data : err.message);
    } finally {
      this.loading = false;
    }
  }

  escapePressed() {
    this.dialog = false;
  }
}
</script>
