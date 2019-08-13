<template lang="pug">
  nav
    v-toolbar(flat app)
      // Title
      router-link(:to='$store.state.user ? "/superpower" : "/"')
        v-toolbar-title.text-uppercase.grey--text
          v-tooltip(v-if='$store.state.user' bottom)
            span.hidden-xs-only(slot='activator') {{$t('title')}}
            span.hidden-sm-and-up(slot='activator') {{$t('shortTitle')}}
            span {{$store.state.user.name}}, {{$store.state.user.email || $store.state.user.facebookId || $store.state.user.telegramId}}
          span(v-else slot='activator') {{$t('title')}}
      v-spacer
      // Dark mode
      v-btn(flat icon color='grey' @click='toggleMode')
        v-icon(small) brightness_2
      // Language picker
      v-menu(offset-y)
        v-btn(flat icon slot='activator' color='grey') {{currentLocale.icon}}
        v-list
          v-list-tile(v-for='locale in locales' @click='changeLanguage(locale.code)' :key="locale.code")
            v-list-tile-title {{locale.icon}}
      // Logout
      v-btn(v-if="$store.state.user"
      flat
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

@Component
export default class Navbar extends Vue {
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

