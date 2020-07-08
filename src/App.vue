<template lang="pug">
div(:style='style')
  v-app
    div(style='width: 100%', align='center')
      div(style='maxWidth: 1000px;', align='justify')
        cookie-law(
          theme='blood-orange',
          :buttonText='$t("cookie.button")',
          :message='$t("cookie.message")'
        )
        Snackbar
        Navbar
        v-content
          router-view
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
const CookieLaw = require('vue-cookie-law')
import { namespace } from 'vuex-class'
import Navbar from '@/components/Navbar.vue'
import Snackbar from '@/components/Snackbar.vue'
import store from '@/store'
import { i18n } from '@/plugins/i18n'
import SnackbarState from '@/store/modules/SnackbarStore'

const AppStore = namespace('AppStore')
const SnackbarStore = namespace('SnackbarStore')

@Component({ components: { Navbar, CookieLaw, Snackbar } })
export default class App extends Vue {
  @AppStore.State dark!: boolean
  @SnackbarStore.Mutation setSnackbar!: (snackbarState: any) => void

  get style() {
    return {
      'background-color': this.dark ? '#303030' : '#fafafa',
    }
  }

  created() {
    this.$vuetify.theme.dark = this.dark

    const query = document.querySelector('meta[name="theme-color"]')
    if (query) {
      query.setAttribute('content', this.dark ? '#303030' : '#fafafa')
    }

    this.setSnackbar({
      message: '',
      color: 'error',
      active: false,
    })

    document.title = i18n.t('title') as string
  }

  get metaInfo() {
    return {
      title: i18n.t('title') as string,
    }
  }
}
</script>
