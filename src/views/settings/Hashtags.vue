<template lang="pug">
v-dialog(
  persistent,
  v-model='dialog',
  scrollable,
  max-width='600px',
  @click:outside='closePopup'
)
  v-card
    v-card-title {{ $t("hashtags.title") }}
    v-card-text
      p(v-if='!tags.length') {{ $t("emptyHashtags") }}
      draggable(:list='epics', @end='endDraggingEpic()', handle='.handle')
        .tag-container.mb-2.flex-column(
          v-for='(tag, i) in epics',
          :key='tag._id',
          :style='getBorderColor(tag)'
        )
          SingleTag(
            :i='tag._id',
            :tag='tag',
            :edited='edited',
            :epic='epic',
            :changeEdited='changeEdited',
            :changeEpic='changeEpic',
            :user='user'
          )
      .tag-container.mb-2.flex-column(
        v-for='(tag, i) in tags',
        v-if='!tag.epic',
        :key='tag._id',
        :style='getBorderColor(tag)'
      )
        SingleTag(
          :i='tag._id',
          :tag='tag',
          :edited='edited',
          :epic='epic',
          :changeEdited='changeEdited',
          :changeEpic='changeEpic',
          :user='user'
        )
    v-card-actions
      v-btn.button-round(
        v-if='!!tags && !!tags.length',
        color='error',
        text,
        @click='deleteAllHashtags',
        :loading='loading'
      ) {{ $t("deleteAll") }}
      v-spacer
      v-btn.button-round(
        color='error',
        text,
        @click='closePopup',
        v-hotkey='keymap',
        :loading='loading'
      ) {{ $t("close") }}
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import * as api from '@/utils/api'
import { i18n } from '@/plugins/i18n'
import { Tag } from '@/models/Tag'
import { namespace } from 'vuex-class'
import { Prop } from 'vue-property-decorator'
import { TagColors } from '@/models/TagColors'
import { User } from '@/models/User'
import draggable from 'vuedraggable'
import SingleTag from '@/views/settings/SingleTag.vue'
import { ResponseError } from '@/models/ErrorType'

const AppStore = namespace('AppStore')
const UserStore = namespace('UserStore')
const TagsStore = namespace('TagsStore')
const SnackbarStore = namespace('SnackbarStore')

@Component({ components: { draggable, SingleTag } })
export default class Hashtags extends Vue {
  @Prop({ required: true }) dialog!: boolean
  @Prop({ required: true }) close!: () => void

  @AppStore.State dark!: boolean
  @UserStore.State user?: User
  @TagsStore.State tagColors!: TagColors
  @TagsStore.State tags!: Tag[]
  @SnackbarStore.Mutation setSnackbarError!: (error: string) => void

  edited = ''
  epic = ''
  tagOrder = ''
  loading = false

  get keymap() {
    return {
      'esc': this.closePopup
    }
  }

  changeEdited(edited: string) {
    this.edited = edited
  }

  changeEpic(epic: string) {
    this.epic = epic
  }

  endDraggingEpic() {
    const epics = this.epics.map((epic, index) => {
      epic.epicOrder = index
      return epic
    })
    if (this.user) {
      api.postEpics(this.user, epics)
    }
  }

  get epics() {
    return this.tags
      .filter((t) => t.epic)
      .sort((a, b) => {
        if (!a.epicOrder) {
          a.epicOrder = 0
        }
        if (!b.epicOrder) {
          b.epicOrder = 0
        }
        if (a.epicOrder < b.epicOrder) return -1
        else return 1
      })
  }

  async deleteAllHashtags() {
    if (!confirm(i18n.t('deleteAllHashtagsConfirm') as string)) {
      return
    }
    this.loading = true
    try {
      await api.deleteAllTags()
    } catch (err) {
      const typedErr = err as ResponseError
      this.setSnackbarError(
        typedErr.response ? typedErr.response.data : typedErr.message
      )
    } finally {
      this.loading = false
    }
  }

  closePopup() {
    this.edited = ''
    this.epic = ''
    this.close()
  }

  getBorderColor(tag: Tag) {
    let color = this.dark ? '#4D5259' : '#DDE2E5'
    const selected = this.epic === tag._id || this.edited === tag._id
    if (selected) color = '#3366FF'
    return {
      border: `1px ${color} solid !important`,
    }
  }
}
</script>

<style>
.v-card {
  border-radius: 20px !important;
}
.v-dialog {
  border-radius: 20px !important;
}
</style>
