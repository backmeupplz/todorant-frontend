<template lang="pug">
nav
  // Rules dialog
  Rules(
    v-if='rulesDialog',
    :dialog='rulesDialog',
    :close='closeRules',
    :openWelcome='openWelcome'
  )
  // Welcome dialog
  Welcome(
    v-if='welcomeDialog',
    :dialog='welcomeDialog',
    :close='closeWelcome',
    :openRules='openRules'
  )
  // Hero dialog
  HeroProfile(v-if='heroDialog', :dialog='heroDialog', :close='closeHero')
  // Subscription dialog
  Subscription(
    v-if='subscriptionDialog',
    :dialog='subscriptionDialog',
    :close='closeSubscription'
  )
  // Settings dialog
  Settings(
    v-if='settingsDialog',
    :dialog='settingsDialog',
    :close='closeSettingsDialog',
    :openEncryption='openEncryption'
  )
  // Hashtags dialog
  Hashtags(
    v-if='hashtagsDialog',
    :dialog='hashtagsDialog',
    :close='closeHashtagsDialog'
  )
  // QR dialog
  QRCode(
    :dialog='qrDialog',
    :close='closeQRDialog',
    :description='"qr.description.app_login"',
    :qrRendered='qrRendered',
    :changeQr='changeQr',
    v-if='!!user && qrDialog'
  )
  // Support dialog
  Support(
    v-if='supportDialog',
    :dialog='supportDialog',
    :close='closeSupportDialog'
  )
  // Encryption dialog
  Encryption(
    v-if='encryptionDialog',
    :dialog='encryptionDialog',
    :close='closeEncryptionDialog'
  )
  // Apps dialog
  Apps(v-if='appsDialog', :dialog='appsDialog', :close='closeAppsDialog')
  // Navbar and app
  v-app-bar(flat, app, :style='appBarStyle')
    // Title
    a(@click='goHome')
      v-toolbar-title.text-uppercase.grey--text
        img(src='/img/logo-small.svg', :height='24', :width='118', alt='Logo')
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
    IconButton(
      :click='() => { rulesDialog = true; }',
      color='grey',
      name='$info'
    )
    // Extra
    v-menu(offset-y)
      template(v-slot:activator='{ on }')
        v-btn(text, icon, color='grey', v-on='on', aria-label='Settings')
          v-icon $settings
      v-list
        // Dark mode
        v-list-item(@click='toggleMode')
          v-list-item-title {{ dark ? $t("menu.darkMode.on") : $t("menu.darkMode.off") }}
        // Hero
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
        // QR
        v-list-item(@click='appsDialog = true', v-if='!!user')
          v-list-item-title {{ $t("apps") }}
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
import IconButton from '@/icons/IconButton.vue'
import { serverBus } from '@/main'
import { logEvent } from '@/utils/logEvent'
import { sockets } from '@/utils/sockets'
import { namespace } from 'vuex-class'
import { SubscriptionStatus } from '@/models/SubscriptionStatus'
import { User } from '@/models/User'
import { setCookie, deleteCookie } from '../utils/cookie'
import QRCodeStyling from 'qr-code-styling'
import { Watch } from 'vue-property-decorator'

const Rules = (resolve: any) =>
  (require as any)(['@/components/Rules.vue'], resolve)
const Welcome = (resolve: any) =>
  (require as any)(['@/views/Welcome.vue'], resolve)
const HeroProfile = (resolve: any) =>
  (require as any)(['@/components/HeroProfile.vue'], resolve)
const Subscription = (resolve: any) =>
  (require as any)(['@/views/Subscription.vue'], resolve)
const Hashtags = (resolve: any) =>
  (require as any)(['@/views/settings/Hashtags.vue'], resolve)
const QRCode = (resolve: any) =>
  (require as any)(['@/components/QRCode.vue'], resolve)
const Support = (resolve: any) =>
  (require as any)(['@/components/Support.vue'], resolve)
const Encryption = (resolve: any) =>
  (require as any)(['@/components/Encryption.vue'], resolve)
const Apps = (resolve: any) =>
  (require as any)(['@/components/Apps.vue'], resolve)
const Settings = (resolve: any) =>
  (require as any)(['../views/Settings.vue'], resolve)
// const Settings = () => import('../views/Settings.vue')
const UserStore = namespace('UserStore')
const AppStore = namespace('AppStore')
const SnackbarStore = namespace('SnackbarStore')

@Component({
  components: {
    Rules,
    HeroProfile,
    Subscription,
    Settings,
    Support,
    Hashtags,
    QRCode,
    Encryption,
    Welcome,
    IconButton,
    Apps,
  },
})
export default class Navbar extends Vue {
  @UserStore.State subscriptionStatus!: SubscriptionStatus
  @UserStore.State user!: User
  @UserStore.Mutation setPassword!: (password?: string) => void
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
  heroDialog = false
  subscriptionDialog = false
  settingsDialog = false
  supportDialog = false
  hashtagsDialog = false
  qrDialog = false
  qrRendered?: QRCodeStyling = {} as QRCodeStyling
  appsDialog = false
  encryptionDialog = false

  get locales() {
    return [
      { icon: 'us', code: 'en' },
      { icon: 'ru', code: 'ru' },
      { icon: 'ua', code: 'uk' },
      { icon: 'es', code: 'es' },
      { icon: 'it', code: 'it' },
      { icon: 'pt', code: 'pt-BR' },
    ]
  }
  get currentLocale() {
    for (const locale of this.locales) {
      if (locale.code === i18n.locale) {
        return locale
      }
    }
  }
  get appBarStyle() {
    return {
      backgroundColor: this.dark ? '#121212' : '#FFFFFF',
      maxWidth: '1000px',
      margin: 'auto',
    }
  }

  get dialogs() {
    return (
      !this.rulesDialog &&
      !this.welcomeDialog &&
      !this.heroDialog &&
      !this.subscriptionDialog &&
      !this.settingsDialog &&
      !this.supportDialog &&
      !this.hashtagsDialog &&
      !this.qrDialog &&
      !this.appsDialog &&
      !this.encryptionDialog
    )
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
    setCookie('dark', this.dark)
    ;(this as any).$vuetify.theme.dark = this.dark
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
    this.setPassword(undefined)
    deleteCookie()
    this.$router.replace('/')
    sockets.logout()
    location.reload()
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
  changeQr(newQr: QRCodeStyling) {
    this.qrRendered = newQr
  }
  closeQRDialog() {
    this.qrDialog = false
  }
  closeAppsDialog() {
    this.appsDialog = false
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
