<template lang="pug">
v-dialog(
  v-model='dialog',
  scrollable,
  max-width='600px',
  @click:outside='closePopup'
)
  v-card
    v-card-title {{ $t("hashtags.title") }} {{ editedColor }}
    v-card-text
      p(v-if='!tags.length') {{ $t("emptyHashtags") }}
      v-card.mb-2(v-for='(tag, i) in tags', :key='i')
        .d-flex.direction-row.align-center
          v-card-text(:style='{ color: colorForTag(tag, i) }') {{ "#" }}{{ tag.tag }}
          v-spacer
          v-btn(
            v-if='!!tag.color',
            text,
            icon,
            @click='defaultTag(tag)',
            :loading='loading'
          )
            v-icon(small) clear
          v-btn(
            text,
            icon,
            @click='selectTag(tag, i)',
            :loading='loading',
            v-if='edited == -1'
          )
            v-icon(small) edit
          v-btn.mr-4(
            text,
            icon,
            @click='deleteTag(tag)',
            :loading='loading',
            v-if='edited == -1'
          )
            v-icon(small) delete
          v-btn(
            text,
            icon,
            @click='saveTag(tag)',
            :loading='loading',
            v-if='edited == i'
          )
            v-icon(small) done
          v-btn.mr-4(
            text,
            icon,
            @click='cancelTag(tag)',
            :loading='loading',
            v-if='edited == i'
          )
            v-icon(small) clear
        v-card-actions(v-if='edited == i')
          v-spacer
          v-color-picker(
            flat,
            hide-inputs,
            hide-mode-switch,
            mode='hexa',
            v-model='editedColor'
          )
          v-spacer
    v-card-actions
      v-spacer
      v-btn(
        color='error',
        text,
        @click='closePopup',
        v-shortkey.once='["esc"]',
        @shortkey='closePopup',
        :loading='loading'
      ) {{ $t("close") }}
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import * as api from '@/utils/api'
import { serverBus } from '@/main'
import { i18n } from '@/plugins/i18n'
import { Tag } from '@/models/Tag'
import { namespace } from 'vuex-class'
import { Prop } from 'vue-property-decorator'
import { TagColors } from '@/models/TagColors'
import { User } from '@/models/User'

const AppStore = namespace('AppStore')
const UserStore = namespace('UserStore')
const TagsStore = namespace('TagsStore')
const SnackbarStore = namespace('SnackbarStore')

@Component
export default class Hashtags extends Vue {
  @Prop({ required: true }) dialog!: boolean
  @Prop({ required: true }) close!: () => void

  @AppStore.State dark!: boolean
  @UserStore.State user?: User
  @TagsStore.State tagColors!: TagColors
  @TagsStore.State tags!: Tag[]
  @SnackbarStore.Mutation setSnackbarError!: (error: string) => void

  edited = -1

  editedColor = ''

  closePopup() {
    this.edited = -1
    this.close()
  }

  colorForTag(tag: Tag, i: number) {
    const defaultColor = this.dark ? '#64B5F6' : '#1E88E5'
    return i === this.edited
      ? this.editedColor || defaultColor
      : tag.color || defaultColor
  }

  async deleteTag(tag: Tag) {
    const user = this.user
    if (!user) {
      return
    }
    this.loading = true
    try {
      await api.deleteTag(user, tag)
    } catch (err) {
      this.setSnackbarError(err.response ? err.response.data : err.message)
    } finally {
      this.loading = false
    }
  }

  selectTag(tag: Tag, i: number) {
    const defaultColor = this.dark ? '#64B5F6' : '#1E88E5'
    this.editedColor = tag.color || defaultColor
    this.edited = i
  }

  async saveTag(tag: Tag) {
    const user = this.user
    if (!user) {
      return
    }
    this.loading = true
    try {
      await api.editTag(user, tag, this.editedColor)
      this.cancelTag(tag)
    } catch (err) {
      this.setSnackbarError(err.response ? err.response.data : err.message)
    } finally {
      this.loading = false
    }
  }

  async defaultTag(tag: Tag) {
    const user = this.user
    if (!user) {
      return
    }
    this.loading = true
    try {
      await api.editTag(user, tag, '')
      this.cancelTag(tag)
    } catch (err) {
      this.setSnackbarError(err.response ? err.response.data : err.message)
    } finally {
      this.loading = false
    }
  }

  async cancelTag(tag: Tag) {
    this.edited = -1
  }

  loading = false
}
</script>
