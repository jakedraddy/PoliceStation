import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import VueRouter from 'vue-router'
Vue.use(VueRouter)


import Login from './components/Login.vue'
import About from './components/About.vue'
import MainPage from './components/MainPage.vue'
import ViewEmployees from './components/ViewEmployees.vue'

const routes: any[] = [
  { path: '/', component: Login },
  { path: '/about', component: About },
  // { path: '/', component: Login },
  // { path: '/', component: Login },
];

const router = new VueRouter({
  routes, // short for routes: routes
  mode: 'history'
});


Vue.use(BootstrapVue);
Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router
}).$mount('#app');
