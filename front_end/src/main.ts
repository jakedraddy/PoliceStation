import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
Vue.http
Vue.http.headers.common['Access-Control-Allow-Origin'] = '*'

new Vue({
  render: h => h(App)
}).$mount('#app')
