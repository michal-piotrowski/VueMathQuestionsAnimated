import Vue from 'vue'
import App from './App.vue'

const eventBus = new Vue();
export default eventBus;

new Vue({
  el: '#app',
  render: h => h(App)
})
