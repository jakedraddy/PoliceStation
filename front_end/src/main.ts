import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.config.productionTip = false
Vue.http
Vue.http.headers.common['Access-Control-Allow-Origin'] = '*'

new Vue({
  render: h => h(App)
}).$mount('#app')
