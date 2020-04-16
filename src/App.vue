<template lang="pug">
  div(:style='style')
    v-app
      div(style='width: 100%' align='center')
        div(style='maxWidth: 1000px;' align='justify')
          cookie-law(theme='blood-orange'
          :buttonText='$t("cookie.button")'
          :message='$t("cookie.message")')
          Snackbar
          Navbar
          v-content
            router-view
</template>

<script lang="ts">
import Navbar from './components/Navbar.vue'
import Snackbar from './components/Snackbar.vue'
import * as store from './plugins/store'
import { i18n } from './plugins/i18n'
import { setFavIcon } from './utils/setFavIcon'
const CookieLaw = require('vue-cookie-law')

export default {
  components: { Navbar, CookieLaw, Snackbar },
  computed: {
    style: () => {
      return {
        'background-color': store.dark() ? '#303030' : '#fafafa',
      }
    },
  },
  created() {
    ;(this as any).$vuetify.theme.dark = store.dark()
    ;(document as any)
      .querySelector('meta[name="theme-color"]')
      .setAttribute('content', store.dark() ? '#303030' : '#fafafa')
    setFavIcon(store.dark())
    store.setSnackbar({
      message: '',
      color: 'error',
      active: false,
    })
  },
  metaInfo() {
    const title = i18n.t('title') as string
    return {
      title,
    }
  },
}
</script>

<style>
* {
  user-select: text;
}
</style>
