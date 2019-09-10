<template lang="pug">
  nav
    // Rules dialog
    Rules(:dialog='rulesDialog' :close='closeRules')
    // Navbarand app
    v-app-bar(flat app)
      // Title
      a(@click='goHome')
        v-toolbar-title.text-uppercase.grey--text
          v-tooltip(v-if='$store.state.user' bottom)
            template(v-slot:activator='{ on }')
              span(v-on='on') {{$t('title')}}
            span {{$store.state.user.name}}, {{$store.state.user.email || $store.state.user.facebookId || $store.state.user.telegramId}}
          span(v-else) {{$t('title')}}
      v-spacer
      // Rules
      v-btn(text icon color='grey' @click='rulesDialog = true')
        v-icon(small) assignment
      // Dark mode
      v-btn(text icon color='grey' @click='toggleMode')
        v-icon(small) brightness_2
      // Language picker
      v-menu(offset-y)
        template(v-slot:activator='{ on }')
          v-btn(text icon color='grey' v-on='on') {{currentLocale.icon}}
        v-list
          v-list-item(v-for='locale in locales' @click='changeLanguage(locale.code)' :key="locale.code")
            v-list-item-title {{locale.icon}}
      // Logout
      v-btn(v-if="$store.state.user"
      text
      icon
      color='grey'
      @click='logout')
        v-icon(small) exit_to_app
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import * as store from "../plugins/store";
import { i18n } from "../plugins/i18n";
import * as api from "../utils/api";
import Rules from "./Rules.vue";
import { serverBus } from "../main";

@Component({
  components: {
    Rules
  }
})
export default class Navbar extends Vue {
  rulesDialog = false;

  get locales() {
    return [{ icon: "🇺🇸", code: "en" }, { icon: "🇷🇺", code: "ru" }];
  }
  get currentLocale() {
    for (const locale of this.locales) {
      if (locale.code === i18n.locale) {
        return locale;
      }
    }
  }

  toggleMode() {
    store.setDark(!store.dark());
    (this.$vuetify.theme as any).dark = store.dark();
  }
  changeLanguage(locale: string) {
    i18n.locale = locale;
    store.setLanguage(locale);
    document.title = i18n.t("title") as string;
  }
  logout() {
    store.logout();
    this.$router.replace("/");
  }
  closeRules() {
    this.rulesDialog = false;
  }
  async goHome() {
    try {
      await this.$router.replace(store.user() ? "/superpower" : "/");
      serverBus.$emit("refreshRequested");
    } catch (err) {
      // Do nothing
    }
  }
}
</script>

<style>
nav a:link {
  text-decoration: none;
}

nav a:visited {
  text-decoration: none;
}

nav a:hover {
  text-decoration: underline;
}

nav a:active {
  text-decoration: underline;
}
</style>

