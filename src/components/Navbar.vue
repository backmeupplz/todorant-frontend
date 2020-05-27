<template lang="pug">
  nav
    // Rules dialog
    Rules(:dialog='rulesDialog' :close='closeRules' :openWelcome='openWelcome')
    // Welcome dialog
    Welcome(:dialog='welcomeDialog' :close='closeWelcome' :openRules='openRules')
    // Merge dialog
    Merge(:dialog='mergeDialog' :close='closeMerge')
    // Subscription dialog
    Subscription(:dialog='subscriptionDialog' :close='closeSubscription')
    // Settings dialog
    Settings(:dialog='settingsDialog' :close='closeSettingsDialog' :openEncryption='openEncryption')
    // Hashtags dialog
    Hashtags(:dialog='hashtagsDialog' :close='closeHashtagsDialog')
    // QR dialog
    QRCode(:dialog='qrDialog' :close='closeQRDialog')
    // Support dialog
    Support(:dialog='supportDialog' :close='closeSupportDialog')
    // Encryption dialog
    Encryption(:dialog='encryptionDialog' :close='closeEncryptionDialog')
    // Navbar and app
    v-app-bar(flat app style='maxWidth: 1000px; margin: auto')
      // Title
      a(@click='goHome')
        v-toolbar-title.text-uppercase.grey--text
          img(src="/img/logo.png" :height='24' :width='101')
      v-spacer
      // Language picker
      v-menu(offset-y)
        template(v-slot:activator='{ on }')
          v-btn(text icon color='grey' v-on='on') {{currentLocale.code}}
        v-list
          v-list-item(v-for='locale in locales' @click='changeLanguage(locale.code)' :key="locale.code")
            v-list-item-title 
              flag(:iso='locale.icon')
      // Rules
      v-btn.pl-6(
        icon
        color='grey'
        @click='rulesDialog = true'
      )
        v-icon info_outlined
      // Extra
      v-menu(offset-y)
        template(v-slot:activator='{ on }')
          v-btn(text icon color='grey' v-on='on')
            v-icon more_vert
        v-list
          // Dark mode
          v-list-item(@click='toggleMode')
            v-list-item-title {{$store.state.dark ? $t('menu.darkMode.on') : $t('menu.darkMode.off')}}
          // Merge accounts
          v-list-item(@click='mergeDialog = true' 
          v-if='!!$store.state.user')
            v-list-item-title {{$t('menu.merge')}}
          // Subscription
          v-list-item(@click='showSubscription' 
          v-if='!!$store.state.user')
            v-list-item-title {{$t('subscription.title')}}
          // Settings
          v-list-item(@click='settingsDialog = true' 
          v-if='!!$store.state.user')
            v-list-item-title {{$t('settings.title')}}
          // Hashtags
          v-list-item(@click='hashtagsDialog = true' 
          v-if='!!$store.state.user')
            v-list-item-title {{$t('hashtags.title')}}
          // QR
          v-list-item(@click='qrDialog = true' 
          v-if='!!$store.state.user')
            v-list-item-title {{$t('qr.code')}}
          // Support
          v-list-item(@click='supportDialog = true' 
          v-if='!!$store.state.user')
            v-list-item-title {{$t('supportAlert.title')}}
          // Logout
          v-list-item(@click='logout'
          v-if='!!$store.state.user')
            v-list-item-title {{$t('menu.logout')}}
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import * as store from '../plugins/store'
import { i18n } from '../plugins/i18n'
import * as api from '../utils/api'
import Rules from './Rules.vue'
import Welcome from './Welcome.vue'
import Merge from './Merge.vue'
import Subscription from './Subscription.vue'
import Settings from './Settings.vue'
import Hashtags from './Hashtags.vue'
import QRCode from './QRCode.vue'
import Support from './Support.vue'
import Encryption from './Encryption.vue'
import { serverBus } from '../main'
import { logEvent } from '../utils/logEvent'
import { sockets } from '../utils/sockets'

@Component({
  components: {
    Rules,
    Merge,
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
  rulesDialog = false
  welcomeDialog = false
  mergeDialog = false
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
        status: store.userState().subscriptionStatus,
      })
    })
    serverBus.$on('rulesRequested', () => {
      this.rulesDialog = true
    })
    serverBus.$on('login', () => {
      if (!store.rulesShown()) {
        this.welcomeDialog = true
        store.setRulesShown(true)
      }
    })
  }

  toggleMode() {
    store.setDark(!store.dark())
    ;(this.$vuetify.theme as any).dark = store.dark()
  }
  changeLanguage(locale: string) {
    i18n.locale = locale
    store.setLanguage(locale)
    document.title = i18n.t('title') as string
  }
  logout() {
    store.logout()
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
      await this.$router.replace(store.user() ? '/superpower' : '/')
      serverBus.$emit('cleanHash')
      serverBus.$emit('refreshRequested')
    } catch (err) {
      // Do nothing
    }
  }
  showSubscription() {
    logEvent('subscription_viewed', {
      status: store.userState().subscriptionStatus,
    })
    this.subscriptionDialog = true
  }
}
</script>
