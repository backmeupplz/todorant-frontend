<template lang="pug">
  nav
    // Rules dialog
    Rules(:dialog='rulesDialog' :close='closeRules')
    // Merge dialog
    Merge(:dialog='mergeDialog' :close='closeMerge')
    // Subscription dialog
    Subscription(:dialog='subscriptionDialog' :close='closeSubscription')
    // Settings dialog
    Settings(:dialog='settingsDialog' :close='closeSettingsDialog')
    // Navbarand app
    v-app-bar(flat app style='maxWidth: 1000px; margin: auto')
      // Title
      a(@click='goHome')
        v-toolbar-title.text-uppercase.grey--text
          v-tooltip(v-if='$store.state.user' bottom)
            template(v-slot:activator='{ on }')
              span(v-on='on') {{$t('title')}}{{hashSuffix}}
            p {{$store.state.user.name}}
            p(v-for='identifier in identifiers') {{identifier}}
          span(v-else) {{$t('title')}}{{hashSuffix}}
      v-spacer
      // Rules
      v-btn(text icon color='grey' @click='rulesDialog = true')
        v-icon(small) assignment
      // Language picker
      v-menu(offset-y)
        template(v-slot:activator='{ on }')
          v-btn(text icon color='grey' v-on='on') {{currentLocale.code}}
        v-list
          v-list-item(v-for='locale in locales' @click='changeLanguage(locale.code)' :key="locale.code")
            v-list-item-title 
              flag(:iso='locale.icon')
      // Extra
      v-menu(offset-y)
        template(v-slot:activator='{ on }')
          v-btn(text icon color='grey' v-on='on')
            v-icon(small) more_vert
        v-list
          // Dark mode
          v-list-item(@click='toggleMode')
            v-list-item-title {{$store.state.dark ? $t('menu.darkMode.on') : $t('menu.darkMode.off')}}
          // Merge accounts
          v-list-item(@click='mergeDialog = true' 
          v-if='!!$store.state.user')
            v-list-item-title {{$t('menu.merge')}}
          // Subscription
          v-list-item(@click='showSubscription' 
          v-if='!!$store.state.user')
            v-list-item-title {{$t('subscription.title')}}
          // Settings
          v-list-item(@click='settingsDialog = true' 
          v-if='!!$store.state.user')
            v-list-item-title {{$t('settings.title')}}
          // Logout
          v-list-item(@click='logout'
          v-if='!!$store.state.user')
            v-list-item-title {{$t('menu.logout')}}
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import * as store from "../plugins/store";
import { i18n } from "../plugins/i18n";
import * as api from "../utils/api";
import Rules from "./Rules.vue";
import Merge from "./Merge.vue";
import Subscription from "./Subscription.vue";
import Settings from "./Settings.vue";
import { serverBus } from "../main";
import { reportGA } from "../utils/ga";

@Component({
  components: {
    Rules,
    Merge,
    Subscription,
    Settings
  }
})
export default class Navbar extends Vue {
  rulesDialog = false;
  mergeDialog = false;
  subscriptionDialog = false;
  settingsDialog = false;

  get locales() {
    return [
      { icon: "us", code: "en" },
      { icon: "ru", code: "ru" },
      { icon: "ua", code: "ua" }
    ];
  }
  get currentLocale() {
    for (const locale of this.locales) {
      if (locale.code === i18n.locale) {
        return locale;
      }
    }
  }
  get identifiers() {
    const user = store.user();
    if (!user) {
      return "";
    }
    return [user.email, user.facebookId, user.telegramId].filter(v => !!v);
  }
  hashSuffix = "";
  updateHashSuffix() {
    this.hashSuffix = this.$router.currentRoute.hash;
  }

  created() {
    serverBus.$on("subscriptionRequested", () => {
      this.subscriptionDialog = true;
      reportGA("subscription_viewed", {
        status: store.userState().subscriptionStatus
      });
    });
    serverBus.$on("rulesRequested", () => {
      this.rulesDialog = true;
    });
    setInterval(this.updateHashSuffix, 1000);
  }
  mounted() {
    if (!store.rulesShown() && store.user()) {
      this.rulesDialog = true;
      store.setRulesShown(true);
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
  closeMerge() {
    this.mergeDialog = false;
  }
  closeSubscription() {
    this.subscriptionDialog = false;
  }
  closeSettingsDialog() {
    this.settingsDialog = false;
  }
  async goHome() {
    try {
      await this.$router.replace(store.user() ? "/superpower" : "/");
      serverBus.$emit("refreshRequested");
    } catch (err) {
      // Do nothing
    }
  }
  showSubscription() {
    reportGA("subscription_viewed", {
      status: store.userState().subscriptionStatus
    });
    this.subscriptionDialog = true;
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

