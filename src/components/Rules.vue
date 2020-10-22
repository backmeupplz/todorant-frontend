<template lang="pug">
v-dialog(v-model='dialog', scrollable, max-width='600px', persistent)
  v-card
    v-card-title {{ $t("howto.title") }}
    v-card-text
      ul
        li.mb-3(v-for='rule in $t("rules")', v-html='rule')
      .title.py-2 {{ $t("howto.bonus.title") }}
      ul
        li.mb-3(v-for='rule in $t("howto.bonus.rules")', v-html='rule')
    v-card-actions.d-flex.flex-column(v-if='this.$vuetify.breakpoint.xsOnly')
      v-btn(v-if='!!user', color='blue', text, @click='openWelcomeDialog') {{ $t("introButton") }}
      v-spacer
      v-btn(
        color='blue',
        text,
        @click='close',
        v-shortkey.once='["esc"]',
        @shortkey.native='close'
      ) {{ $t("cookie.button") }}
    v-card-actions(v-else)
      v-btn(v-if='!!user', color='blue', text, @click='openWelcomeDialog') {{ $t("introButton") }}
      v-spacer
      v-btn(
        color='blue',
        text,
        @click='close',
        v-shortkey.once='["esc"]',
        @shortkey.native='close'
      ) {{ $t("cookie.button") }}
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { User } from '@/models/User'

const UserStore = namespace('UserStore')

@Component
export default class Rules extends Vue {
  @Prop({ required: true }) dialog!: boolean
  @Prop({ required: true }) close!: () => void
  @Prop({ required: true }) openWelcome!: () => void

  @UserStore.State user?: User

  openWelcomeDialog() {
    this.close()
    this.openWelcome()
  }
}
</script>
