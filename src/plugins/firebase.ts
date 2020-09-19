import * as firebase from 'firebase/app'

;(function init() {
  const firebaseConfig = {
    apiKey: 'AIzaSyD9TFO750NsPGpvJsGqo4ICOZjZaTf97zA',
    authDomain: 'todorant-e99c2.firebaseapp.com',
    databaseURL: 'https://todorant-e99c2.firebaseio.com',
    projectId: 'todorant-e99c2',
    storageBucket: 'todorant-e99c2.appspot.com',
    messagingSenderId: '989382323327',
    appId: '1:989382323327:web:c39ca628a7a6f918eae34a',
    measurementId: 'G-HSTNQ80T29',
  }
  try {
    firebase.initializeApp(firebaseConfig)
  } catch {
    // Do nothing
  }
})()
