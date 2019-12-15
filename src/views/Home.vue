<template lang="pug">
  .v-container.pa-4
    v-dialog(v-model='signinDialog' max-width="289")
      v-card
        v-card-text.pt-4
          v-flex.text-center
            fb-signin-button(:params='{ scope: "email", return_scopes: true}'
            @success='onFacebookSignInSuccess'
            @error='onFacebookSignInError') {{$t('home.facebook')}}
            g-signin-button(:params='{ client_id: googleClientId }'
            @success='onGoogleSignInSuccess'
            @error='onGoogleSignInError') {{$t('home.google')}}
            vue-apple-signin.signin-button
            vue-telegram-login(mode='callback'
            telegram-login='todorant_bot'
            @callback='onTelegramAuth'
            radius='3'
            :userpic='false')
    v-layout
      v-col
        v-row
          v-col(cols=12 sm=6 :class='["xs", "sm"].includes(this.$vuetify.breakpoint.name) ? "text-center": ""')
            p.my-1.display-1 Never forget a task.
            p.my-1.display-1 Always get it done.
            p.mt-1.display-1 Live a happy life.
            p.title Powered by Todorant.
            v-flex.text-center
              v-btn.primary(block @click='signinDialog = true') Sign in
              p.caption.pa-2 (you are already registered)
          v-col(cols=12 sm=6)
            v-img(src='img/iphone.png').d-flex.elevation-1
        v-row
          v-col
            p.display-1 I was once like you
            p I spent hours and hours trying to get stuff done and it looked like nothing could help. New tasks kept coming and old ones kept piling up. There was no escape — none of the task managers worked, the only purpose they served was upsetting me with all these things I forgot and all the tasks I never finished.
            p While complicated and sophisticated tools with plenty of features can be useful to keep track of some tasks, cognitive psychology tells us that overwhelming our subconsciousness with all the hanging tasks that weren't accounted for can use up a major chunk of our brain that should otherwise be in charge of providing the happiness feeling.
        v-row
          v-col
            v-img(src='img/desktop.png').d-flex.elevation-1
        v-row
          v-col
            p.display-1 The winter is coming
            p Even though the world population is happier than ever, personal productivity has recently took a hit. If we follow the same trend, we might find ourselves among the grey mass of generic humans who are no longer productive and cannot complete a single more or less difficult and complex task — simply because anxiety won't let us.
            p Number of people, who forget about important events with their significant others, who promise to do more than they can handle, who keep thinking about "that thing that I should check but I'm not sure what" instead of getting things done is going to be on a rise very soon. You can also find yourselves among the mindless biological machines that only perform simple low-paid tasks if you don't take action.
            p.display-1 But you have the solution
            p After making myself familiar with the books about cognitive science like "Eat That Frog", "Willpower", "Atomic Habbits" and "Getting Things Done", I developed a system that boosted my productivite by 10 times. I am now able to complete 10 times more tasks which leads to 10 times more projects launched with this simple system. I'm sharing this solution with you in order to improve the environment I live in. If people around me thrive — my personal happiness increases as well.
            p Todorant is a plain vanilla todo list with one single catch. Every action and feature were carefully weighted and tested using cognitive phsychology. I have used the decades of studies and packed them into a single simple silver-bullet productivity tool. Todorant tricks your mind into doing more good actions and less bad actions. It builds you positive habits and gets rid of bad behaviour. So stop mindlessly writing down your tasks. Start using the system that works.
        v-row
          v-col(cols=12 sm=6)
            v-img(src='img/android.jpg').d-flex.elevation-1
          v-col(cols=12 sm=6)
            p.display-1 Consequences?
            ul
              li Your inbox will always be empty
              li Unwanted tasks (frogs) will be dealt with
              li No projects will stagnate
              li Your brain will naturally crave effectiveness
              li You will never forget anything
              li People will start admiring your productivity
        v-row
          v-col
            p.display-1 What's the deal?
            p Todorant is more expensive than other todo solutions, yes. In fact, the industry standard is $3/month whereas Todorant has 30 days free trial (no credit card required) and then costs $5/month. Yes, Todorant has less features than it's competitors — but it is on purpose.
            p
              | When others sell you a place to park your todos indefinitely, Todorant sells the methodology and ideology — Todorant sells getting stuff done, not mindlessly writing it down. Todorant isn't for everybody — it is crafted specifically for people who want to free their mind from pressing issues and finally start completing the projects. You can familiarize yourselves with the methodology by 
              a(@click='openRules') opening the rulebook
              |  on the top-right corner of this page.
            p.display-1 What would I do?
            p If I had a chance to try Todorant before I implemented it — I would definitelly give it a try. It's free for the first 30 days — and it is just enough to try if the system works for me. And, damn, if it works and I get my stuff done — I'd pay whatever price to keep up the productivity streak. There are no strings attached — just login and try Todorant today. You can find the buttons below. Enough talking — time to boost the productivity levels!
        v-row
          v-col(cols=0 sm=4)
          v-col(cols=12 sm=4)
            v-flex.text-center
              v-btn.primary(block  @click='signinDialog = true') Sign in
              p.caption.pa-2 (you are already registered)
          v-col(cols=0 sm=4)
        v-row
          v-col
            p.display-1 What do people say?
        v-row
          v-col(v-for='(review, i) in $t("home.feedback.reviews")'
          :key='i'
          cols='12'
          sm='6')
            v-card
              v-list-item.px-4.pt-3
                v-list-item-avatar
                  img(:src='`/avatars/${review.username}.jpg`')
                v-list-item-content
                  a(:href='`https://t.me/${review.username}`') @{{review.username}}
              v-card-text
                p(v-for='(text, i) in review.text.split("\\n")') {{text}}
        v-row
          v-col(cols=0 sm=4)
          v-col(cols=12 sm=4)
            v-flex.text-center
              v-btn.primary(block @click='signinDialog = true') Sign in
              p.caption.pa-2 (alright, this is the last button, sign in already)
          v-col(cols=0 sm=4)
        v-row(no-gutters)
          v-col.text-center
            p.caption.ma-0
              | Still got questions? Contact me directly at 
              a(href='mailto:n@borodutch.com') n@borodutch.com
              | . Thank you.
            router-link.caption.ma-0(to='/privacy') Privacy policy
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";
import {
  loginFacebook,
  loginTelegram,
  loginGoogle,
  loginApple
} from "../utils/api";
import * as store from "../plugins/store";
import Component from "vue-class-component";
import { i18n } from "../plugins/i18n";
const { vueTelegramLogin } = require("vue-telegram-login");
import { reportGA } from "../utils/ga";
import { serverBus } from "../main";

// FB object is global, declaring here for TS
declare const FB: any;

@Component({
  components: {
    vueTelegramLogin
  }
})
export default class Home extends Vue {
  signinDialog = true;

  created() {
    if (this.$route.query && this.$route.query.hash) {
      if (!store.user()) {
        this.onTelegramAuth(this.$route.query);
      }
    } else if (this.$route.query && this.$route.query.apple) {
      if (!store.user()) {
        this.onAppleAuth(JSON.parse(this.$route.query.apple as string));
      }
    }
  }

  mounted() {
    reportGA("home_mounted");
  }

  get googleClientId() {
    return "599005831909-krrl1m3k011n7qdrkv1voio9cgdv7a0t.apps.googleusercontent.com";
  }

  async onFacebookSignInSuccess(response: any) {
    try {
      const user = await loginFacebook(response.authResponse.accessToken);
      store.setUser(user);
      this.signinDialog = false;
      this.$router.replace("superpower");
      reportGA("login_success", { provider: "facebook" });
    } catch (err) {
      console.error(err);
      store.setSnackbarError("errors.login.facebook");
      reportGA("login_error", { provider: "facebook", error: err.message });
    }
  }
  onFacebookSignInError(error: Error) {
    console.error(error);
    store.setSnackbarError("errors.login.facebook");
    reportGA("login_error", { provider: "facebook", error: error.message });
  }
  async onGoogleSignInSuccess(googleUser: any) {
    try {
      const user = await loginGoogle(googleUser.getAuthResponse().id_token);
      store.setUser(user);
      this.signinDialog = false;
      this.$router.replace("superpower");
      reportGA("login_success", { provider: "google" });
    } catch (err) {
      console.error(err);
      store.setSnackbarError("errors.login.google");
      reportGA("login_error", { provider: "google", error: err.message });
    }
  }
  onGoogleSignInError(error: Error) {
    console.error(error);
    store.setSnackbarError("errors.login.google");
    reportGA("login_error", { provider: "google", error: error.message });
  }
  async onTelegramAuth(loginInfo: any) {
    try {
      const user = await loginTelegram(loginInfo);
      store.setUser(user);
      this.signinDialog = false;
      this.$router.replace("superpower");
      reportGA("login_success", { provider: "telegram" });
    } catch (err) {
      console.error(err);
      store.setSnackbarError("errors.login.telegram");
      reportGA("login_error", { provider: "telegram", error: err.message });
    }
  }
  async onAppleAuth(loginInfo: any) {
    try {
      const user = await loginApple(loginInfo);
      store.setUser(user);
      this.signinDialog = false;
      this.$router.replace("superpower");
      reportGA("login_success", { provider: "apple" });
    } catch (err) {
      console.error(err);
      store.setSnackbarError("errors.login.apple");
      reportGA("login_success", { provider: "apple" });
    }
  }
  open(link: string) {
    reportGA("open_link", { link });
    window.open(link, "_blank");
  }
  openRules() {
    serverBus.$emit("rulesRequested");
  }
}
</script>

<style>
.fb-signin-button {
  margin: 10px 0px;
  width: 239px;
}
.g-signin-button {
  margin: 10px 0px;
  width: 239px;
}
.signin-button {
  width: 239px;
  height: 44px;
  cursor: pointer;
  display: block;
  border-radius: 3px;
}
@media only screen and (max-width: 960px) {
  .signin-button {
    margin: 10px auto 10px;
  }
  .fb-signin-button {
    margin: 10px auto 10px;
  }
  .g-signin-button {
    margin: 10px auto 10px;
  }
}
</style>