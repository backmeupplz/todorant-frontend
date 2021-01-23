<template lang="pug">
.d-flex.flex-column.justify-center
  .d-flex.review-container
    v-btn.top-arrows(icon, @click='moveLeft')
      v-icon keyboard_arrow_left
    .d-flex.flex-row.text-left
      v-avatar
        img(
          :src='`/avatars/${currentReview.username || $t("home.feedback.reviews", "en")[index].username}.jpg`',
          :alt='`${currentReview.username} avatar`'
        )
      .d-flex.flex-column.review-text
        a.review-username(
          :href='`https://t.me/${currentReview.username || $t("home.feedback.reviews", "en")[index].username}`',
          target='_blank',
          rel='noreferrer noopener'
        ) @{{ currentReview.username || $t("home.feedback.reviews", "en")[this.index].username }}
        span.text-review(
          v-for='(text, i) in currentReview.text.split("\\n")',
          :class='textClass'
        ) {{ text }}
    v-btn.top-arrows(icon, @click='moveRight')
      v-icon keyboard_arrow_right
  .d-flex.flex-row.justify-center.mt-3.align-center
    v-btn.mr-2.bottom-arrows(icon, @click='moveLeft')
      v-icon keyboard_arrow_left
    .circle(
      v-for='(review, i) in reviews',
      :key='i',
      :class='i === index ? "" : "inactive"'
    )
    v-btn.ml-2.bottom-arrows(icon, @click='moveRight')
      v-icon keyboard_arrow_right
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { i18n } from '@/plugins/i18n'
import { namespace } from 'vuex-class'

const AppStore = namespace('AppStore')

@Component
export default class Reviews extends Vue {
  @AppStore.State dark!: boolean

  index = 0

  get reviews() {
    return (i18n.t('home.feedback.reviews') as any) as string[]
  }

  get currentReview() {
    return this.reviews[this.index]
  }

  get textClass() {
    return this.dark ? 'white-text' : ''
  }

  moveLeft() {
    if (this.index - 1 < 0) {
      this.index = this.reviews.length - 1
    } else {
      this.index--
    }
  }

  moveRight() {
    if (this.index + 1 > this.reviews.length - 1) {
      this.index = 0
    } else {
      this.index++
    }
  }
}
</script>

<style>
.review-text {
  margin: 0px 12px;
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 22px;

  color: #3d4152;
}

.review-username {
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;

  color: #3366ff;
  margin-bottom: 12px;
}

.text-review {
  margin: 3px;
  font-size: 16px;
}

.circle {
  width: 8px;
  height: 8px;

  background: #868a9a;
  border-radius: 20px;

  margin: 6px;
}

.inactive {
  opacity: 0.3;
}

/* Responsiveness */
.top-arrows {
  visibility: visible;
}
.bottom-arrows {
  visibility: hidden;
}
@media only screen and (max-width: 850px) {
  .review-container {
    justify-content: flex-start;
  }
  .top-arrows {
    visibility: hidden;
    width: 0px !important;
  }
  .bottom-arrows {
    visibility: visible;
  }
}
</style>
