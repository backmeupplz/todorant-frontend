<template lang="pug">
.v-container.pa-4
  // Sign in
  SigninDialog(:dialog='signinDialog', :close='closeSignin')
  v-layout 
    v-col
      div(v-if='landingABTestGroup === 1')
        v-row
          v-col(
            cols=12,
            sm=6,
            :class='["xs", "sm"].includes(this.$vuetify.breakpoint.name) ? "text-center" : "text-left"'
          )
            p.my-1.display-1 {{ $t("homeShort.headline") }}
            p.my-1.display-1 {{ $t("homeShort.headline2") }}
            ul.my-4
              li.title {{ $t("homeShort.feature1") }}
              li.title {{ $t("homeShort.feature2") }}
              li.title {{ $t("homeShort.feature3") }}
              li.title {{ $t("homeShort.feature4") }}
            v-flex.text-center
              v-btn.primary(block, @click='signinDialog = true') {{ $t("home.signIn") }}
              p.caption.pa-2 {{ $t("home.youAreRegistered") }}
            .d-flex.direction-row.justify-center
              a.pt-3(
                @click='open(`https://apps.apple.com/${appstoreLanguage}/app/todorant/id1482078243`)'
              )
                v-img(
                  width='150',
                  height='50',
                  aspect-ratio='1',
                  :src='appStoreButton'
                )
              a.pl-1(
                @click='open("https://play.google.com/store/apps/details?id=com.todorant")'
              )
                v-img(
                  width='170',
                  height='74',
                  aspect-ratio='1',
                  :src='playStoreButton'
                )
          v-col(cols=12, sm=6)
            v-img.d-flex.elevation-1(
              v-if='language && language !== "en" && language !== "ru"',
              :src='this.pictures.iphone'
            )
            iframe(
              v-else-if='language && language === "ru"',
              :style='youtubeStyle',
              src='https://www.youtube-nocookie.com/embed/VWs4GFr9blI',
              frameborder='0',
              allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture',
              allowfullscreen=''
            )
            iframe(
              v-else,
              :style='youtubeStyle',
              src='https://www.youtube-nocookie.com/embed/EHI8gCtHTII',
              frameborder='0',
              allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture',
              allowfullscreen=''
            )
        v-row.text-left
          v-col(cols=12, sm=6)
            p.display-1 {{ $t("homeShort.differenceTitle") }}
            p {{ $t("homeShort.differenceText1") }}
            p {{ $t("homeShort.differenceText2") }}
            p {{ $t("homeShort.differenceText3") }}
          v-col(cols=12, sm=6)
            p.display-1 {{ $t("homeShort.dealTitle") }}
            p {{ $t("homeShort.dealText1") }}
            p {{ $t("homeShort.dealText2") }}
            p {{ $t("homeShort.dealText3") }}
        v-row
          v-col(cols=0, sm=4)
          v-col(cols=12, sm=4)
            v-flex.text-center
              v-btn.primary(block, @click='signinDialog = true') {{ $t("home.signIn") }}
              p.caption.pa-2 {{ $t("home.youAreRegistered") }}
          v-col(cols=0, sm=4)
        v-row.mb-4
          v-col
            v-img.d-flex.elevation-1(:src='pictures.web')
      div(v-else)
        v-row
          v-col(
            cols=12,
            sm=6,
            :class='["xs", "sm"].includes(this.$vuetify.breakpoint.name) ? "text-center" : "text-left"'
          )
            p.my-1.display-1 {{ $t("home.headline[0]") }}
            p.my-1.display-1 {{ $t("home.headline[1]") }}
            p.mt-1.display-1 {{ $t("home.headline[2]") }}
            p.title {{ $t("home.headline[3]") }}
            v-flex.text-center
              v-btn.primary(block, @click='signinDialog = true') {{ $t("home.signIn") }}
              p.caption.pa-2 {{ $t("home.youAreRegistered") }}
            .d-flex.direction-row.justify-center
              a.pt-3(
                @click='open(`https://apps.apple.com/${appstoreLanguage}/app/todorant/id1482078243`)'
              )
                v-img(
                  width='150',
                  height='50',
                  aspect-ratio='1',
                  :src='appStoreButton'
                )
              a.pl-1(
                @click='open("https://play.google.com/store/apps/details?id=com.todorant")'
              )
                v-img(
                  width='170',
                  height='74',
                  aspect-ratio='1',
                  :src='playStoreButton'
                )
          v-col(cols=12, sm=6)
            v-img.d-flex.elevation-1(
              v-if='language && language !== "en" && language !== "ru"',
              :src='this.pictures.iphone'
            )
            iframe(
              v-else-if='language && language === "ru"',
              :style='youtubeStyle',
              src='https://www.youtube-nocookie.com/embed/VWs4GFr9blI',
              frameborder='0',
              allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture',
              allowfullscreen=''
            )
            iframe(
              v-else,
              :style='youtubeStyle',
              src='https://www.youtube-nocookie.com/embed/EHI8gCtHTII',
              frameborder='0',
              allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture',
              allowfullscreen=''
            )
        v-row
          v-col
            p.display-1 {{ $t("home.texts.level[0]") }}
            p {{ $t("home.texts.level[1]") }}
            p {{ $t("home.texts.level[2]") }}
        v-row
          v-col
            v-img.d-flex.elevation-1(:src='pictures.web')
        v-row
          v-col
            p.display-1 {{ $t("home.texts.winter[0]") }}
            p {{ $t("home.texts.winter[1]") }}
            p {{ $t("home.texts.winter[2]") }}
            p.display-1 {{ $t("home.texts.solution[0]") }}
            p {{ $t("home.texts.solution[1]") }}
            p {{ $t("home.texts.solution[2]") }}
        v-row
          v-col(cols=12, sm=6)
            v-img.d-flex.elevation-1(:src='this.pictures.android')
          v-col(cols=12, sm=6)
            p.display-1 {{ $t("home.texts.consequences.title") }}
            ul
              li(v-for='text in $t("home.texts.consequences.points")') {{ text }}
        v-row
          v-col
            p.display-1 {{ $t("home.texts.deal[0]") }}
            p {{ $t("home.texts.deal[1]") }}
            p
              | {{ $t("home.texts.deal[2]") }}
              a(@click='openRules') {{ $t("home.texts.deal[3]") }}
              | {{ $t("home.texts.deal[4]") }}
            p.display-1 {{ $t("home.texts.personal[0]") }}
            p {{ $t("home.texts.personal[1]") }}
        v-row
          v-col(cols=0, sm=4)
          v-col(cols=12, sm=4)
            v-flex.text-center
              v-btn.primary(block, @click='signinDialog = true') {{ $t("home.signIn") }}
              p.caption.pa-2 {{ $t("home.youAreRegistered") }}
          v-col(cols=0, sm=4)
      v-row
        v-col
          p.display-1 {{ $t("home.feedback.title") }}
      v-flex(row, justify-center)
        v-col(
          v-for='(review, i) in $t("home.feedback.reviews")',
          :key='i',
          cols='12',
          sm='6'
        )
          v-card
            v-list-item.px-4.pt-3
              v-list-item-avatar
                img(
                  :src='`/avatars/${review.username || $t("home.feedback.reviews", "en")[i].username}.jpg`'
                )
              v-list-item-content
                a(
                  :href='`https://t.me/${review.username || $t("home.feedback.reviews", "en")[i].username}`'
                ) @{{ review.username || $t("home.feedback.reviews", "en")[i].username }}
            v-card-text.text-left
              p(v-for='(text, i) in review.text.split("\\n")') {{ text }}
      v-row.pt-4
        v-col(cols=0, sm=4)
        v-col(cols=12, sm=4)
          v-flex.text-center
            v-btn.primary(block, @click='signinDialog = true') {{ $t("home.signIn") }}
            p.caption.pa-2 {{ $t("home.lastSignIn") }}
        v-col(cols=0, sm=4)
      v-row.justify-center
        a.pt-3(
          @click='open(language === "ru" ? "https://apps.apple.com/ru/app/todorant/id1482078243" : "https://apps.apple.com/us/app/todorant/id1482078243")'
        )
          v-img(
            width='150',
            height='50',
            aspect-ratio='1',
            :src='appStoreButton'
          )
        a.pl-1(
          @click='open("https://play.google.com/store/apps/details?id=com.todorant")'
        )
          v-img(
            width='170',
            height='74',
            aspect-ratio='1',
            :src='playStoreButton'
          )
      v-row(no-gutters)
        v-col.text-center
          p.caption.ma-0
            | {{ $t("home.texts.contact[0]") }}
            a(href='mailto:n@borodutch.com') n@borodutch.com
            | {{ $t("home.texts.contact[1]") }}
          router-link.caption.ma-0(to='/privacy') {{ $t("home.privacy") }}
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'
import Component from 'vue-class-component'
import { i18n } from '@/plugins/i18n'
import { logEvent } from '@/utils/logEvent'
import SigninDialog from '@/views/home/SigninDialog.vue'
import { serverBus } from '@/main'
import { namespace } from 'vuex-class'

const AppStore = namespace('AppStore')

@Component({
  components: { SigninDialog },
})
export default class Home extends Vue {
  @AppStore.State dark!: boolean
  @AppStore.State language?: string
  @AppStore.State landingABTestGroup!: number

  signinDialog = false
  youtubeStyle = {
    width: '100%',
    height: '100%',
    minHeight: '300px',
    maxHeight: '400px',
  }

  mounted() {
    logEvent('home_mounted')
  }

  closeSignin() {
    this.signinDialog = false
  }

  get pictures() {
    return {
      iphone: `img/screenshots/ios/${this.languageImageTag('ios')}-1Current${
        this.dark ? 'Dark' : ''
      }.png.png`,
      android: `img/screenshots/android/${this.languageImageTag(
        'android'
      )}-2Planning${this.dark ? 'Dark' : ''}.png`,
      web: `img/screenshots/web/${this.languageImageTag('web')}${
        this.dark ? '-dark' : ''
      }.png`,
    }
  }

  get appStoreButton() {
    return `/img/appstore/${this.language || 'en'}.svg`
  }

  get playStoreButton() {
    return `/img/playstore/${this.language || 'en'}.svg`
  }

  get appstoreLanguage() {
    switch (i18n.locale) {
      case undefined:
        return 'us'
      case 'en':
        return 'us'
      case 'ua':
        return 'us'
      default:
        break
    }
    return i18n.locale
  }

  languageImageTag(platform: string) {
    switch (i18n.locale) {
      case undefined:
        return platform === 'web' ? 'en' : 'en-US'
      case 'en':
        return platform === 'web' ? 'en' : 'en-US'
      case 'ru':
        return platform === 'web'
          ? 'ru'
          : platform === 'android'
          ? 'ru-RU'
          : 'ru'
      case 'ua':
        return platform === 'web' ? 'ua' : 'uk'
      case 'es':
        return platform === 'web'
          ? 'es'
          : platform === 'android'
          ? 'es'
          : 'es-ES'
      case 'it':
        return platform === 'web'
          ? 'it'
          : platform === 'android'
          ? 'it-IT'
          : 'it'
    }
    return 'en-US'
  }

  get imageModifier() {
    return `${i18n.locale || 'en'}-${this.mode}`
  }

  get mode() {
    return this.dark ? 'dark' : 'light'
  }

  open(link: string) {
    logEvent('open_link', { link })
    window.open(link, '_blank')
  }
  openRules() {
    serverBus.$emit('rulesRequested')
  }
}
</script>

<style>
@font-face {
  font-family: 'Roboto-Medium';
  src: url(/fonts/Roboto-Medium.ttf) format('truetype');
}
</style>
