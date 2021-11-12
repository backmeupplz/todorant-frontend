<template lang="pug">
v-dialog(v-model='dialog', scrollable, max-width='600px', persistent)
  v-card
    v-card-text.pa-0.ma-0
      v-carousel(
        :show-arrows='false',
        hide-delimiter-background,
        v-model='index',
        :hide-delimiters='!$vuetify.breakpoint.mdAndUp'
      )
        v-carousel-item.pa-4
          .d-flex.justify-center.mb-4
            v-avatar(:size='100')
              v-img(
                :width='100',
                :height='100',
                src='/img/nikita.webp',
                alt='Nikita Kolmogorov'
              )
          p(:style='textStyle') {{ $t("introText0web") }}
          p(:style='textStyle') {{ $t("introText1") }}
          p(:style='textStyle') {{ $t("introText2web") }}
        v-carousel-item.pa-4
          .d-flex.justify-center.mb-4
            IndexCircle(index='1')
          p(:style='textStyle') {{ $t("introText3") }}
          p(:style='textStyle') {{ $t("introText4") }}
          p(:style='textStyle') {{ $t("introText5") }}
        v-carousel-item.pa-4
          .d-flex.justify-center.mb-4
            IndexCircle(index='2')
          p(:style='textStyle') {{ $t("introText6") }}
          p(:style='textStyle') {{ $t("introText7") }}
          p(:style='textStyle') {{ $t("introText8") }}
        v-carousel-item.pa-4
          .d-flex.justify-center.mb-4
            IndexCircle(index='3')
          p(:style='textStyle') {{ $t("introText9") }}
          p(:style='textStyle') {{ $t("introText10") }}
          p(:style='textStyle') {{ $t("introText11") }}
        v-carousel-item.pa-4
          .d-flex.justify-center.mb-4
            IndexCircle(index='😋', :morePadding='true')
          p(:style='textStyle') {{ $t("introText12") }}
          p(:style='textStyle') {{ $t("introText14web") }}
          p(:style='textStyle') {{ $t("introText15") }}
    .d-flex.flex-row.pa-2
      v-btn(color='blue', text, @click='back', v-if='index > 0') {{ $t("back") }}
      v-spacer
      v-btn(color='blue', text, @click='next') {{ $t(index === 4 ? "letsGo" : "next") }}
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

const AppStore = namespace('AppStore')

const IndexCircle = () => import('@/components/IndexCircle.vue')

@Component({
  components: {
    IndexCircle,
  },
})
export default class Welcome extends Vue {
  @Prop({ required: true }) dialog!: boolean
  @Prop({ required: true }) close!: () => void
  @Prop({ required: true }) openRules!: () => void

  @AppStore.State dark!: boolean

  index = 0

  openRulesDialog() {
    this.close()
    this.openRules()
  }

  back() {
    if (this.index > 0) {
      this.index--
    }
  }

  next() {
    if (this.index < 4) {
      this.index++
    } else {
      this.close()
    }
  }

  get textStyle() {
    return {
      color: this.dark ? 'rgba(255, 255, 255, 0.87)' : 'rgba(0, 0, 0, 0.87)',
    }
  }
}
</script>

<style></style>
