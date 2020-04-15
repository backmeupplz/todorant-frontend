<template lang="pug">
  v-dialog(v-model='dialog'
  scrollable
  max-width='600px'
  @click:outside='close')
    v-card
      v-card-title {{$t('hashtags.title')}}
      v-card-text
        v-card.mb-2.d-flex.direction-row.align-center(v-for='(tag, i) in $store.state.tags' :key='i')
          v-card-text(:style='{color: colorForTag(tag)}') {{'#'}}{{tag.tag}}
          v-spacer
          v-btn.mx-4(text
          icon
          @click='deleteTag(tag)'
          :loading='loading')
            v-icon delete
      v-card-actions
        v-spacer
        v-btn(color='error'
          text 
          @click='close'
          v-shortkey.once="['esc']"
          @shortkey='close'
          :loading='loading') {{$t('close')}}
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import * as store from '../plugins/store'
import * as api from '../utils/api'
import { serverBus } from '../main'
import { i18n } from '../plugins/i18n'
import { Tag } from '../models/tag'

@Component({
  props: {
    dialog: Boolean,
    close: Function
  }
})
export default class Hashtags extends Vue {
  colors = store.tagColors()

  colorForTag(tag: Tag) {
    return tag.color || (store.dark() ? '#64B5F6' : '#1E88E5')
  }

  async deleteTag(tag: Tag) {
    const user = store.user()
    if (!user) {
      return
    }
    this.loading = true
    try {
      await api.deleteTag(user, tag)
    } catch (err) {
      store.setSnackbarError(err.response ? err.response.data : err.message)
    } finally {
      this.loading = false
    }
  }

  loading = false
}
</script>
