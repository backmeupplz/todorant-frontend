<template lang="pug">
.v-container
  // Sign in
  SigninDialog(:dialog='signinDialog', :close='closeSignin')
  // Main content
  v-layout
    v-col.mx-0.px-0
      // Title
      .title-container.text-left.margined-when-small
        .orange-box
        .d-flex.flex-column
          .title-text
            p.ma-0.bold-title {{ $t("homeShort.headline") }}
            p.ma-0.bold-title {{ $t("homeShort.headline2") }}
            ul.normal-bullets.bullets-box
              li {{ $t("homeShort.feature1") }}
              li {{ $t("homeShort.feature2") }}
              li {{ $t("homeShort.feature3") }}
              li {{ $t("homeShort.feature4") }}
        .d-flex.flex-column
          v-row.login-button-container
            a.login-button(
              @click='signinDialog = true',
              rel='noreferrer noopener'
            )
              span {{ $t("home.signIn") }}
            .d-flex.justify-center
              a.pl-2(
                @click='open(`https://apps.apple.com/${appstoreLanguage}/app/todorant/id1482078243`)',
                rel='noreferrer noopener'
              )
                img.store-button(src='/img/appstore.svg', alt='App Store logo')
              a.px-2(
                @click='open("https://play.google.com/store/apps/details?id=com.todorant")',
                rel='noreferrer noopener'
              )
                img.store-button(
                  src='/img/playstore.svg',
                  alt='Play Store logo'
                )
          .youtube-container
            lite-youtube.youtube-video(
              v-if='(language && language === "ru") || isRussian',
              videoId='heR0rlllTVg'
            )
            lite-youtube.youtube-video(videoId='lYXhqHt7_QY', v-else)
      // Difference
      .responsive-block.text-left
        .margined-when-small
          p.text-title(:class='textClass') {{ $t("homeShort.differenceTitle") }}
          p.text-normal(:class='textClass') {{ $t("homeShort.differenceText1") }}
          p.text-normal(:class='textClass') {{ $t("homeShort.differenceText2") }}
          p.text-normal(:class='textClass') {{ $t("homeShort.differenceText3") }}
        div
          .screenshot-container
            .screen.blue-screenshot.rotate-right
            .screen.yellow-screenshot.rotate-left
            img.real-screenshot(:src='screenshot', alt='Screenshot')
      // Cross platform
      .responsive-block.text-left
        .margined-when-small
          p.text-title(:class='textClass') {{ $t("home.crossplatform.title") }}
          DownloadLinks
      .text-left.margined-when-small
        p.text-title(:class='textClass') {{ $t("home.feedback.title") }}
      // Reviews
      Reviews.margined-when-small
      // Act
      .orange-box-act.margined-when-small
        .title-act {{ $t("home.act") }}
        v-row.login-button-container
          a.login-button(
            @click='signinDialog = true',
            rel='noreferrer noopener'
          )
            span {{ $t("home.signIn") }}
          .d-flex.justify-center
            a.pl-2(
              @click='open(`https://apps.apple.com/${appstoreLanguage}/app/todorant/id1482078243`)',
              rel='noreferrer noopener'
            )
              img.store-button(src='/img/appstore.svg', alt='App Store logo')
            a.px-2(
              @click='open("https://play.google.com/store/apps/details?id=com.todorant")',
              rel='noreferrer noopener'
            )
              img.store-button(src='/img/playstore.svg', alt='Play Store logo')
      // Footer
      .footer-text.justify-space-between.margined-when-small
        span
          | {{ $t("home.texts.contact[0]") }}
          a(href='mailto:n@borodutch.com', rel='noreferrer noopener') n@borodutch.com
          | {{ $t("home.texts.contact[1]") }}
        router-link.ml-1(to='/privacy') {{ $t("home.privacy") }}
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { i18n } from '@/plugins/i18n'
import { logEvent } from '@/utils/logEvent'
import SigninDialog from '@/views/home/SigninDialog.vue'
import Reviews from '@/components/Reviews.vue'
import DownloadLinks from '@/components/DownloadLinks.vue'
import { serverBus } from '@/main'
import { namespace } from 'vuex-class'
import '@justinribeiro/lite-youtube'

const AppStore = namespace('AppStore')

@Component({
  components: { SigninDialog, Reviews, DownloadLinks },
})
export default class Home extends Vue {
  @AppStore.State dark!: boolean
  @AppStore.State language?: string

  signinDialog = false

  mounted() {
    logEvent('home_mounted')
  }

  closeSignin() {
    this.signinDialog = false
  }

  get isRussian() {
    return (
      !this.language &&
      (navigator.languages.includes('ru') ||
        navigator.language.includes('ru-RU'))
    )
  }

  get appstoreLanguage() {
    switch (i18n.locale) {
      case undefined:
        return 'us'
      case 'en':
        return 'us'
      case 'uk':
        return 'us'
      default:
        break
    }
    return i18n.locale
  }

  get textClass() {
    return this.dark ? 'white-text' : ''
  }

  get languageImageTag() {
    return i18n.locale
  }

  get imageModifier() {
    return `${i18n.locale || 'en'}-${this.mode}`
  }

  get mode() {
    return this.dark ? 'dark' : 'light'
  }

  get screenshot() {
    return this.dark
      ? `/img/screenshots/${this.languageImageTag}-dark.webp`
      : `/img/screenshots/${this.languageImageTag}.webp`
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

/* Title */
.title-container {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: space-between;
}
.orange-box {
  background: linear-gradient(93.58deg, #ff5f13 0%, #ff8a53 100%);
  border-radius: 20px;
  position: absolute;
  top: 0;
  left: 0;
  right: 64px;
  bottom: 64px;
  z-index: -1;
}
.title-text {
  margin-left: 36px;
  margin-top: 36px;
}
.bold-title {
  font-family: 'Montserrat', sans-serif;
  font-weight: 800;
  color: white;
  font-size: 28px;
  line-height: 34px;
}
.bullets-box {
  margin-top: 24px;
  margin-bottom: 100px;
}
.normal-bullets {
  font-family: 'Montserrat', sans-serif;
  color: white;
  font-weight: 500;
  font-size: 16px;
  line-height: 30px;
}
.youtube-container {
  display: flex;
  justify-content: flex-end;
}
.youtube-video {
  box-shadow: 0px 5px 40px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  width: 460px;
  height: 246px;
}
.login-button {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  padding: 12px 45px;
  width: 160px;
  height: 47px;
}
.login-button span {
  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 22px;

  color: #ffffff;
}

/* Text */
.text-title {
  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  font-size: 48px;
  line-height: 59px;

  color: #0f0f0f;
  margin-top: 40px;
  margin-bottom: 12px;
}
.text-normal {
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 22px;

  color: #0f0f0f;

  opacity: 0.8;
}

/* Screenshot */
.screenshot-container {
  margin-top: 40px;
  position: relative;
  height: 425px;
  width: 425px;
  overflow: hidden;
  display: flex;
  justify-content: center;
}
.screen {
  width: 300px;
  height: 607px;
  border-radius: 64px;
  top: 20px;
}
.rotate-left {
  transform: rotate(-10deg);
  position: absolute;
}
.rotate-right {
  transform: rotate(10deg);
  position: absolute;
}
.yellow-screenshot {
  background: #ffd166;
}
.blue-screenshot {
  background: #3366ff;
}
.real-screenshot {
  position: absolute;
  width: 300px;
  border-radius: 32px;
  top: 20px;
  box-shadow: 0px 5px 40px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

/* Act */
.title-act {
  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  font-size: 48px;
  line-height: 30px;

  color: #ffffff;
  text-align: center;
  margin-bottom: 24px;
}
.orange-box-act {
  background: linear-gradient(93.58deg, #ff5f13 0%, #ff8a53 100%);
  border-radius: 20px;
  padding: 48px;
  flex: 1;
  align-items: center;
  flex-direction: column;
  margin-top: 64px;
}

/* Footer */
.footer-text {
  margin: 48px 0px;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;

  color: #868a9a;
  text-align: left;
}

/* White text */
.white-text {
  color: #ffffff;
}
/* Responsiveness */
@media only screen and (max-width: 1040px) {
  .home-container {
    padding: 0px 12px;
  }
  .margined-when-small {
    margin-left: 16px;
    margin-right: 16px;
  }
}
.login-button-container {
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.store-button {
  width: 54px;
  height: 47px;
}
.responsive-block {
  display: flex;
  flex-direction: row;
}

@media only screen and (max-width: 850px) {
  .responsive-block {
    flex-direction: column;
  }
  .title-text {
    margin-bottom: 24px;
  }
  .screenshot-container {
    width: 100%;
  }
  .title-container {
    flex-direction: column;
  }
  .orange-box {
    right: 0;
  }
  .bullets-box {
    margin-top: 24px;
    margin-bottom: 0px;
  }
  .login-button-container-bottom {
    justify-content: start;
    padding-left: 36px;
    padding-right: 36px;
    flex-direction: column;
    align-items: center;
  }
  .youtube-container {
    justify-content: center;
    margin-top: 36px;
  }
  .login-button-container a {
    margin-bottom: 12px;
  }
  .login-button-container {
    margin-bottom: 24px;
  }
}
/* Mobile */
@media only screen and (max-width: 600px) {
  .title-text {
    margin-left: 16px;
    margin-top: 16px;
  }
  .bold-title {
    font-size: 20px;
    line-height: 26px;
  }
  .text-title {
    font-size: 24px;
    line-height: 28px;
  }
  .orange-box-act {
    padding: 16px;
  }
  .title-act {
    font-size: 24px;
  }
  .youtube-video {
    min-width: 200px;
    min-height: 100px;
  }
}
@media only screen and (max-width: 400px) {
  .screen {
    width: 200px !important;
  }
  .real-screenshot {
    width: 200px !important;
  }
}
</style>
