<template lang="pug">
div
  .d-flex.align-center.justify-space-between
    .d-flex.tag-overflow.tag-text.align-center(
      :style='{ color: colorForTag(tag, i) }'
    ) 
      v-icon.mr-2.handle(v-if='!!tag.epic') $drag
      .tag-overflow.tag-text {{ "#" }}{{ tag.tag }}
    .d-flex
      v-tooltip.ml-4(:max-width='300', bottom, v-if='i != edited')
        template(v-slot:activator='{ on }')
          IconButton(
            v-if='i != edited',
            :click='() => (!tag.epic ? selectEpic(i) : selectUnEpic(tag))',
            :loading='loading',
            :name='i === epic ? "mdi-close" : "$epic"',
            :color='!tag.epic ? undefined : "secondary"',
            :on='tag.epic ? on : undefined'
          )
        span {{ $t("unEpicInfo") }}
      IconButton(
        v-if='i != epic',
        :click='() => selectTag(i)',
        :loading='loading',
        :name='i === edited ? "mdi-close" : "$edit"'
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
      v-model='tagName',
      :rules='tagRules'
    )
    .d-flex.align-center.justify-space-between.hashtags-color-presets-parent
      .d-flex.hashtag-color-presets
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
            v-btn.tag-custom-color(icon, small, v-bind='attrs', v-on='on')
              v-icon(color='white') $palette
          v-color-picker(mode='hexa', v-model='editedColor')
      v-btn.tag-edit-complete(
        icon,
        @click='saveTag(tag)',
        small,
        v-if='!rulesForbidden'
      )
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
  .d-flex.flex-column.mt-2(v-if='i === epic')
    v-text.text-center {{ $t("epic.epicForeword") }}
    v-text-field.epic-form__textarea(
      :label='$t("epic.epicGoal")',
      v-model='epicGoal',
      :rules='epicRules',
      type='number'
    )
      template(v-slot:append)
        v-btn.epic-input-icon-background.mb-1(
          icon,
          @click='turnTagToEpic(tag)',
          v-if='!rulesForbidden && !!epic'
        )
          v-icon(color='white') mdi-check
</template>

<script lang="ts">
import { Tag } from '@/models/Tag'
import { i18n } from '@/plugins/i18n'
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop, Watch } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import IconButton from '@/icons/IconButton.vue'
import VueI18n from 'vue-i18n'
import * as api from '@/utils/api'
import { User } from '@/models/User'

const AppStore = namespace('AppStore')
const SnackbarStore = namespace('SnackbarStore')

@Component({ components: { IconButton } })
export default class EditTodo extends Vue {
  @Prop({ required: true }) edited!: string
  @Prop({ required: true }) tag!: Tag
  @Prop({ required: true }) i!: string
  @Prop({ required: true }) epic!: string
  @Prop({ required: true }) changeEdited!: (edited: string) => void
  @Prop({ required: true }) changeEpic!: (epic: string) => void
  @Prop({ required: true }) user!: User

  @AppStore.State dark!: boolean
  @SnackbarStore.Mutation setSnackbarError!: (error: string) => void

  loading = false
  epicGoal = ''
  editedColor = ''
  tagName = ''
  rulesForbidden = false

  @Watch('epicGoal')
  onTodoChanged(val: string) {
    this.rulesForbidden = this.checkRules(this.epicRules, val)
  }

  @Watch('tagName')
  onTagNameChanged(val: string) {
    this.rulesForbidden = this.checkRules(this.tagRules, val)
  }

  get colors() {
    return this.dark
      ? [
          '#FFBE3D',
          '#FF984C',
          '#FF715B',
          '#6cdaaf',
          '#32A4C6',
          '#70bfd7',
          '#23738b',
          '#ab81d6',
        ]
      : [
          '#FFBE3D',
          '#FF984C',
          '#FF715B',
          '#2DCA8C',
          '#32A4C6',
          '#377DFF',
          '#4740D6',
          '#5603AD',
        ]
  }

  colorForTag(tag: Tag, i: string) {
    const defaultColor = this.dark ? '#64B5F6' : '#1E88E5'
    if (i === this.edited) {
      return this.editedColor || tag.color || defaultColor
    }
    return tag.color || defaultColor
  }

  epicProgress(epic: Tag) {
    if (!epic.epicPoints || !epic.epicGoal) {
      return
    }
    return ((epic.epicPoints / epic.epicGoal) * 100).toFixed(0)
  }

  selectTag(i: string) {
    this.rulesForbidden = false
    this.editedColor = ''
    this.changeEpic('')
    if (this.edited === i) {
      this.changeEdited('')
      return
    }
    this.changeEdited(i)
  }

  selectEpic(i: string) {
    this.rulesForbidden = true
    this.epicGoal = ''
    this.changeEdited('')
    this.epicGoal = ''
    if (this.epic === i) {
      this.changeEpic('')
      return
    }
    this.changeEpic(i)
  }

  async selectUnEpic(tag: Tag) {
    if (!confirm(i18n.t('unEpicConfirm') as string)) {
      return
    }
    const user = this.user
    if (!user) {
      return
    }
    this.loading = true
    try {
      await api.unEpic(user, tag)
    } catch (err) {
      this.setSnackbarError(err.response ? err.response.data : err.message)
    } finally {
      this.loading = false
    }
  }

  cancelTag() {
    this.changeEdited('')
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
      this.cancelTag()
    } catch (err) {
      this.setSnackbarError(err.response ? err.response.data : err.message)
    } finally {
      this.loading = false
    }
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

  async turnTagToEpic(tag: Tag) {
    const user = this.user
    const goal = parseInt(this.epicGoal)
    this.changeEpic('')
    this.epicGoal = ''
    if (!user || goal <= 0) {
      return
    }
    this.loading = true
    try {
      await api.editTag(user, tag, tag.color, true, goal)
      this.cancelTag()
    } catch (err) {
      this.setSnackbarError(err.response ? err.response.data : err.message)
    } finally {
      this.loading = false
    }
  }

  checkRules(
    rules: ((v: string) => true | VueI18n.TranslateResult)[],
    val: string
  ) {
    return !rules.map((rule) => rule(val)).includes(true)
  }

  epicRules = [
    (v: string) => !!v.match(/^\d+$/) || i18n.t('errors.epic.numberError'),
    (v: string) => +v > 0 || i18n.t('errors.epic.greaterThanZeroError'),
  ]

  tagRules = [
    (v: string) => !v.match(/!^$|\s+/) || i18n.t('errors.tag.whitespaces'),
  ]
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
  margin: 8px 4px 8px;
  border-radius: 16px;
}

.hashtag-color-presets {
  max-width: 100%;
  overflow: auto;
}

.hashtags-color-presets-parent {
  width: 100%;
  max-width: 100%;
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
