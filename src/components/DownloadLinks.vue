<template lang="pug">
.xplatform-container
  .xplatform-card(@click='signinDialog = true', v-if='showsWeb')
    .platform-image-box
      v-img(
        src='/img/platforms/webapp.svg',
        max-width='40px',
        max-height='34px'
      )
    p.xplatform-text Web
  .xplatform-card(
    @click='open(`https://apps.apple.com/${appstoreLanguage}/app/todorant/id1482078243`)'
  )
    .platform-image-box
      v-img(
        :src='dark ? "/img/platforms/apple.svg" : "/img/platforms/apple-black.svg"',
        max-width='28px',
        max-height='34px'
      )
    p.xplatform-text iOS
  .xplatform-card(
    @click='open("https://play.google.com/store/apps/details?id=com.todorant")'
  )
    .platform-image-box
      v-img(
        src='/img/platforms/android.svg',
        max-width='40px',
        max-height='24px'
      )
    p.xplatform-text Android
  .xplatform-card(
    @click='open("https://drive.google.com/uc?export=download&id=1wuRkPGzrnkKBeMiricZOaZ7s8voOdj7q")'
  )
    .platform-image-box
      v-img(
        src='/img/platforms/macos.svg',
        max-width='34px',
        max-height='34px'
      )
    p.xplatform-text macOS
  .xplatform-card(
    @click='open("https://drive.google.com/uc?export=download&id=1BlLXtet9g3G-MmlwTgY7T9iSOYfgLy1O")'
  )
    .platform-image-box
      v-img(
        src='/img/platforms/windows.svg',
        max-width='34px',
        max-height='34px'
      )
    p.xplatform-text Windows
  .xplatform-card(
    @click='open("https://drive.google.com/uc?export=download&id=1HuOa_Le9AWvDzbhvTQzAR2v6HZteyExH")'
  )
    .platform-image-box
      v-img(
        src='/img/platforms/linux.svg',
        max-width='34px',
        max-height='34px'
      )
    p.xplatform-text Linux
  .xplatform-card(@click='open("https://snapcraft.io/todorant")')
    .platform-image-box
      v-img(
        :src='dark ? "/img/platforms/snapcraft-white.svg" : "/img/platforms/snapcraft.svg"',
        max-width='34px',
        max-height='34px'
      )
    p.xplatform-text Snapcraft
  .xplatform-card(
    @click='open("https://chrome.google.com/webstore/detail/todorant/elbpjnphgkgohncpccajbomicnejijdk")'
  )
    .platform-image-box
      v-img(
        src='/img/platforms/chrome.svg',
        max-width='34px',
        max-height='34px'
      )
    p.xplatform-text Chrome
  .xplatform-card(
    @click='open("https://addons.mozilla.org/en-US/firefox/addon/todorant")'
  )
    .platform-image-box
      v-img(
        src='/img/platforms/firefox.svg',
        max-width='34px',
        max-height='34px'
      )
    p.xplatform-text Firefox
  .xplatform-card(@click='open("https://t.me/todorant_bot")')
    .platform-image-box
      v-img(
        src='/img/platforms/telegram.svg',
        max-width='34px',
        max-height='29px'
      )
    p.xplatform-text Telegram
</template>

<script lang="ts">
import { logEvent } from '@/utils/logEvent'
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

const AppStore = namespace('AppStore')

@Component
export default class DownloadLinks extends Vue {
  @Prop({ required: true, default: true }) showsWeb!: boolean

  @AppStore.State dark!: boolean

  open(link: string) {
    logEvent('open_link', { link })
    window.open(link, '_blank')
  }
}
</script>

<style>
.xplatform-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  justify-self: center;

  max-width: 600px;
}
.xplatform-card {
  width: 100px;
  height: 96px;
  background-color: rgba(255, 255, 255, 0.04);
  border-radius: 12px;
  padding: 16px;
  margin: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.theme--light .xplatform-card {
  background-color: rgba(0, 0, 0, 0.03);
}
.xplatform-card:hover {
  background: rgba(255, 255, 255, 0.1);
}
.theme--light .xplatform-card:hover {
  background: rgba(0, 0, 0, 0.1);
}
.xplatform-text {
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;

  color: #ffffff;

  margin-top: 8px;

  margin-bottom: 0px !important;
}
.theme--light .xplatform-text {
  color: black;
}
.platform-image-box {
  display: flex;
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
}
</style>
