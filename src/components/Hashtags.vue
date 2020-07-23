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
      v-list-item(v-for='epic in epics')
        v-progress-linear(
          rounded,
          :value='epicProgress(epic)',
          height='25',
          :color='epic.color ? epic.color : "blue lighten-3"'
        ) 
          template(v-slot='{ value }')
            span.caption {{ epic.epicPoints }}/{{ epic.epicGoal }} {{ `#${epic.tag}` }}
          v-spacer.px-2
      v-card.mb-2(v-for='(tag, i) in tags', v-if='!!tag.epic', :key='i')
        .d-flex.direction-row.align-center
          v-card-text(
            :style='{ color: colorForTag(tag, i) }',
            v-if='!!tag.epicCompleted'
          ) {{ "#" }}{{ tag.tag }}
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
        v-card-actions(v-if='edited == i')
          v-spacer
          v-color-picker(
            flat,
            hide-inputs,
            hide-mode-switch,
            mode='hexa',
            v-model='editedColor'
          )
      v-card.mb-2(v-for='(tag, i) in tags', v-if='!tag.epic', :key='i')
        .d-flex.direction-row.align-center
          .d-flex.flex-column
            v-card-text(:style='{ color: colorForTag(tag, i) }') {{ "#" }}{{ tag.tag }}
            v-btn(
              small,
              bottom,
              color='blue',
              text,
              :loading='loading',
              @click='epicDialog(tag, i)',
              v-if='epic == -1'
            ) {{ $t("epic.intoEpic") }}
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
        v-card-actions.justify-center(v-if='epic == i')
          v-text-field(
            type='number',
            clearable,
            v-model='epicGoal',
            :label='$t("epic.epicGoal")',
            :rules='epicRules',
            :append-icon='parseInt(epicGoal) ? "check" : ""',
            @click:append='saveEpic(tag)'
          )
          v-btn.mr-4(
            text,
            icon,
            @click='epicDialog(tag, i)',
            :loading='loading',
            v-if='epic == i'
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

  epic = -1
  epicGoal = ''

  get epics() {
    return this.tags.filter((t) => t.epic)
  }

  closePopup() {
    this.edited = -1
    this.epic = -1
    this.epicGoal = ''
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
      await api.editTag(user, tag, this.editedColor, tag.epic, tag.epicGoal)
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
      await api.editTag(user, tag, '', tag.epic, tag.epicGoal)
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

  epicDialog(tag: Tag, i: number) {
    if (this.epic === i) {
      this.epic = -1
      this.epicGoal = ''
      return
    }
    this.epic = i
  }

  epicProgress(epic: Tag) {
    if (!epic.epicPoints || !epic.epicGoal) {
      return
    }
    return ((epic.epicPoints / epic.epicGoal) * 100).toFixed(0)
  }

  async saveEpic(tag: Tag) {
    const user = this.user
    const goal = parseInt(this.epicGoal)
    this.epic = -1
    this.epicGoal = ''
    if (!user) {
      return
    }
    this.loading = true
    try {
      await api.editTag(user, tag, tag.color, true, goal)
      this.cancelTag(tag)
    } catch (err) {
      this.setSnackbarError(err.response ? err.response.data : err.message)
    } finally {
      this.loading = false
    }
  }

  epicRules = [
    (v: any) => !!v.match(/^\d+$/) || i18n.t('errors.epic.numberError'),
  ]

  loading = false
}
</script>
