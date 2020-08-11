<template lang="pug">
.v-container
  // Sign in
  SigninDialog(:dialog='signinDialog', :close='closeSignin')
  // Main content
  v-layout 
    v-col
      // Title
      v-row.title-container.text-left
        .orange-box
        v-col(cols=12, sm=6)
          .title-text
            p.ma-0.bold-title {{ $t("homeShort.headline") }}
            p.ma-0.bold-title {{ $t("homeShort.headline2") }}
            ul.normal-bullets.bullets-box
              li {{ $t("homeShort.feature1") }}
              li {{ $t("homeShort.feature2") }}
              li {{ $t("homeShort.feature3") }}
              li {{ $t("homeShort.feature4") }}
        v-col.d-flex.flex-column.justify-space-between(cols=12, sm=6)
          v-row
          v-row.d-flex.justify-end
            a.login-button.mt-3(@click='signinDialog = true')
              span {{ $t("home.signIn") }}
            a.pt-3.pl-1(
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
          v-row.justify-end
            iframe.youtube-video(
              v-if='language && language === "ru"',
              src='https://www.youtube-nocookie.com/embed/VWs4GFr9blI',
              frameborder='0',
              allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture',
              allowfullscreen=''
            )
            iframe.youtube-video(
              v-else,
              src='https://www.youtube-nocookie.com/embed/EHI8gCtHTII',
              frameborder='0',
              allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture',
              allowfullscreen=''
            )
      // Difference
      v-row.text-left
        v-col(cols=12, sm=6)
          p.text-title(:class='textClass') {{ $t("homeShort.differenceTitle") }}
          p.text-normal(:class='textClass') {{ $t("homeShort.differenceText1") }}
          p.text-normal(:class='textClass') {{ $t("homeShort.differenceText2") }}
          p.text-normal(:class='textClass') {{ $t("homeShort.differenceText3") }}
        v-col(cols=12, sm=6)
          .screenshot-container
            .screen.blue-screenshot.rotate-right
            .screen.yellow-screenshot.rotate-left
            img.real-screenshot(:src='screenshot')
      // Deal
      v-row.text-left
        p.text-title(:class='textClass') {{ $t("homeShort.dealTitle") }}
        p.text-normal(:class='textClass') {{ $t("homeShort.dealText1") }}
        p.text-normal(:class='textClass') {{ $t("homeShort.dealText2") }}
        p.text-normal(:class='textClass') {{ $t("homeShort.dealText3") }}
      v-row.text-left
        p.text-title(:class='textClass') {{ $t("home.feedback.title") }}
      // Reviews
      Reviews
      // Act
      .orange-box-act
        .title-act {{ $t("home.act") }}
        v-row.justify-center
          a.login-button.mt-3(@click='signinDialog = true')
            span {{ $t("home.signIn") }}
          a.pt-3.pl-1(
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
      // Footer
      v-row.footer-text.justify-space-between
        span
          | {{ $t("home.texts.contact[0]") }}
          a(href='mailto:n@borodutch.com') n@borodutch.com
          | {{ $t("home.texts.contact[1]") }}
        router-link(to='/privacy') {{ $t("home.privacy") }}
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'
import Component from 'vue-class-component'
import { i18n } from '@/plugins/i18n'
import { logEvent } from '@/utils/logEvent'
import SigninDialog from '@/views/home/SigninDialog.vue'
import Reviews from '@/components/Reviews.vue'
import { serverBus } from '@/main'
import { namespace } from 'vuex-class'

const AppStore = namespace('AppStore')

@Component({
  components: { SigninDialog, Reviews },
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
      ? `/img/screenshots/${this.languageImageTag}-dark.png`
      : `/img/screenshots/${this.languageImageTag}.png`
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
  position: relative;
  height: 425px;
  overflow: hidden;
  flex-direction: row-reverse;
}
.screen {
  width: 300px;
  height: 607px;
  border-radius: 64px;
  top: 20px;
  right: 45px;
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
  right: 45px;
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
}

/* White text */
.white-text {
  color: #ffffff;
}
</style>
