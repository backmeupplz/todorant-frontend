<template lang="pug">
  .v-container.pa-4
    h1 Terms and Conditions of Use
    h2 1. Terms
    p
      | By accessing this Website, accessible from https://todorant.com, you are agreeing to be bound by these Website Terms and Conditions of Use and agree that you are responsible for the agreement with any applicable local laws. If you disagree with any of these terms, you are prohibited from accessing this site. The materials contained in this Website are protected by copyright and trade mark law.
    h2 2. Disclaimer
    p
      | All the materials on Todorant’s Website are provided "as is". Todorant makes no warranties, may it be expressed or implied, therefore negates all other warranties. Furthermore, Todorant does not make any representations concerning the accuracy or reliability of the use of the materials on its Website or otherwise relating to such materials or any sites linked to this Website.
    h2 3. Limitations
    p
      | Todorant or its suppliers will not be hold accountable for any damages that will arise with the use or inability to use the materials on Todorant’s Website, even if Todorant or an authorize representative of this Website has been notified, orally or written, of the possibility of such damage. Some jurisdiction does not allow limitations on implied warranties or limitations of liability for incidental damages, these limitations may not apply to you.
    h2 4. Revisions and Errata
    p
      | The materials appearing on Todorant’s Website may include technical, typographical, or photographic errors. Todorant will not promise that any of the materials in this Website are accurate, complete, or current. Todorant may change the materials contained on its Website at any time without notice. Todorant does not make any commitment to update the materials.
    h2 5. Links
    p
      | Todorant has not reviewed all of the sites linked to its Website and is not responsible for the contents of any such linked site. The presence of any link does not imply endorsement by Todorant of the site. The use of any linked website is at the user’s own risk.
    h2 6. Site Terms of Use Modifications
    p
      | Todorant may revise these Terms of Use for its Website at any time without prior notice. By using this Website, you are agreeing to be bound by the current version of these Terms and Conditions of Use.
    h2 7. Your Privacy
    p
      | Please read 
      a(href="https://todorant.com/privacy") our Privacy Policy
      | .
    h2 8. Governing Law
    p
      | Any claim related to Todorant's Website shall be governed by the laws of ca without regards to its conflict of law provisions.
    router-link(to='/') Back to main page
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { logEvent } from '../utils/logEvent'

@Component
export default class Terms extends Vue {
  mounted() {
    logEvent('terms_viewed')
  }
}
</script>
