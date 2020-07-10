<template lang="pug">
nav
  // Rules dialog
  Rules(:dialog='rulesDialog', :close='closeRules', :openWelcome='openWelcome')
  // Welcome dialog
  Welcome(
    :dialog='welcomeDialog',
    :close='closeWelcome',
    :openRules='openRules'
  )
  // Hero dialog
  HeroProfile(:dialog='heroDialog', :close='closeHero')
  // Merge dialog
  Merge(:dialog='mergeDialog', :close='closeMerge')
  // Subscription dialog
  Subscription(:dialog='subscriptionDialog', :close='closeSubscription')
  // Settings dialog
  Settings(
    :dialog='settingsDialog',
    :close='closeSettingsDialog',
    :openEncryption='openEncryption'
  )
  // Hashtags dialog
  Hashtags(:dialog='hashtagsDialog', :close='closeHashtagsDialog')
  // QR dialog
  QRCode(:dialog='qrDialog', :close='closeQRDialog')
  // Support dialog
  Support(:dialog='supportDialog', :close='closeSupportDialog')
  // Encryption dialog
  Encryption(:dialog='encryptionDialog', :close='closeEncryptionDialog')
  // Navbar and app
  v-app-bar(flat, app, style='maxWidth: 1000px; margin: auto')
    // Title
    a(@click='goHome')
      v-toolbar-title.text-uppercase.grey--text
        img(src='/img/logo.png', :height='24', :width='101')
    v-spacer
    // Language picker
    v-menu(offset-y)
      template(v-slot:activator='{ on }')
        v-btn(text, icon, color='grey', v-on='on') {{ currentLocale.code }}
      v-list
        v-list-item(
          v-for='locale in locales',
          @click='changeLanguage(locale.code)',
          :key='locale.code'
        )
          v-list-item-title 
            flag(:iso='locale.icon')
    // Rules
    v-btn.pl-6(icon, color='grey', @click='rulesDialog = true')
      v-icon info_outlined
    // Extra
    v-menu(offset-y)
      template(v-slot:activator='{ on }')
        v-btn(text, icon, color='grey', v-on='on')
          v-icon more_vert
      v-list
        // Dark mode
        v-list-item(@click='toggleMode')
          v-list-item-title {{ dark ? $t("menu.darkMode.on") : $t("menu.darkMode.off") }}
        // Merge accounts
        v-list-item(@click='mergeDialog = true', v-if='!!user')
          v-list-item-title {{ $t("menu.merge") }}
        v-list-item(@click='heroDialog = true', v-if='!!user')
          v-list-item-title {{ $t("heroProfileTitle") }}
        // Subscription
        v-list-item(@click='showSubscription', v-if='!!user')
          v-list-item-title {{ $t("subscription.title") }}
        // Settings
        v-list-item(@click='settingsDialog = true', v-if='!!user')
          v-list-item-title {{ $t("settings.title") }}
        // Hashtags
        v-list-item(@click='hashtagsDialog = true', v-if='!!user')
          v-list-item-title {{ $t("hashtags.title") }}
        // QR
        v-list-item(@click='qrDialog = true', v-if='!!user')
          v-list-item-title {{ $t("qr.code") }}
        // Support
        v-list-item(@click='supportDialog = true', v-if='!!user')
          v-list-item-title {{ $t("supportAlert.title") }}
        // Logout
        v-list-item(@click='logout', v-if='!!user')
          v-list-item-title {{ $t("menu.logout") }}
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { i18n } from '@/plugins/i18n'
import * as api from '@/utils/api'
import Rules from '@/components/Rules.vue'
import Welcome from '@/components/Welcome.vue'
import Merge from '@/components/Merge.vue'
import HeroProfile from '@/components/HeroProfile.vue'
import Subscription from '@/components/Subscription.vue'
import Settings from '@/components/Settings.vue'
import Hashtags from '@/components/Hashtags.vue'
import QRCode from '@/components/QRCode.vue'
import Support from '@/components/Support.vue'
import Encryption from '@/components/Encryption.vue'
import { serverBus } from '@/main'
import { logEvent } from '@/utils/logEvent'
import { sockets } from '@/utils/sockets'
import { namespace } from 'vuex-class'
import { SubscriptionStatus } from '@/models/SubscriptionStatus'
import { User } from '@/models/User'

const UserStore = namespace('UserStore')
const AppStore = namespace('AppStore')
const SnackbarStore = namespace('SnackbarStore')

@Component({
  components: {
    Rules,
    Merge,
    HeroProfile,
    Subscription,
    Settings,
    Support,
    Hashtags,
    QRCode,
    Encryption,
    Welcome,
  },
})
export default class Navbar extends Vue {
  @UserStore.State subscriptionStatus!: SubscriptionStatus
  @UserStore.State user!: User
  @AppStore.State rulesShown!: boolean
  @AppStore.State dark!: boolean
  @AppStore.State language?: string
  @AppStore.Mutation setRulesShown!: (rulesShown: boolean) => void
  @AppStore.Mutation setDark!: (dark: boolean) => void
  @AppStore.Mutation setLanguage!: (language: string) => void
  @UserStore.Mutation setUser!: (user?: User) => void
  @SnackbarStore.Mutation setSnackbarError!: (error: string) => void

  rulesDialog = false
  welcomeDialog = false
  mergeDialog = false
  heroDialog = false
  subscriptionDialog = false
  settingsDialog = false
  supportDialog = false
  hashtagsDialog = false
  qrDialog = false
  encryptionDialog = false

  get locales() {
    return [
      { icon: 'us', code: 'en' },
      { icon: 'ru', code: 'ru' },
      { icon: 'ua', code: 'ua' },
      { icon: 'es', code: 'es' },
      { icon: 'it', code: 'it' },
    ]
  }
  get currentLocale() {
    for (const locale of this.locales) {
      if (locale.code === i18n.locale) {
        return locale
      }
    }
  }

  created() {
    serverBus.$on('subscriptionRequested', () => {
      this.subscriptionDialog = true
      logEvent('subscription_viewed', {
        status: this.subscriptionStatus,
      })
    })
    serverBus.$on('rulesRequested', () => {
      this.rulesDialog = true
    })
    serverBus.$on('login', () => {
      if (!this.rulesShown) {
        this.welcomeDialog = true
        this.setRulesShown(true)
      }
    })
  }

  toggleMode() {
    this.setDark(!this.dark)
    ;(this.$vuetify.theme as any).dark = this.dark
  }
  changeLanguage(locale: string) {
    i18n.locale = locale
    this.setLanguage(locale)
    document.title = i18n.t('title') as string
    if (this.user) {
      this.setServerLanguage(locale)
    }
  }
  logout() {
    this.setUser(undefined)
    this.$router.replace('/')
    sockets.logout()
  }
  openRules() {
    this.rulesDialog = true
  }
  closeRules() {
    this.rulesDialog = false
  }
  openWelcome() {
    this.welcomeDialog = true
  }
  closeWelcome() {
    this.welcomeDialog = false
  }
  closeMerge() {
    this.mergeDialog = false
  }
  closeHero() {
    this.heroDialog = false
  }
  closeSubscription() {
    this.subscriptionDialog = false
  }
  closeSettingsDialog() {
    this.settingsDialog = false
  }
  closeSupportDialog() {
    this.supportDialog = false
  }
  closeHashtagsDialog() {
    this.hashtagsDialog = false
  }
  closeQRDialog() {
    this.qrDialog = false
  }
  closeEncryptionDialog() {
    this.encryptionDialog = false
  }
  openEncryption() {
    this.encryptionDialog = true
  }
  async goHome() {
    try {
      await this.$router.replace(this.user ? '/superpower' : '/')
      serverBus.$emit('cleanHash')
      serverBus.$emit('refreshRequested')
    } catch (err) {
      // Do nothing
    }
  }
  async setServerLanguage(locale: string) {
    try {
      await api.setSettings(this.user, {
        language: locale,
      })
    } catch (err) {
      this.setSnackbarError(err.response ? err.response.data : err.message)
    }
  }

  showSubscription() {
    logEvent('subscription_viewed', {
      status: this.subscriptionStatus,
    })
    this.subscriptionDialog = true
  }
}
</script>
