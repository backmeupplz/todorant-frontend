<template lang="pug">
  v-app
    cookie-law(theme='blood-orange'
    :buttonText='$t("cookie.button")'
    :message='$t("cookie.message")')
    Snackbar
    Navbar
    v-content
      router-view
</template>

<script lang="ts">
import Navbar from "./components/Navbar.vue";
import Snackbar from "./components/Snackbar.vue";
import * as store from "./plugins/store";
const CookieLaw = require("vue-cookie-law");

export default {
  components: { Navbar, CookieLaw, Snackbar },
  created() {
    (this as any).$vuetify.theme.dark = store.dark();
    (document as any)
      .querySelector('meta[name="theme-color"]')
      .setAttribute("content", store.dark() ? "#303030" : "#fafafa");
    store.setSnackbar({
      message: "",
      color: "error",
      active: false
    });
  }
};
</script>
