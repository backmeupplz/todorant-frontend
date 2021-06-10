<template lang="pug">
v-dialog(
  v-model='dialog',
  scrollable,
  max-width='600px',
  @click:outside='closePopup'
)
  v-card
    v-card-title {{ $t("hashtags.title") }}
    v-card-text
      .tag-container.mb-2.flex-column(
        v-for='(tag, i) in sortedTags',
        :key='i',
        :style='{ border: `1px ${epic === i || edited === i ? "#3366FF" : "#DDE2E5"} solid !important` }'
      )
        .d-flex.align-center.justify-space-between
          .d-flex.flex-column.tag-overflow.tag-text(
            :style='{ color: colorForTag(tag, i) }'
          ) 
            .tag-overflow.tag-text {{ "#" }}{{ tag.tag }}
          .d-flex
            IconButton(
              v-if='!tag.epic',
              :click='() => selectEpic(i)',
              :loading='loading',
              name='$epic'
            )
            IconButton(
              :click='() => selectTag(i)',
              :loading='loading',
              name='$edit'
            )
            IconButton(
              :click='() => deleteTag(tag)',
              :loading='loading',
              name='$delete',
              color='#E64646'
            )
        .d-flex.flex-column(v-if='i === edited')
          v-text-field.epic-form__textarea(
            :label='$t("hashtags.name")',
            v-model='epicGoal',
            :rules='epicRules'
          )
            template(v-slot:append)
              v-btn.epic-input-icon-background(
                icon,
                @click='turnTagToEpic(tag)',
                v-if='!rulesForbidden'
              )
                v-icon(color='white') mdi-check
          .d-flex.align-center.justify-space-between
            .d-flex
              v-btn.tag-color-preset(
                v-for='colorPreset in colors',
                :key='colorPreset',
                :style='{ backgroundColor: colorPreset }',
                icon,
                small,
                @click='() => (editedColor = colorPreset)'
              )
              v-menu(top, offset-x, :close-on-content-click='false')
                template(v-slot:activator='{ on, attrs }')
                  v-btn.tag-custom-color(
                    icon,
                    small,
                    v-bind='attrs',
                    v-on='on'
                  )
                    v-icon(color='white') $palette
                v-color-picker(mode='hexa', v-model='editedColor')
            v-btn.tag-edit-complete(icon, @click='saveTag(tag)', small)
              v-icon(color='white') mdi-check
        .d-flex.align-center(
          v-if='!!tag.epic',
          :style='{ color: colorForTag(tag, i) }'
        )
          span.tag-text.mr-2 {{ tag.epicPoints }}
          v-progress-linear(
            :value='epicProgress(tag)',
            :color='colorForTag(tag, i)',
            rounded
          )
          span.tag-text.ml-2 {{ tag.epicGoal }}
        div(v-if='i === epic')
          v-text-field.epic-form__textarea(
            :label='$t("epic.epicGoal")',
            v-model='epicGoal',
            :rules='epicRules',
            type='number'
          )
            template(v-slot:append)
              v-btn.epic-input-icon-background(
                icon,
                @click='turnTagToEpic(tag)',
                v-if='!rulesForbidden'
              )
                v-icon(color='white') mdi-check
    v-card-actions
      v-btn(
        v-if='tags && tags.length',
        color='error',
        text,
        @click='deleteAllHashtags',
        :loading='loading'
      ) {{ $t("deleteAll") }}
      v-spacer
      v-btn(
        color='error',
        text,
        @click='closePopup',
        v-shortkey.once='["esc"]',
        @shortkey.native='closePopup',
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
import { Prop, Watch } from 'vue-property-decorator'
import { TagColors } from '@/models/TagColors'
import { User } from '@/models/User'
import draggable from 'vuedraggable'
import IconButton from '@/icons/IconButton.vue'
import Progress from '@/components/Progress.vue'

const AppStore = namespace('AppStore')
const UserStore = namespace('UserStore')
const TagsStore = namespace('TagsStore')
const SnackbarStore = namespace('SnackbarStore')

@Component({ components: { draggable, IconButton, Progress } })
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

  tagName = ''
  tagOrder = ''

  rulesForbidden = true

  @Watch('epicGoal')
  onTodoChanged(val: string) {
    this.rulesForbidden = !this.epicRules
      .map((rule) => rule(val))
      .includes(true)
  }

  get sortedTags() {
    return this.tags.sort((a, b) => {
      if (a.epic && b.epic) {
        if (!a.epicOrder) {
          a.epicOrder = 0
        }
        if (!b.epicOrder) {
          b.epicOrder = 0
        }
        if (a.epicOrder < b.epicOrder) return -1
        else return 1.5
      }
      if (a.epic && !b.epic) return -2
      return 1
    })
  }

  get colors() {
    return [
      '#E5F1FF',
      '#EAFAF3',
      '#FFF2D8',
      '#FFE3DE',
      '#FFBE3D',
      '#FF715B',
      '#2DCA8C',
      '#377DFF',
    ]
  }

  selectEpic(i: number) {
    this.edited = -1
    this.epicGoal = ''
    if (this.epic === i) {
      this.epic = -1
      return
    }
    this.epic = i
  }

  selectTag(i: number) {
    this.editedColor = ''
    this.epic = -1
    if (this.edited === i) {
      this.edited = -1
      return
    }
    this.edited = i
  }

  async turnTagToEpic(tag: Tag) {
    const user = this.user
    const goal = parseInt(this.epicGoal)
    this.epic = -1
    this.epicGoal = ''
    if (!user || goal <= 0) {
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

  closePopup() {
    this.edited = -1
    this.epic = -1
    this.epicGoal = ''
    this.close()
  }

  colorForTag(tag: Tag, i: number) {
    const defaultColor = this.dark ? '#64B5F6' : '#1E88E5'
    if (i === this.edited) {
      return this.editedColor || tag.color || defaultColor
    }
    return tag.color || defaultColor
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

  async saveTag(tag: Tag) {
    const user = this.user
    if (!user) {
      return
    }
    this.loading = true
    try {
      await api.editTag(
        user,
        tag,
        this.editedColor,
        tag.epic,
        tag.epicGoal,
        undefined,
        this.tagName
      )
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
    if (!user || goal <= 0) {
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
    (v: any) => +v > 0 || i18n.t('errors.epic.greaterThanZeroError'),
  ]

  tagRules = [(v: any) => !!v.match(/^[\S]+$/)]

  loading = false

  async deleteAllHashtags() {
    if (!confirm(i18n.t('deleteAllHashtagsConfirm') as string)) {
      return
    }
    this.loading = true
    try {
      await api.deleteAllTags()
    } catch (err) {
      this.setSnackbarError(err.response ? err.response.data : err.message)
    } finally {
      this.loading = false
    }
  }
}
</script>

<style lang="scss">
@import 'Hashtags';

.tag-overflow {
  overflow: hidden;
}

.tag-overflow * {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.tag-text {
  font-weight: 500 !important;
  font-size: 17px !important;
  line-height: 20px !important;
  letter-spacing: -0.24px !important;
}

.tag-container {
  background: #ffffff;
  border-radius: 12px !important;
  padding: 12px 16px 12px 16px;
}

.epic-input-icon-background {
  background: linear-gradient(135deg, #1148b9 0%, #5c9bff 100%);
  border-radius: 30px;
  width: 32px;
  height: 32px;
}

.tag-edit-complete {
  background: linear-gradient(135deg, #1148b9 0%, #5c9bff 100%);
  border-radius: 16px;
  width: 28px;
  height: 28px;
  margin: 8px 4px 8px;
}

.epic-form {
  margin-bottom: 0px !important;
}

.tag-color-preset {
  width: 28px;
  height: 28px;
  margin: 8px 4px 8px;
  border-radius: 16px;
}
.tag-custom-color {
  width: 24px;
  height: 24px;
  margin: 8px 4px 8px;
  border-radius: 16px;
  background: radial-gradient(
      98.78% 280.22% at 100% 0%,
      #fcab14 0%,
      #fa6641 15.91%,
      #be40c0 40.21%,
      rgba(80, 90, 221, 0) 100%
    ),
    radial-gradient(
      107.24% 195.45% at 0% 100%,
      #48cce0 0%,
      #428beb 28.85%,
      #505add 60.18%
    );
}
</style>

<style lang="scss">
@import 'Hashtags';
</style>
