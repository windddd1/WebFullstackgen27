import Vue from 'vue'
import Contact from './Contact.vue'
import App from './App.vue'

Vue.component('contact-component',Contact);

new Vue({
  el: '#app',
  render: h => h(App)
})
