<template lang="pug">
div(:style='style')
  v-app(:class='dark ? "dark-content" : ""')
    div(style='width: 100%', align='center')
      div(style='maxWidth: 1000px;', align='justify')
        cookie-law(
          :buttonText='$t("cookie.button")',
          :message='$t("cookie.message")',
          buttonClass='Cookie__button__todorant'
        )
        Snackbar
        Navbar
        v-content
          router-view
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import CookieLaw from 'vue-cookie-law'
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

<style>
.Cookie {
  background: #ffffff;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  margin: auto;
  width: 90%;
  margin-bottom: 12px;

  padding-left: 48px;
  padding-right: 48px;
}
.dark-content .Cookie {
  background: #1f1f1f;
}
.Cookie__content {
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 22px;
  line-height: 27px;

  color: #0f0f0f;
}
.dark-content .Cookie__content {
  color: white;
}
.Cookie__button__todorant {
  background: linear-gradient(93.58deg, #ff5f13 0%, #ff8a53 100%);
  border-radius: 10px;

  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 17px;

  padding: 15px 32px;

  color: #fff;
}
.Cookie__button__todorant:hover {
  opacity: 0.8;
}
/* Responsiveness */
@media only screen and (max-width: 1040px) {
  .Cookie__content {
    font-size: 16px;
    line-height: 18px;
    margin: 0;
    margin-bottom: 12px;
  }
  .Cookie {
    padding-left: 20px;
    padding-right: 20px;
  }
  .Cookie__buttons {
    margin: 0;
  }
}
</style>
