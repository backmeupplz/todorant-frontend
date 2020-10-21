// Dependencies
import Vue from 'vue'

Vue.use(require('vue-shortkey'), {
  prevent: [
    'input',
    'textarea',
    '.v-text-field__slot',
    '.v-input__slot',
    '.v-input',
    '.v-text-field',
  ],
})
